import { Types } from "mongoose";
import { JobListOutPutDtos, JobViewOutputDtos, ListJobInputDtos } from "../../../DTOs/freelancer/JobDtos";
// import { BaseJobOutPutDtos, JobViewOutputDtos } from "../../../DTOs/client/JobDto";

export interface IFreelancerListJobUseCase {
    listJobs(input:ListJobInputDtos): Promise<JobListOutPutDtos>
    findJobById(id: Types.ObjectId): Promise<JobViewOutputDtos | null>
}