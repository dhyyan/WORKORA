import { Request, Response } from "express";
import { IGetSubscriptionRevenueUseCase } from "../../../../domain/interface/useCaseInterface/admin/subscription/IGetSubscriptionRevenueUseCase";

export class GetSubscriptionRevenueController {
    constructor(private _getSubscriptionRevenueUseCase: IGetSubscriptionRevenueUseCase) {}

    async getSubscriptions(req: Request, res: Response) {
        try {
            const subscriptions = await this._getSubscriptionRevenueUseCase.execute();
            return res.status(200).json({
                success: true,
                message: "Subscription transactions fetched successfully",
                data: subscriptions
            });
        } catch (error: any) {
            console.error("Error in GetSubscriptionRevenueController:", error);
            return res.status(500).json({
                success: false,
                message: error.message || "Internal server error"
            });
        }
    }
}
