import { BaseBidOutPutDtos, BidCreateInputDtos, BidCreateOutPutDtos } from "../../../domain/interface/DTOs/freelancer/bidDtos";
import { IBidRepository } from "../../../domain/interface/repositoryInterface/IBidRepository";
import { IFreelancerRepository } from "../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { ICreateBidUseCase } from "../../../domain/interface/useCaseInterface/freelancer/jobs/IFreelancerBidPost";

export class CreateBidUseCase implements ICreateBidUseCase {
    private _bidRepository: IBidRepository
    private _freelancerRepository: IFreelancerRepository
    constructor(bidRepository: IBidRepository, freelancerRepository: IFreelancerRepository) {
        this._bidRepository = bidRepository
        this._freelancerRepository = freelancerRepository
    }
    async create(input: BidCreateInputDtos): Promise<BidCreateOutPutDtos> {
        console.log("data in bid create in usecase", input)
        const freelancer = await this._freelancerRepository.findById(input.freelancerId);
            if (!freelancer) throw new Error("Freelancer not found");

            if (!freelancer.isSubscribed && (freelancer.freeApplicationsCount ?? 0) >= 5) {
                throw new Error("Free application limit reached. Please subscribe to apply for more jobs.");
            }

            const id = input.jobId
            const ifBid = await this._bidRepository.findAll({ jobId: id })
            const applied = ifBid?.find(b => b.freelancerId == input.freelancerId)
            if (applied) throw new Error("user already applied this bid")

            const createBid = await this._bidRepository.create({ ...input, status: "pending" })
            console.log("create bid", createBid)
            if (!createBid) throw new Error("error while creating bid")

            // Increment free count if not subscribed
            if (!freelancer.isSubscribed) {
                await this._freelancerRepository.update(input.freelancerId, {
                    freeApplicationsCount: (freelancer.freeApplicationsCount ?? 0) + 1
                });
            }

            const bid: BaseBidOutPutDtos = {
                _id: createBid._id!,
                jobId: createBid.jobId,
                freelancerId: createBid.freelancerId,
                coverLetter: createBid.coverLetter,
                bidAmount: createBid.bidAmount,
                status: "pending"
            }
            return { bid }
    }
}