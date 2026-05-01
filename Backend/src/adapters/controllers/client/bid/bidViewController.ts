import { Request, Response } from "express";
import { IBidsListsUseCase } from "../../../../domain/interface/useCaseInterface/client/bid/iBidsListsUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { Types } from "mongoose";


export class BidViewController {

    private _bidListUseCase: IBidsListsUseCase
        constructor(bidListUseCase:IBidsListsUseCase) {
            this._bidListUseCase = bidListUseCase
        }
        

    async listBids(req: Request, res: Response) {
        try {
            const jobId = new Types.ObjectId(req.params.jobId)
            console.log("jobid",jobId)
            const bids = await this._bidListUseCase.listBids({ jobId })
            if (!bids || bids.bids.length === 0) {
                return res.status(404).json({ message: "No bids found for this job" });
            }
            res.status(HttpStatus.OK).json({message:"Bids fetched successfully", bids });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
        }
    }
}