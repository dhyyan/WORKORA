import { Types } from "mongoose";
import { JobListOutPutDtos } from "../../../DTOs/freelancer/JobDtos";
import { BaseJobOutPutDtos } from "../../../DTOs/client/JobDto";

export interface IFreelancerListJobUseCase {
    listJobs(): Promise<JobListOutPutDtos>
    findJobById(id: Types.ObjectId): Promise<BaseJobOutPutDtos | null>
}