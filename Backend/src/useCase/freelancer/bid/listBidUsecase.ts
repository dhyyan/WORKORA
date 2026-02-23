import { BaseBidOutPutDtos, ListBidInputDtos, ListBidOutputDtos } from "../../../domain/interface/DTOs/freelancer/bidDtos";
import { IBidRepository } from "../../../domain/interface/repositoryInterface/IBidRepository";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { IListBidUsecase } from "../../../domain/interface/useCaseInterface/freelancer/jobs/bid/IListBidUseCase";

export class ListBidUsecase implements IListBidUsecase {
    private _bidRepository: IBidRepository
    constructor(bidRepository: IBidRepository) {
        this._bidRepository = bidRepository
    }
    async listBids(input: ListBidInputDtos): Promise<ListBidOutputDtos> {
        try {
            const bidList = await this._bidRepository.findAll({ freelancerId: input.freelancerId})
            if (!bidList) throw new Error("bids in this freelancer id not found")
                console.log("bids in usecase",bidList)

            const bids: BaseBidOutPutDtos[] = bidList.map((bid) => ({
                _id: bid._id!,
                jobId: bid.jobId,
                freelancerId: bid.freelancerId,
                coverLetter: bid.coverLetter,
                bidAmount: bid.bidAmount,
                status: "pending",
                createdAt: bid.createdAt
            }))

            return {bids}
        } catch (error) {
            throw error
        }
    }
}