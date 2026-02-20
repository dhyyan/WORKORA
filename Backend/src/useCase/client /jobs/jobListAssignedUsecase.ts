import { title } from "process";
import { JobListAssignInputDtos, JobListAssignOutputDtos } from "../../../domain/interface/DTOs/client/JobDto";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { IJobListAssignedUseCase } from "../../../domain/interface/useCaseInterface/client/jobs/IJobListAssignedUsecase";

export class JobListAssignedUsecase implements IJobListAssignedUseCase {
    private _jobRepository: IJobRepository
    constructor(jobRepository: IJobRepository) {
        this._jobRepository = jobRepository
    }
    async listJobs(input: JobListAssignInputDtos): Promise<JobListAssignOutputDtos[]> {
        try {
            const joblist = await this._jobRepository.findAll({ clientId: input.clientId, status: "assigned" })
            if (!joblist) throw new Error("jobs in this client not found")

            // const jobs = 

            return joblist.map((job): JobListAssignOutputDtos => ({
                _id: job._id!,
                title: job.title,
                summary: job.summary,
                features: job.features ?? [],
                category: job.category,
                duration: job.duration,
                deadline: job.deadline,
                price: job.price,
                status: "assigned",
            }));

        } catch (error) {
            throw error
        }

    }
}