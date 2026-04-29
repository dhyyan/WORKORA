import { emitWarning } from "process";
import { IApproveMilestonePaymentInputDtos, IApproveMilestonePaymentOutputDtos } from "../../../domain/interface/DTOs/client/milestoneDtos";
import { IContractRepository } from "../../../domain/interface/repositoryInterface/IContractRepository";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { IMilestoneRepository } from "../../../domain/interface/repositoryInterface/IMilestoneRepository";
import { IApproveMilestonePaymentUsecase } from "../../../domain/interface/useCaseInterface/client/milestone/iApproveMilestonePaymentUsecase";

export class ApproveMilestonePaymentUsecase implements IApproveMilestonePaymentUsecase{
    private _milestoneRepository:IMilestoneRepository
    private _contractRepository:IContractRepository
    private _jobRepository:IJobRepository
    constructor(milestoneRepository:IMilestoneRepository, contractRepository:IContractRepository, jobRepository:IJobRepository){
        this._milestoneRepository=milestoneRepository
        this._contractRepository=contractRepository
        this._jobRepository=jobRepository
    }
    async approvePayment(input: IApproveMilestonePaymentInputDtos): Promise<IApproveMilestonePaymentOutputDtos> {
       try {
        const findMilestone=await this._milestoneRepository.findById(input.milestoneId)
        if(!findMilestone)throw new Error("milestone in this id not find")
            console.log("finde Milestone",findMilestone)

        const updateMilestone=await this._milestoneRepository.update(findMilestone._id!,{status:"approved"})
        if(!updateMilestone)throw new Error("error while updating milestone")
            console.log("updated milestone",updateMilestone)

        // Check if all milestones for this contract are approved/released and total matches budget
        const contract = await this._contractRepository.findById(findMilestone.contractId)
        if (contract && contract._id) {
            const allMilestones = await this._milestoneRepository.findAll({ contractId: contract._id })
            const allApprovedOrReleased = allMilestones.every(m => m.status === 'approved' || m.status === 'released')
            const totalMilestoneAmount = allMilestones.reduce((sum, m) => sum + m.amount, 0)

            if (allApprovedOrReleased && totalMilestoneAmount === contract.totalAmount) {
                await this._jobRepository.update(contract.jobId, { status: "closed" })
                await this._contractRepository.update(contract._id, { status: "completed" })
            }
        }

        return{success:true}
       } catch (error) {
        throw error
       }
    }
}