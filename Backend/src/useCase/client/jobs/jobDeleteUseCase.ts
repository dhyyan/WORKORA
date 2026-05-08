import { JobDeleteInputDtos, JobDeleteOutputDtos } from "../../../domain/interface/DTOs/client/JobDto";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { IJobDeleteUseCase } from "../../../domain/interface/useCaseInterface/client/jobs/IJobDeleteUseCase";

export class JobDeleteUseCase implements IJobDeleteUseCase {
    private _jobRepository: IJobRepository
    constructor(jobRepository: IJobRepository) {
        this._jobRepository = jobRepository
    }
    async deleteJob(input: JobDeleteInputDtos): Promise<JobDeleteOutputDtos> {
        if (!input) throw new Error("job id is missing")
        console.log("job id in usecase", input.id)
        const findjob = await this._jobRepository.findById(input.id)
            if (!findjob) throw new Error("job in this id not found")

            const deleteJob = await this._jobRepository.delete(findjob._id!)
            if (!deleteJob) throw new Error("error while deleting job")
            return { success: true }
    }
}