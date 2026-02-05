import { create } from "axios";
import { BidListInputDtos, BidListOutputDtos } from "../../../domain/interface/DTOs/client/bidDtos";
import { BaseBidOutPutDtos } from "../../../domain/interface/DTOs/freelancer/bidDtos";
import { IBidRepository } from "../../../domain/interface/repositoryInterface/IBidRepository";
import { IBidsListsUseCase } from "../../../domain/interface/useCaseInterface/client/bid/iBidsListsUseCase";

export class BidListUseCase implements IBidsListsUseCase {
    private _bidRepository: IBidRepository
    constructor(bidRepository: IBidRepository) {
        this._bidRepository = bidRepository
    }

    async listBids(input: BidListInputDtos): Promise<BidListOutputDtos> {

        if (!input.jobId) throw new Error("jobId is required")
            try {
                
        const jobId = input.jobId
        const bidsData = await this._bidRepository.findAll({ jobId: jobId })
        console.log("bids find", bidsData)
        if (!bidsData) throw new Error("no bids found for this jobId")
        const bidsArray = Array.isArray(bidsData) ? bidsData : [bidsData];
        const bids: BaseBidOutPutDtos[] = bidsArray.map((bid) => {
            return {
                _id: bid._id!,
                jobId: bid.jobId,
                freelancerId: bid.freelancerId,
                coverLetter: bid.coverLetter,
                bidAmount: bid.bidAmount,
                status: bid.status,
                createAt: bid.createdAt,
            }
        })
        return { bids }
            } catch (error) {
                throw error
            }

    }

}