import { BaseJobOutPutDtos } from "../../../domain/interface/DTOs/client/JobDto";
import { ListAcceptJobInputDtos, ListAcceptJobOutputDtos } from "../../../domain/interface/DTOs/freelancer/JobDtos";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { IListAcceptJobUseCase } from "../../../domain/interface/useCaseInterface/freelancer/jobs/IListAccetJobUseCase";

export class ListAcceptJobsUsecse implements IListAcceptJobUseCase{
    private _jobRepository:IJobRepository
    constructor(jobRepository:IJobRepository){
        this._jobRepository=jobRepository
    }
    async listJobs(input: ListAcceptJobInputDtos): Promise<ListAcceptJobOutputDtos> {
        try {
            const jobList=await this._jobRepository.findAll({freelancerId:input.freelancerId,status:"assigned"})
            if(!jobList)throw new Error("jobs in this freelancer id not found")

                console.log("listed jobs",jobList)

               const jobs: BaseJobOutPutDtos[] = jobList.map((job) => ({
                _id:job._id!,
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

            return { jobs };
        } catch (error) {
            throw error
        }
    }
}