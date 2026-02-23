import { SubmitMilestoneInputDtos, SubmitMilestoneOutputDtos } from "../../../domain/interface/DTOs/freelancer/milestoneDtos";
import { IMilestoneRepository } from "../../../domain/interface/repositoryInterface/IMilestoneRepository";
import { ISubmitMilestoneUseCase } from "../../../domain/interface/useCaseInterface/freelancer/jobs/milestone/submitMilestoneUsecase";

export class SubmitMilestoneUsecase implements ISubmitMilestoneUseCase{

    private _milestoneRepository: IMilestoneRepository;
    constructor(milestoneRepository: IMilestoneRepository){
        this._milestoneRepository = milestoneRepository
    }
    async sumbitTask(input: SubmitMilestoneInputDtos): Promise<SubmitMilestoneOutputDtos> {

        try {
            
            let id=input.milestoneId
            console.log("mile id",id)
            const findMilestone=await this._milestoneRepository.findById(id)
            if(!findMilestone)throw new Error("milestone in this id not found")
    
                let taskUrl=input.taskUrl
                let description=input.description


                const updateMilestone=await this._milestoneRepository.update(id,{taskUrl,description,status:"submited"})
                if(!updateMilestone)throw new Error("update failed")
                    console.log("updated milestone",updateMilestone)

                return{success:true}
        } catch (error) {
            throw error
        }

            

    }
}