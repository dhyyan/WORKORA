import { Job } from "../../entities/job.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IJobRepository extends IBaseRepository<Job>{
     updateProfile(id: string, job: Partial<Job>): Promise<Job | null>
} 