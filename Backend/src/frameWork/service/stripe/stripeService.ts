import { Types } from "mongoose";
import { stripe } from "./stripeConfig";
import Stripe from "stripe";
import { Request } from "express";

export class StripeService {
  async createChecoutSession(milestoneId: Types.ObjectId, amount: number) {
    const sessiion = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Milestone Fundding"
            },
            unit_amount: amount * 100
          },
          quantity: 1
        }
      ],
      metadata: {
        milestoneId: milestoneId.toString()
      },
      success_url: `${process.env.CLIENT_URL}/client/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/client/payment-cancel`
    })
    return sessiion.url
  }

  // 🔹 Verify and construct Stripe event
  constructEvent(req: Request): Stripe.Event {

    const signature = req.headers["stripe-signature"] as string | undefined;

    if (!signature) {
      throw new Error("Stripe signature missing");
    }


    const event = stripe.webhooks.constructEvent(
      req.body,   // must be raw body
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    return event;
  }
}