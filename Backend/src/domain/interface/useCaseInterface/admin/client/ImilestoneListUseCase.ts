import { IMilestoneListInputDtos, IMilestoneListOutputDtos } from "../../../DTOs/admin/client/clientDtos";

export interface IMilestoneListUseCase{
    listMilestone(input:IMilestoneListInputDtos):Promise<IMilestoneListOutputDtos>
}