import { emitWarning } from "process";
import { IApproveMilestonePaymentInputDtos, IApproveMilestonePaymentOutputDtos } from "../../../domain/interface/DTOs/client/milestoneDtos";
import { IMilestoneRepository } from "../../../domain/interface/repositoryInterface/IMilestoneRepository";
import { IApproveMilestonePaymentUsecase } from "../../../domain/interface/useCaseInterface/client/milestone/iApproveMilestonePaymentUsecase";

export class ApproveMilestonePaymentUsecase implements IApproveMilestonePaymentUsecase{
    private _milestoneRepository:IMilestoneRepository
    constructor(milestoneRepository:IMilestoneRepository){
        this._milestoneRepository=milestoneRepository
    }
    async approvePayment(input: IApproveMilestonePaymentInputDtos): Promise<IApproveMilestonePaymentOutputDtos> {
       try {
        const findMilestone=await this._milestoneRepository.findById(input.milestoneId)
        if(!findMilestone)throw new Error("milestone in this id not find")
            console.log("finde Milestone",findMilestone)

        const updateMilestone=await this._milestoneRepository.update(findMilestone._id!,{status:"approved"})
        if(!updateMilestone)throw new Error("error while updating milestone")
            console.log("updated milestone",updateMilestone)

        return{success:true}
       } catch (error) {
        throw error
       }
    }
}