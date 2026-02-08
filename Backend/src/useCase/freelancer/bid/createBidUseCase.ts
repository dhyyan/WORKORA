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
            const id=input.jobId
            const ifBid = await this._bidRepository.findAll({jobId:id})
            console.log("bideyy",ifBid)

            const applied=ifBid?.find(b=>b.freelancerId==input.freelancerId)
            console.log("applied or not",applied)
            
            const createBid = await this._bidRepository.create({ ...input,status:"pending" })
            console.log("create bid",createBid)
            if(applied)throw new Error("user already applied this bid")
            if (!createBid) throw new Error("error while creating bid")
            const bid: BaseBidOutPutDtos = {
                _id: createBid._id!,
                jobId: createBid.jobId,
                freelancerId: createBid.freelancerId,
                coverLetter: createBid.coverLetter,
                // deadline: createBid.deadline,
                bidAmount: createBid.bidAmount,
                status: "pending"
            }
            console.log("created ",createBid)
            return { bid }
            
        } catch (error) {
            throw error
        }
    }
}