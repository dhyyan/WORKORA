import { Request, Response } from "express";
import { ICreateCheckoutSessionUseCase } from "../../../../domain/interface/useCaseInterface/client/payment/iCreateCheckoutSessionUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import mongoose from "mongoose";

export class PaymentCheckoutController {
    private _createCheckoutUseCase: ICreateCheckoutSessionUseCase
    constructor(createCheckoutUseCase: ICreateCheckoutSessionUseCase) {
        this._createCheckoutUseCase = createCheckoutUseCase
    }

    async checkout(req: Request, res: Response): Promise<void> {
        try {
            const { milestoneId } = req.body;

            const objectId = new mongoose.Types.ObjectId(milestoneId);
            console.log("milestone id in controller", milestoneId,objectId)
            const url = await this._createCheckoutUseCase.execute({milestoneId:objectId})
            console.log("payment url", url)
            if (!url) res.status(HttpStatus.BAD_REQUEST).json({ message: "checkout payment failed" })
            res.status(HttpStatus.OK).json({ message: "payment checkout success", url })
        } catch (error) {
            console.log("error in payment checkout controller", error)
        }
    }
}