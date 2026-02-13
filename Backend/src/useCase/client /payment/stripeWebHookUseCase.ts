import { Request } from "express";
import Stripe from "stripe";
import { Types } from "mongoose";
import { StripeService } from "../../../frameWork/service/stripe/stripeService";
import { IEscrowFundUseCase } from "../../../domain/interface/useCaseInterface/client/escrow/iEscrowFundUseCase";

export class StripeWebhookUseCase {

  constructor(
    private _stripeService: StripeService,
    private _escrowFundUseCase: IEscrowFundUseCase
  ) { }

  async execute(req: Request): Promise<void> {

    const event = this._stripeService.constructEvent(req);
    console.log("eda mwonee event",event)

    if (event.type === "checkout.session.completed") {

      const session = event.data.object as Stripe.Checkout.Session;

      const milestoneId = session.metadata?.milestoneId;

      if (!milestoneId) {
        throw new Error("Milestone ID missing in metadata");
      }

      // 🔥 reuse your existing escrow logic
      await this._escrowFundUseCase.createEscrow({
        id: new Types.ObjectId(milestoneId)
      });
    }
  }
}
