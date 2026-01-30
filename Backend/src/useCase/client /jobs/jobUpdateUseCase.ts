import { JobUpdateInputDtos, JobUpdateOutputDtos } from "../../../domain/interface/DTOs/client/JobDto";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { IJobUpdateUseCase } from "../../../domain/interface/useCaseInterface/client/jobs/iJobUpdateUseCase";

export class JobUpdateUseCase implements IJobUpdateUseCase {
    private _jobRepository: IJobRepository
    constructor(jobRepository: IJobRepository) {
        this._jobRepository = jobRepository
    }
    async updateJob(input: JobUpdateInputDtos): Promise<JobUpdateOutputDtos> {
        const job = input
        if (!job._id) throw new Error("job id is missing")
        console.log("input in usecase", job._id)
        try {

            const findJob = await this._jobRepository.findById(job._id!)

            console.log("findeeeyyyy", findJob)
            if (!findJob) throw new Error('job in this id not found')


            const jobs = await this._jobRepository.findByIdAndUpdate(findJob._id!, job)
            if(!jobs)throw new Error("error while updating job")
            console.log("job view in usecase", jobs)

            return {
                jobs
            }

        } catch (error) {
            throw error
        }
    }
}