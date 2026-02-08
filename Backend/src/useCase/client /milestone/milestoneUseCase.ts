import { BaseMilestoneOutputDtos, CreateMilestoneInputDtos, CreateMilestoneOutputDtos, GetMilestoneOutputDtos } from "../../../domain/interface/DTOs/client/milestoneDtos";
import { IContractRepository } from "../../../domain/interface/repositoryInterface/IContractRepository";
import { IMilestoneRepository } from "../../../domain/interface/repositoryInterface/IMilestoneRepository";
import { IMilestoneUseCase } from "../../../domain/interface/useCaseInterface/client/milestone/iMilestoneUseCase";

export class MilestoneUseCase implements IMilestoneUseCase {
    private _contractRepository: IContractRepository;
    private _milestoneRepository: IMilestoneRepository;
    constructor(contractRepository: IContractRepository, milestoneRepository: IMilestoneRepository) {
        this._contractRepository = contractRepository
        this._milestoneRepository = milestoneRepository
    }
    async createMilestone(input: CreateMilestoneInputDtos): Promise<CreateMilestoneOutputDtos> {
        try {
            const contract = await this._contractRepository.findContractByJobId(input.jobId)
            if (!contract) throw new Error("Contract not found")
            if (!contract._id) throw new Error("Contract id not found")

            const milestoneCreated = await this._milestoneRepository.create({ ...input, status: "pending", contractId: contract._id })
            console.log("milestone created", milestoneCreated)
            const milestone: BaseMilestoneOutputDtos = {
                _id: milestoneCreated._id!,
                contractId: milestoneCreated.contractId,
                title: milestoneCreated.title,
                amount: milestoneCreated.amount,
                status: "pending"
            }
            return {
                milestone,
                success: true
            }
        } catch (error) {
            throw error
        }
    }

    async getMilestones(jobId: string): Promise<GetMilestoneOutputDtos> {
        try {
            console.log("Getting milestones for jobId:", jobId);
            const contract = await this._contractRepository.findContractByJobId(jobId)

            if (!contract || !contract._id) {
                console.log("No contract found for job:", jobId);
                return { milestones: [], success: true }
            }
            console.log("Found contract:", contract._id);

            // Ensure contractId is treated as string if the schema expects string
            // Based on schema: contractId: {type:String, ...}
            // Mongoose might store it as string, but contract._id might be ObjectId
            const contractIdStr = contract._id.toString();

            const milestones = await this._milestoneRepository.findAll({ contractId: contractIdStr })
            console.log("Found milestones:", milestones);

            return {
                milestones: milestones.map(m => ({
                    _id: m._id!,
                    contractId: m.contractId,
                    title: m.title,
                    amount: m.amount,
                    status: m.status as any
                })),
                success: true
            }
        } catch (error) {
            console.error("Error getMilestones:", error);
            throw error;
        }
    }

}