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
      throw new Error("Amount must be at least 100 paise");
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      throw new Error("Razorpay credentials are not configured");
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    try {
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
    } catch (error) {
      console.error("Razorpay API Error:", error);
      throw new Error("Failed to create order");
    }
  });

export const verifyPaymentFn = createServerFn({ method: "POST" })
  .validator(
    (data: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => data
  )
  .handler(async ({ data }) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

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

    return { success: true };
  });
