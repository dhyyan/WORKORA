import { Types } from "mongoose";
import { Job } from "../../entities/job.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IJobRepository extends IBaseRepository<Job> {
     findByIdAndUpdate(id: Types.ObjectId, job: Partial<Job>): Promise<Job | null>

     listJob(status: string, category: string[], skills: string[], priceRange: number[], page: number, limit: number, search?: string): Promise<{ jobs: Job[], totalJobs: number }>

     findClientJobsPaginated(clientId: Types.ObjectId, page: number, limit: number): Promise<{ jobs: Job[], totalJobs: number }>
} 