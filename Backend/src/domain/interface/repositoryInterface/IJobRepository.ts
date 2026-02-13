import { Types } from "mongoose";
import { Job } from "../../entities/job.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IJobRepository extends IBaseRepository<Job>{
     findByIdAndUpdate(id: Types.ObjectId, job: Partial<Job>): Promise<Job | null>
} 