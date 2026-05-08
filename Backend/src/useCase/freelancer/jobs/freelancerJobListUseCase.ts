import { Types } from "mongoose";
import { BaseJobOutPutDtos } from "../../../domain/interface/DTOs/client/JobDto";
import { JobListOutPutDtos, JobViewOutputDtos, ListJobInputDtos } from "../../../domain/interface/DTOs/freelancer/JobDtos";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { IFreelancerListJobUseCase } from "../../../domain/interface/useCaseInterface/freelancer/jobs/iFreelancerJobListUseCase";
import { IClientRepository } from "../../../domain/interface/repositoryInterface/IClientRepository";

export class FreelancerJobListUseCase implements IFreelancerListJobUseCase {
    private _jobRepository: IJobRepository
    private _clientRepository: IClientRepository
    constructor(jobRepository: IJobRepository, clientRepository: IClientRepository) {
        this._jobRepository = jobRepository
        this._clientRepository = clientRepository
    }
    async listJobs({ category, skills, priceRange, page, limit, search }: ListJobInputDtos): Promise<JobListOutPutDtos> {
        console.log("f job list useCase called")
            const response = await this._jobRepository.listJob("open", category, skills, priceRange, page, limit, search);
            console.log('response of job list  :>> ', response);
            if (!response || !response.jobs) throw new Error("connot find any jobs")
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

            return { jobs, totalJobs: response.totalJobs }
    }

    async findJobById(id: Types.ObjectId): Promise<JobViewOutputDtos | null> {
        console.log("job id", id)
            const job = await this._jobRepository.findById(id);
            if (!job) throw new Error("job in this id not found")

            const findUser = await this._clientRepository.findById(job.clientId)
            if (!findUser) throw new Error("user in this id not found at this job")

            const jobDetail: BaseJobOutPutDtos = {
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
            }

            const user = {
                name: findUser.name,
                email: findUser.email,
                phone: findUser.phone,
                profileImage: findUser.profileImage
            }
            return { jobDetail, user };
    }
}