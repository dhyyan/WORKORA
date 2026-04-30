// import { stat } from "fs";
import { BaseContractOutPutDtos, HireFreelancerInputDtos, HireFreelancerOutputDtos } from "../../../domain/interface/DTOs/client/bidDtos";
import { IBidRepository } from "../../../domain/interface/repositoryInterface/IBidRepository";
import { IContractRepository } from "../../../domain/interface/repositoryInterface/IContractRepository";
import { IFreelancerRepository } from "../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { IHireFreelancerUseCase } from "../../../domain/interface/useCaseInterface/client/bid/iHireFreelancerUseCase";
import { Bid } from "../../../domain/entities/bid.entity";
import { IChatRepository } from "../../../domain/interface/repositoryInterface/IChatRepository";

export class HireFreelancerUseCase implements IHireFreelancerUseCase {
    private _contractRepository: IContractRepository;
    private _freelancerRepository: IFreelancerRepository;
    private _bidRepository: IBidRepository;
    private _jobRepository: IJobRepository;
    private _chatRepository: IChatRepository;

    constructor(contractRepository: IContractRepository, freelancerRepository: IFreelancerRepository, bidRepository: IBidRepository, jobRepository: IJobRepository, chatRepository: IChatRepository) {
        this._contractRepository = contractRepository
        this._freelancerRepository = freelancerRepository
        this._bidRepository = bidRepository
        this._jobRepository = jobRepository
        this._chatRepository = chatRepository
    }
    async hireFreelancer(input: HireFreelancerInputDtos): Promise<HireFreelancerOutputDtos> {
        try {
            const { bidId, jobId, freelancerId, totalAmount } = input
            console.log("data in hired freeelancere", input)

            const freelancer = await this._freelancerRepository.findById(freelancerId)
            if (!freelancer) throw new Error("freelancer not found")

            const job = await this._jobRepository.findById(jobId)
            if (!job) throw new Error("job not found")

            const existingContract = await this._contractRepository.findContractByJobId(jobId)
            if (existingContract) throw new Error("contract already assign this job")

            const createContract = await this._contractRepository.create({ ...input, status: "active" })
            if (!createContract || !createContract._id) throw new Error("error while creating new contract")

            const bid: Partial<Bid> = {
                status: "accepted" as "accepted"
            }
            const id = bidId
            const updateBid = await this._bidRepository.updateBid(id, bid)
            console.log("Update BId", updateBid)
            if (!updateBid) throw new Error("error while updating bid status")

            const jobUpdate = await this._jobRepository.findByIdAndUpdate(jobId, { status: "assigned", freelancerId: freelancer._id })
            console.log("update Job", jobUpdate)
            if (!jobUpdate) throw new Error("error while updating job status")

                //chat room create
                const createChatRoom=await this._chatRepository.create({
                    clientId:job.clientId,
                    freelancerId:freelancer._id!,
                    lastMessage:"Chat started",
                    lastMessageAt:new Date()
                })

                console.log("chat room created",createChatRoom)


            // const rejectExistBid=await this._bidRepository.updateBid(!id,{status:"reject"})


            const contract: BaseContractOutPutDtos = {
                _id: createContract._id,
                jobId: createContract.jobId,
                freelancerId: createContract.freelancerId,
                totalAmount: createContract.totalAmount,
                status: "active"
            }
            return { contract }

        } catch (error) {
            throw error
        }
    }
}