import { IRequestMilestoneChangeInputDtos, IRequestMilestoneChangeOutputDtos } from "../../../domain/interface/DTOs/client/milestoneDtos";
import { IMilestoneRepository } from "../../../domain/interface/repositoryInterface/IMilestoneRepository";
import { IRequestMilestoneChangeUseCase } from "../../../domain/interface/useCaseInterface/client/milestone/iRequestMilestoneChangeUsecase";

export class RequestMilestoneChangeUsecase implements IRequestMilestoneChangeUseCase {
    private _milestoneRepository: IMilestoneRepository
    constructor(milestoneRepository: IMilestoneRepository) {
        this._milestoneRepository = milestoneRepository
    }
    async requestChange(input: IRequestMilestoneChangeInputDtos): Promise<IRequestMilestoneChangeOutputDtos> {
        try {
            const findMilestone = await this._milestoneRepository.findById(input.milestoneId)
            if (!findMilestone) throw new Error("milestone in this id not find")
            console.log("finde Milestone", findMilestone)

            const updateMilestone=await this._milestoneRepository.update(findMilestone._id!,{status:"rejected",reason:input.reason})
            if(!updateMilestone)throw new Error("error while updating milestone in useCase")
                console.log("updateMilestone",updateMilestone)

            return{success:true}


        } catch (error) {
            throw error

        }
    }
}