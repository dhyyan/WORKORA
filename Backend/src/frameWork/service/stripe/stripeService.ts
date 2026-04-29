import { Types } from "mongoose";
import { stripe } from "./stripeConfig";
import Stripe from "stripe";
import { Request } from "express";

export class StripeService {
  async createChecoutSession(milestoneId: Types.ObjectId, amount: number, clientId?: Types.ObjectId) {
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
            unit_amount: Math.round(amount * 100)
          },
          quantity: 1
        }
      ],
      metadata: {
        milestoneId: milestoneId.toString(),
        clientId: clientId ? clientId.toString() : ""
      },
      success_url: `${process.env.CLIENT_URL}/client/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/client/payment-cancel`
    })
    return sessiion.url
  }

  /**
   * Creates a Stripe Checkout Session for recurring monthly subscriptions.
   * @param userId The ID of the User (Client or Freelancer)
   * @param role The role of the user
   * @param priceId The Stripe Price ID for the subscription
   */
  async createSubscriptionSession(userId: string, role: string, priceId: string) {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
        role: role,
        type: "subscription"
      },
      success_url: `${process.env.CLIENT_URL}/${role}/subscription-success`,
      cancel_url: `${process.env.CLIENT_URL}/${role}/subscription-cancel`,
    });
    return session.url;
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