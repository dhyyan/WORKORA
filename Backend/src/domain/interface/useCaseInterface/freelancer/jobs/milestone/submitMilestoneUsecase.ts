import { SubmitMilestoneInputDtos, SubmitMilestoneOutputDtos } from "../../../../DTOs/freelancer/milestoneDtos";

export interface ISubmitMilestoneUseCase {
    sumbitTask(input:SubmitMilestoneInputDtos):Promise<SubmitMilestoneOutputDtos>
}