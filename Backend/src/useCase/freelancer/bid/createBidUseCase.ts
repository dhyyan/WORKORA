import { BaseBidOutPutDtos, BidCreateInputDtos, BidCreateOutPutDtos } from "../../../domain/interface/DTOs/freelancer/bidDtos";
import { IBidRepository } from "../../../domain/interface/repositoryInterface/IBidRepository";
import { ICreateBidUseCase } from "../../../domain/interface/useCaseInterface/freelancer/jobs/IFreelancerBidPost";

export class CreateBidUseCase implements ICreateBidUseCase {
    private _bidRepository: IBidRepository
    constructor(bidRepository: IBidRepository) {
        this._bidRepository = bidRepository
    }
    async create(input: BidCreateInputDtos): Promise<BidCreateOutPutDtos> {
        console.log("data in bid create in usecase",input)
        try {
            const ifBid = await this._bidRepository.findById(input.jobId)
            if (ifBid?.freelancerId == input.freelancerId) throw new Error("user already applied this bid")
            const createBid = await this._bidRepository.create({ ...input, status: "pending" })
            if (!createBid) throw new Error("error while creating bid")
            const bid: BaseBidOutPutDtos = {
                _id: createBid._id!,
                jobId: createBid.jobId,
                freelancerId: createBid.freelancerId,
                coverLetter: createBid.coverLetter,
                status: "pending"
            }
            console.log("created ",createBid)
            return { bid }
            
        } catch (error) {
            throw error
        }
    }
}