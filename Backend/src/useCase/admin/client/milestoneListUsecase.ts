import { IMilestoneListInputDtos, IMilestoneListOutputDtos } from "../../../domain/interface/DTOs/admin/client/clientDtos";
import { IMilestoneRepository } from "../../../domain/interface/repositoryInterface/IMilestoneRepository";
import { IMilestoneListUseCase } from "../../../domain/interface/useCaseInterface/admin/client/ImilestoneListUseCase";

export class MilestoneListUsecase implements IMilestoneListUseCase {
    private _milestoneRepository: IMilestoneRepository
    constructor(milestoneRepository: IMilestoneRepository) {
        this._milestoneRepository = milestoneRepository
    }
    async listMilestone(input: IMilestoneListInputDtos): Promise<IMilestoneListOutputDtos> {

        const listmilestone=await this._milestoneRepository.findAllMilestone(input.page,input.limit)
        if(!listmilestone)throw new Error("error while listing milestones in admin usecase")
            return {miletstone:listmilestone.milestone,totalMilestone:listmilestone.totalMilestone,totalEscrowAmount:listmilestone.totalEscrowAmount}
    }
}