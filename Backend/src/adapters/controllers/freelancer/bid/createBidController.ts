import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { ICreateBidUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/jobs/IFreelancerBidPost";
import { Request, Response } from "express";

export class BidCreateController {
    private _createBidUseCase: ICreateBidUseCase
    constructor(createBidUseCase: ICreateBidUseCase) {
        this._createBidUseCase = createBidUseCase
    }
    async createBid(req: Request, res: Response): Promise<void> {
        try {
            const { jobId, freelancerId, coverLetter, bidAmount,} = req.body;
            console.log("data of bid in controller", req.body)
            const response = await this._createBidUseCase.create({ jobId, freelancerId, coverLetter, bidAmount })
            if (!response) {
                res.status(HttpStatus.FORBIDDEN).json({ message: "error while creating bid in controller" })
            } else {
                res.status(HttpStatus.OK).json({ message: "Bid created successfully", data: response })
            }
        } catch (error:any) {
            res.status(HttpStatus.FORBIDDEN).json({message: error.message || "Something went wrong"})
        }
    }
}