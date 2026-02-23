import { IRequestMilestoneChangeInputDtos, IRequestMilestoneChangeOutputDtos } from "../../../DTOs/client/milestoneDtos";

export interface IRequestMilestoneChangeUseCase{
    requestChange(input:IRequestMilestoneChangeInputDtos):Promise<IRequestMilestoneChangeOutputDtos>
}