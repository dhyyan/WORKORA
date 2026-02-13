import { JobCreateInputDtos, JobCreateOutPutDtos } from "../../../domain/interface/DTOs/client/JobDto";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { IJobCreateUseCase } from "../../../domain/interface/useCaseInterface/client/jobs/jobCreateUseCase";

export class JobCreateUseCase implements IJobCreateUseCase{
    private _jobRepository:IJobRepository
    constructor(jobRepository:IJobRepository){
        this._jobRepository=jobRepository
    }
    async create(input: JobCreateInputDtos): Promise<JobCreateOutPutDtos> {
        try {
             console.log("job data in usecase",input)
            

             const job =await this._jobRepository.create({...input, status:"open"})
             console.log("create job in use case",job)

             if(!job)throw new Error("Error while creating job in useCase")
                console.log('kkkkkkkkk')

            return{
                job,
                success:true
              }

        } catch (error) {
            
            throw error
        }
    }
}