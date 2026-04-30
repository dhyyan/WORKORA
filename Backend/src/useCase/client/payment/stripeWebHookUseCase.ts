import { Request } from "express";
import Stripe from "stripe";
import { Types } from "mongoose";
import { StripeService } from "../../../frameWork/service/stripe/stripeService";
import { IEscrowFundUseCase } from "../../../domain/interface/useCaseInterface/client/escrow/iEscrowFundUseCase";
import { IWalletRepository } from "../../../domain/interface/repositoryInterface/IWalletRepository";

export class StripeWebhookUseCase {

  constructor(
    private _stripeService: StripeService,
    private _escrowFundUseCase: IEscrowFundUseCase,
    private _walletRepository: IWalletRepository
  ) { }

  async execute(req: Request): Promise<void> {

    const event = this._stripeService.constructEvent(req);
    console.log("Stripe Webhook Event Received:", event.type);

    switch (event.type) {
      case "checkout.session.completed":
        await this._handleCheckoutSession(event.data.object as Stripe.Checkout.Session);
        break;

      case "invoice.payment_succeeded":
        await this._handleSubscriptionRenewal(event.data.object as Stripe.Invoice);
        break;

      case "customer.subscription.deleted":
      case "invoice.payment_failed":
        await this._handleSubscriptionDeactivation(event.data.object as Stripe.Subscription | Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  private async _handleCheckoutSession(session: Stripe.Checkout.Session) {
    const { type, userId, role, milestoneId, clientId } = session.metadata || {};

    if (type === "subscription") {
      // Logic for initial subscription
      await this._activateSubscription(userId!, role!, session.subscription as string);
      if (session.amount_total) {
        await this._creditAdminWallet(session.amount_total / 100, `Subscription payment from ${role}: ${userId}`);
        // 🔹 Record debit in user's wallet
        await this._debitUserWallet(userId!, role!, session.amount_total / 100, "Monthly Subscription Fee");
      }
    } else {
      // Logic for Escrow (existing)
      if (!milestoneId) {
        throw new Error("Milestone ID missing in metadata");
      }

      await this._escrowFundUseCase.createEscrow({ id: new Types.ObjectId(milestoneId) });

      let finalClientId = clientId;
      if (!finalClientId && milestoneId) {
        const { milestoneModel } = await import("../../../frameWork/database/models/milestone.modes");
        const { contractModel } = await import("../../../frameWork/database/models/contract.model");
        const { jobModel } = await import("../../../frameWork/database/models/job.model");

        const milestoneInfo = await milestoneModel.findById(milestoneId);
        if (milestoneInfo) {
          const contractInfo = await contractModel.findById(milestoneInfo.contractId);
          if (contractInfo) {
            const jobInfo = await jobModel.findById(contractInfo.jobId);
            if (jobInfo) finalClientId = jobInfo.clientId.toString();
          }
        }
      }

      if (finalClientId && session.amount_total) {
        await this._updateClientWallet(finalClientId, session.amount_total / 100);
      }
    }
  }

  private async _handleSubscriptionRenewal(invoice: Stripe.Invoice) {
    const inv = invoice as any;
    const subscriptionId = inv.subscription as string | null;
    if (subscriptionId && inv.amount_paid > 0) {
      const stripe = (await import("../../../frameWork/service/stripe/stripeConfig")).stripe;
      const sub = await stripe.subscriptions.retrieve(subscriptionId);
      const { userId, role } = sub.metadata;

      if (userId && role) {
        await this._activateSubscription(userId, role, subscriptionId);
        await this._creditAdminWallet(invoice.amount_paid / 100, `Subscription renewal from ${role}: ${userId}`);
        // 🔹 Record debit in user's wallet
        await this._debitUserWallet(userId, role, invoice.amount_paid / 100, "Monthly Subscription Renewal");
      }
    }
  }

  private async _handleSubscriptionDeactivation(data: any) {
    const subscriptionId = data.subscription || data.id;
    const stripe = (await import("../../../frameWork/service/stripe/stripeConfig")).stripe;
    const sub = await stripe.subscriptions.retrieve(subscriptionId as string);
    const { userId, role } = sub.metadata;

    if (userId && role) {
      const { clientModel } = await import("../../../frameWork/database/models/client.model");
      const { freelacerModel } = await import("../../../frameWork/database/models/freelancerModel");

      if (role === "client" || role === "admin") {
        await clientModel.findByIdAndUpdate(userId, { isSubscribed: false, stripeSubscriptionId: "" });
      } else {
        await freelacerModel.findByIdAndUpdate(userId, { isSubscribed: false, stripeSubscriptionId: "" });
      }
      console.log(`Subscription deactivated for ${role}: ${userId}`);
    }
  }

  private async _activateSubscription(userId: string, role: string, subId: string) {
    const { clientModel } = await import("../../../frameWork/database/models/client.model");
    const { freelacerModel } = await import("../../../frameWork/database/models/freelancerModel");

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // 30 days from now

    if (role === "client" || role === "admin") {
      await clientModel.findByIdAndUpdate(userId, { isSubscribed: true, stripeSubscriptionId: subId, subscriptionExpiryDate: expiryDate });
    } else {
      await freelacerModel.findByIdAndUpdate(userId, { isSubscribed: true, stripeSubscriptionId: subId, subscriptionExpiryDate: expiryDate });
    }
  }

  private async _debitUserWallet(userId: string, role: string, amount: number, description: string) {
    const userObjectId = new Types.ObjectId(userId);
    const existWallet = await this._walletRepository.findByUserId(userObjectId);
    
    if (!existWallet) {
      await this._walletRepository.create({
        userId: userObjectId,
        role: role as any,
        balance: -amount, // Negative balance if no wallet exists yet
        transactions: [{ type: "debit", amount, description, createdAt: new Date() }]
      });
    } else {
      await this._walletRepository.addTransaction(userObjectId, { type: "debit", amount, description, createdAt: new Date() });
    }
  }

  private async _creditAdminWallet(amount: number, description: string) {
    const { clientModel } = await import("../../../frameWork/database/models/client.model");
    // Find the first admin
    const admin = await clientModel.findOne({ role: "admin" });
    if (admin) {
      const existWallet = await this._walletRepository.findByUserId(admin._id!);
      if (!existWallet) {
        await this._walletRepository.create({
          userId: admin._id!,
          role: "admin",
          balance: amount,
          transactions: [{ type: "credit", amount, description, createdAt: new Date() }]
        });
      } else {
        await this._walletRepository.addTransaction(admin._id!, { type: "credit", amount, description, createdAt: new Date() });
      }
    }
  }

  private async _updateClientWallet(clientId: string, amount: number) {
    const clientObjectId = new Types.ObjectId(clientId);
    const existWallet = await this._walletRepository.findByUserId(clientObjectId);

    if (!existWallet) {
      await this._walletRepository.create({
        userId: clientObjectId,
        role: "client",
        balance: 0,
        transactions: [{ type: "debit", amount, description: "Milestone Funding", createdAt: new Date() }]
      });
    } else {
      await this._walletRepository.addTransaction(clientObjectId, { type: "debit", amount, description: "Milestone Funding", createdAt: new Date() });
    }
  }
}
