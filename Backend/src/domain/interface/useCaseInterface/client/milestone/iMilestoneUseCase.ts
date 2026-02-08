import { CreateMilestoneInputDtos, CreateMilestoneOutputDtos, GetMilestoneOutputDtos } from "../../../DTOs/client/milestoneDtos";

export interface IMilestoneUseCase {
    createMilestone(input: CreateMilestoneInputDtos): Promise<CreateMilestoneOutputDtos>
    getMilestones(jobId: string): Promise<GetMilestoneOutputDtos>
    
}