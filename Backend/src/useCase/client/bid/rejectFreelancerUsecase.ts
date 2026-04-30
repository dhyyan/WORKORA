import { error } from "console";
import { IRejectFreelancerInputDtos, IRejectFreelancerOutputDtos } from "../../../domain/interface/DTOs/client/bidDtos";
import { IBidRepository } from "../../../domain/interface/repositoryInterface/IBidRepository";
import { IRejectFreelancerUsecase } from "../../../domain/interface/useCaseInterface/client/bid/iRejectFreelancer";

export class RejectFreelancerUsecase implements IRejectFreelancerUsecase {
    private _bidRepository: IBidRepository
    constructor(bidRepository: IBidRepository) {
        this._bidRepository = bidRepository
    }
    async reject(input: IRejectFreelancerInputDtos): Promise<IRejectFreelancerOutputDtos> {
        try {
            const findBidById = await this._bidRepository.findById(input.bidId)
            if (!findBidById) throw new Error("bid in this id not found")
                if(findBidById.status=="rejected")throw new Error("in this freelancer already rejected")

            const updateBid = await this._bidRepository.updateBid(findBidById._id!, { status: "rejected" })
            if (!updateBid) throw new Error("error while updating bid in usecase")
            console.log("update bid", updateBid)

            return { success: true }
        } catch (error) {
            throw error
        }
    }
}