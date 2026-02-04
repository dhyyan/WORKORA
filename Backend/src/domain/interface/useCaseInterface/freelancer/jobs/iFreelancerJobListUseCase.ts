import { JobListOutPutDtos } from "../../../DTOs/freelancer/JobDtos";

export interface IFreelancerListJobUseCase {
    listJobs(): Promise<JobListOutPutDtos>
    findJobById(id: string): Promise<BaseJobOutPutDtos | null>
}