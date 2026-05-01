import { Types } from "mongoose";
import { CreateMilestoneInputDtos, CreateMilestoneOutputDtos, GetMilestoneOutputDtos } from "../../../DTOs/client/milestoneDtos";

export interface IMilestoneUseCase {
    createMilestone(input: CreateMilestoneInputDtos): Promise<CreateMilestoneOutputDtos>
    getMilestones(jobId: Types.ObjectId): Promise<GetMilestoneOutputDtos>
    
}