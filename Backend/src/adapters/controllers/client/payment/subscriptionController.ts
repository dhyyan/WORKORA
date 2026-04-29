import { Request, Response } from "express";
import { ICreateSubscriptionSessionUseCase } from "../../../../domain/interface/useCaseInterface/client/payment/iCreateSubscriptionSessionUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import mongoose from "mongoose";

export class SubscriptionController {
    constructor(private _createSubscriptionUseCase: ICreateSubscriptionSessionUseCase) {}

    async createSubscription(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as any).user.userId;
            const role = (req as any).user.role; // Assume role is in token

            const userObjId = new mongoose.Types.ObjectId(userId);
            
            const url = await this._createSubscriptionUseCase.execute({
                userId: userObjId,
                role: role as "client" | "freelancer"
            });

            if (!url) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: "Subscription session creation failed" });
                return;
            }

            res.status(HttpStatus.OK).json({ message: "Subscription session created", url });
        } catch (error: any) {
            console.error("Error in SubscriptionController:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message || "Internal Server Error" });
        }
    }
}
