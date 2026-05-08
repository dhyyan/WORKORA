import { BaseJobOutPutDtos } from "../../../domain/interface/DTOs/client/JobDto";
import {  ListCompletedJobsInputDtos, ListCompletedJobsOuputDtos } from "../../../domain/interface/DTOs/freelancer/JobDtos";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { IListAcceptJobUseCase } from "../../../domain/interface/useCaseInterface/freelancer/jobs/IListAccetJobUseCase";

export class ListCopletedJobsUsecase implements IListAcceptJobUseCase {
    private _jobRepository: IJobRepository
    constructor(jobRepository: IJobRepository) {
        this._jobRepository = jobRepository
    }
    async listJobs(input: ListCompletedJobsInputDtos): Promise<ListCompletedJobsOuputDtos> {
        const joblist = await this._jobRepository.findAll({ freelancerId: input.freelancerId, status: "closed" })
            if (!joblist) throw new Error("jobs in this freelancer Id not found")
                console.log("list completed jobs iin usesaace",joblist)
            const jobs: BaseJobOutPutDtos[] = joblist.map((job) => ({
                _id: job._id!,
                clientId: job.clientId!,
                title: job.title,
                summary: job.summary,
                features: job.features,
                category: job.category,
                duration: job.duration,
                deadline: job.deadline,
                freelancerId:job.freelancerId,
                price: job.price,
                status: "closed",
                createAt: job.createdAt
            }))
            return { jobs }
    }
}