import { BaseBidOutPutDtos, ListBidInputDtos, ListBidOutputDtos } from "../../../domain/interface/DTOs/freelancer/bidDtos";
import { IBidRepository } from "../../../domain/interface/repositoryInterface/IBidRepository";
import { IListBidUsecase } from "../../../domain/interface/useCaseInterface/freelancer/jobs/bid/IListBidUseCase";

export class ListBidUsecase implements IListBidUsecase {
    private _bidRepository: IBidRepository
    constructor(bidRepository: IBidRepository) {
        this._bidRepository = bidRepository
    }
    async listBids(input: ListBidInputDtos): Promise<ListBidOutputDtos> {
        const bidList = await this._bidRepository.findAllBids(input.freelancerId)
            if (!bidList) throw new Error("bids in this freelancer id not found")
                console.log("bidsse ",bidList)
            

            const bids: BaseBidOutPutDtos[] = bidList.map((bid: any) => ({
                _id: bid._id!,
                title: bid.jobId?.title || bid.coverLetter,
                coverLetter: bid.coverLetter,
                bidAmount: bid.jobId?.price || bid.bidAmount,
                status: bid.status || "pending",
                createdAt: bid.createdAt
            }))

            return { bids }
    }
}