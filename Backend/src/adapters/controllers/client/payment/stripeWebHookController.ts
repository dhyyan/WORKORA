import { Request, Response } from "express";
import { StripeWebhookUseCase } from "../../../../useCase/client /payment/stripeWebHookUseCase";

export class StripeWebhookController {

  constructor(private _webhookUseCase: StripeWebhookUseCase) { }

  async handleWebhook(req: Request, res: Response): Promise<void> {
    try {

      console.log("Webhook received");
      console.log("Headers:", req.headers);
      console.log("Body type:", typeof req.body);
      console.log("Body is buffer:", Buffer.isBuffer(req.body));

      await this._webhookUseCase.execute(req);

      res.json({ received: true });

    } catch (error) {
      console.log("Webhook error:", error);
      res.status(400).json({ message: "Webhook failed" });
    }
  }
}
