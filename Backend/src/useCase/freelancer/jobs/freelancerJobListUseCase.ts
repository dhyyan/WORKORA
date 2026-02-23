import { Types } from "mongoose";
import { BaseJobOutPutDtos } from "../../../domain/interface/DTOs/client/JobDto";
import { JobListOutPutDtos } from "../../../domain/interface/DTOs/freelancer/JobDtos";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { IFreelancerListJobUseCase } from "../../../domain/interface/useCaseInterface/freelancer/jobs/iFreelancerJobListUseCase";

export class FreelancerJobListUseCase implements IFreelancerListJobUseCase {
    private _jobRepository: IJobRepository
    constructor(jobRepository: IJobRepository) {
        this._jobRepository = jobRepository
    }
    async listJobs(): Promise<JobListOutPutDtos> {
        try {
            console.log("f job list useCase called")
            const response = await this._jobRepository.findAll({status:"open"});
            console.log('response of job list  :>> ', response);
            if (!response) throw new Error("connot find any jobs")
            const jobs: BaseJobOutPutDtos[] = response.map((job) => ({
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

            return { jobs }
        } catch (error) {
            throw error
        }
    }

    async findJobById(id: Types.ObjectId): Promise<BaseJobOutPutDtos | null> {
        try {
            console.log("job id",id)
            const job = await this._jobRepository.findById(id);
            if (!job) return null;
            return {
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
                createAt: job.createdAt ? new Date(job.createdAt) : undefined
            };
        } catch (error) {
            throw error;
        }
    }
}