import { JobViewInputDtos, JobViewOutputDtos } from "../../../domain/interface/DTOs/client/JobDto";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { IJobViewUseCase } from "../../../domain/interface/useCaseInterface/client/jobs/jobViewUseCase";

export class JobViewUseCase implements IJobViewUseCase {
    private _jobRepository: IJobRepository
    constructor(jobRepository: IJobRepository) {
        this._jobRepository = jobRepository
    }
    async viewJob(input: JobViewInputDtos): Promise<JobViewOutputDtos> {
        try {
            if (!input) throw new Error("job id is missing")
            const job = await this._jobRepository.findById(input.id)
            console.log("job view detail in use case",job)
            if(!job)throw new Error("job not found")
                return{
                    job
                }
        } catch (error) {
            throw error
        }
    }
}