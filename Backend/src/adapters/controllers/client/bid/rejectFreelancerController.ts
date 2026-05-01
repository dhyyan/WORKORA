import { Request, Response } from "express";
import { IRejectFreelancerUsecase } from "../../../../domain/interface/useCaseInterface/client/bid/iRejectFreelancer";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class RejectFreelancerController {
    private _rejectFreelancerUsecase: IRejectFreelancerUsecase
    constructor(rejectFreelancerUsecase: IRejectFreelancerUsecase) {
        this._rejectFreelancerUsecase = rejectFreelancerUsecase
    }

    async reject(req: Request, res: Response): Promise<void> {
        try {
            const bidId = req.body
            const response = await this._rejectFreelancerUsecase.reject(bidId)
            if (!response) res.status(HttpStatus.FORBIDDEN).json({ message: "error while update bid", succes: false })

            res.status(HttpStatus.OK).json({ message: "bid updated successfully", success: true })

        } catch (error: any) {
            console.log("error in reject freelancer controller", error)

            res.status(HttpStatus.FORBIDDEN).json({ message: error.message || "Something went wrong" })
        }
    }
}