import { BaseJobOutPutDtos, JobListInputDtos, JobListOutPutDtos } from "../../../domain/interface/DTOs/client/JobDto";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { IJobListUseCase } from "../../../domain/interface/useCaseInterface/client/jobs/jobListUseCase";

export class JobListUseCase implements IJobListUseCase {
    private _jobRepository: IJobRepository
    constructor(jobRepository: IJobRepository) {
        this._jobRepository = jobRepository
    }
    async listJobs(input: JobListInputDtos): Promise<JobListOutPutDtos> {
        try {
            if (!input.id) {
                throw new Error("user id is missing");
            }
            console.log("id in use case", input.id);
            const { page = 1, limit = 5 } = input;

            const response = await this._jobRepository.findClientJobsPaginated(input.id, page, limit);
            console.log("list jobs paginated", response.jobs);

            const jobs: BaseJobOutPutDtos[] = response.jobs.map((job) => ({
                _id: job._id!,
                clientId: job.clientId,
                title: job.title,
                summary: job.summary,
                features: job.features,
                category: job.category,
                duration: job.duration,
                deadline: job.deadline,
                price: job.price,
                status: job.status,
                createdAt: job.createdAt
            }));

            return { jobs, totalJobs: response.totalJobs };
        } catch (error) {
            throw error;
        }
    }

}