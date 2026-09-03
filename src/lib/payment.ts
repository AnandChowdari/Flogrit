import { createServerFn } from "@tanstack/react-start";
import Razorpay from "razorpay";
import crypto from "crypto";

export const createOrderFn = createServerFn({ method: "POST" })
  .validator(
    (data: { amount: number; currency: string; receipt?: string }) => data
  )
  .handler(async ({ data }) => {
    const { amount, currency, receipt } = data;

    if (amount < 100) {
      return { error: "Amount must be at least 100 paise" };
    }

    // Try to get from process.env, or fallback to import.meta.env if in Vite
    const key_id = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || import.meta.env?.VITE_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      console.error("Razorpay keys missing:", { key_id: !!key_id, key_secret: !!key_secret });
      return { error: "Razorpay credentials are not configured on the server." };
    }

    try {
      const razorpay = new Razorpay({
        key_id,
        key_secret,
      });

      const order = await razorpay.orders.create({
        amount,
        currency,
        receipt: receipt || `receipt_${Date.now()}`,
      });

      return {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
      };
    } catch (error: any) {
      console.error("Razorpay API Error:", error);
      const errorMessage = error?.error?.description || error.message || "Failed to create order via Razorpay";
      return { error: errorMessage };
    }
  });

export const verifyPaymentFn = createServerFn({ method: "POST" })
  .validator(
    (data: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      customer_email?: string;
      customer_name?: string;
      plan_name?: string;
      amount?: number;
      currency?: string;
      existing_license_key?: string;
    }) => data
  )
  .handler(async ({ data }) => {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      customer_email,
      customer_name,
      plan_name,
      amount,
      currency,
      existing_license_key
    } = data;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new Error("Missing payment verification fields");
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_secret) {
      throw new Error("Razorpay credentials are not configured");
    }

    const hmac = crypto.createHmac("sha256", key_secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest("hex");

    if (generated_signature !== razorpay_signature) {
      throw new Error("Invalid signature");
    }

    // Use Existing or Generate License Key
    let licenseKey = existing_license_key;
    if (!licenseKey) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      licenseKey = 'CG-';
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
          licenseKey += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        if (i < 2) licenseKey += '-';
      }
    }

    // Call GAS Webhook
    const gasUrl = process.env.VITE_GOOGLE_APPS_SCRIPT_URL || import.meta.env?.VITE_GOOGLE_APPS_SCRIPT_URL;
    const gasSecret = process.env.GAS_WEBHOOK_SECRET || import.meta.env?.GAS_WEBHOOK_SECRET || 'default_secret';

    if (gasUrl) {
      try {
        const payload = {
          secret: gasSecret,
          action: "paid_signup",
          data: {
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            email: customer_email,
            name: customer_name,
            plan: plan_name,
            licenseKey: licenseKey,
            amount: amount,
            currency: currency,
            timestamp: new Date().toISOString(),
            status: "success"
          }
        };

        const response = await fetch(gasUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const responseText = await response.text();
        console.log("GAS Webhook Raw Response:", responseText);
        
        let responseJson;
        try {
          responseJson = JSON.parse(responseText);
        } catch (e) {
          console.error("GAS Webhook did not return JSON. Raw:", responseText);
        }

        if (responseJson && responseJson.status === "error") {
          console.error("GAS Webhook processed but returned an error:", responseJson);
          // We still return success to the user because their money was deducted,
          // but you (the admin) should check the server logs!
        }
      } catch (err) {
        console.error("Failed to call GAS Webhook:", err);
      }
    } else {
      console.error("CRITICAL: VITE_GOOGLE_APPS_SCRIPT_URL is not set. Webhook completely skipped.");
    }

    return { success: true, licenseKey };
  });
