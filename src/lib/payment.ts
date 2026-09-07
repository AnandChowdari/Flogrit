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

    // Call GAS Webhook (Fail closed if credentials missing)
    const gasUrl = process.env.VITE_GOOGLE_APPS_SCRIPT_URL || import.meta.env?.VITE_GOOGLE_APPS_SCRIPT_URL;
    const gasSecret = process.env.GAS_WEBHOOK_SECRET || import.meta.env?.GAS_WEBHOOK_SECRET;

    if (!gasUrl || !gasSecret) {
      console.error("CRITICAL: VITE_GOOGLE_APPS_SCRIPT_URL or GAS_WEBHOOK_SECRET is not set. Fail closed.");
      return {
        success: false,
        fulfillmentStatus: "failed",
        error: "Server configuration missing (GAS Webhook Secret). Payment recorded with ID: " + razorpay_payment_id,
        paymentId: razorpay_payment_id,
        licenseKey
      };
    }

    let responseJson: any = null;
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

      console.log(`[PAYMENT_BRIDGE] gas_request_start: paymentId=${razorpay_payment_id}, orderId=${razorpay_order_id}, plan=${plan_name}, email=${customer_email}`);

      const response = await fetch(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log(`[PAYMENT_BRIDGE] gas_response: paymentId=${razorpay_payment_id}, status=${response.status}`);

      if (!response.ok) {
        console.error(`[PAYMENT_BRIDGE] fulfillment_failure: HTTP error ${response.status}`);
        return {
          success: false,
          fulfillmentStatus: "pending",
          error: `Payment received, but activation is still processing (HTTP ${response.status}). Your payment ID is ${razorpay_payment_id}.`,
          paymentId: razorpay_payment_id,
          licenseKey
        };
      }

      const responseText = await response.text();
      console.log(`[PAYMENT_BRIDGE] raw_response_text: ${responseText.substring(0, 300)}...`);

      try {
        responseJson = JSON.parse(responseText);
      } catch (e) {
        console.error(`[PAYMENT_BRIDGE] fulfillment_failure: Invalid JSON returned. Raw:`, responseText);
        return {
          success: false,
          fulfillmentStatus: "pending",
          error: `Payment received, but activation is still processing (Invalid response format). Your payment ID is ${razorpay_payment_id}.`,
          paymentId: razorpay_payment_id,
          licenseKey
        };
      }
    } catch (err: any) {
      console.error(`[PAYMENT_BRIDGE] fulfillment_failure: Failed to call GAS Webhook:`, err);
      return {
        success: false,
        fulfillmentStatus: "pending",
        error: `Payment received, but activation is still processing (Network error). Your payment ID is ${razorpay_payment_id}.`,
        paymentId: razorpay_payment_id,
        licenseKey
      };
    }

    if (!responseJson || responseJson.status !== "success") {
      console.error(`[PAYMENT_BRIDGE] fulfillment_failure: GAS Webhook rejected or failed:`, responseJson);
      return {
        success: false,
        fulfillmentStatus: responseJson?.status === "error" ? "failed" : "pending",
        error: responseJson?.message || `Payment received, but activation is still processing (Server error). Your payment ID is ${razorpay_payment_id}.`,
        paymentId: razorpay_payment_id,
        licenseKey
      };
    }

    console.log(`[PAYMENT_BRIDGE] fulfillment_success: paymentId=${razorpay_payment_id}`);
    console.log(`[PAYMENT_BRIDGE] payment_success: paymentId=${razorpay_payment_id}, orderId=${razorpay_order_id}`);

    const finalKey = responseJson?.data?.licenseKey || licenseKey;
    const emailSent = responseJson?.data?.emailSent !== false;

    return {
      success: true,
      fulfillmentStatus: "fulfilled",
      licenseKey: finalKey,
      emailSent: emailSent,
      paymentId: razorpay_payment_id
    };
  });

export const recoverPaymentFn = createServerFn({ method: "POST" })
  .validator(
    (data: {
      paymentId: string;
      orderId: string;
    }) => data
  )
  .handler(async ({ data }) => {
    const { paymentId, orderId } = data;

    if (!paymentId || !orderId) {
      return { success: false, error: "Missing required recovery parameters." };
    }

    const key_id = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || import.meta.env?.VITE_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return { success: false, error: "Razorpay credentials are not configured on the server." };
    }

    const gasUrl = process.env.VITE_GOOGLE_APPS_SCRIPT_URL || import.meta.env?.VITE_GOOGLE_APPS_SCRIPT_URL;
    const gasSecret = process.env.GAS_WEBHOOK_SECRET || import.meta.env?.GAS_WEBHOOK_SECRET;

    if (!gasUrl || !gasSecret) {
      console.error("CRITICAL: VITE_GOOGLE_APPS_SCRIPT_URL or GAS_WEBHOOK_SECRET is not set. Fail closed.");
      return { success: false, error: "Server webhook credentials missing." };
    }

    try {
      const razorpay = new Razorpay({ key_id, key_secret });
      const payment: any = await razorpay.payments.fetch(paymentId);

      if (!payment || payment.status !== "captured") {
        return { success: false, error: "Payment is not verified as captured by Razorpay." };
      }

      if (payment.order_id !== orderId) {
        return { success: false, error: "Payment order ID mismatch." };
      }

      const amountInStandardUnits = payment.amount / 100;
      let verifiedPlan = "";
      if (amountInStandardUnits === 399 || amountInStandardUnits === 9) {
        verifiedPlan = "Basic";
      } else if (amountInStandardUnits === 599 || amountInStandardUnits === 15) {
        verifiedPlan = "Pro";
      } else if (amountInStandardUnits === 999 || amountInStandardUnits === 25) {
        verifiedPlan = "Extreme";
      } else {
        return { success: false, error: `Unrecognized payment amount: ${amountInStandardUnits} ${payment.currency}` };
      }

      const trustedEmail = payment.email || payment.notes?.email;
      const trustedName = payment.notes?.name || "Customer";

      if (!trustedEmail) {
        return { success: false, error: "Payment record lacks a verified customer email address." };
      }

      const payload = {
        secret: gasSecret,
        action: "paid_signup",
        data: {
          paymentId: payment.id,
          orderId: payment.order_id,
          email: trustedEmail,
          name: trustedName,
          plan: verifiedPlan,
          amount: amountInStandardUnits,
          currency: payment.currency,
          timestamp: new Date().toISOString(),
          status: "success",
          isRecovery: true
        }
      };

      const gasResponse = await fetch(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseText = await gasResponse.text();
      let resJson: any = null;
      try { resJson = JSON.parse(responseText); } catch (e) {}

      if (resJson && resJson.status === "error") {
        return { success: false, error: resJson.message || "Fulfillment server failed during recovery." };
      }

      return {
        success: true,
        fulfillmentStatus: "fulfilled",
        licenseKey: resJson?.data?.licenseKey,
        emailSent: resJson?.data?.emailSent !== false
      };
    } catch (err: any) {
      console.error("recoverPaymentFn error:", err);
      return { success: false, error: err.message || "Failed to recover payment via Razorpay API." };
    }
  });

