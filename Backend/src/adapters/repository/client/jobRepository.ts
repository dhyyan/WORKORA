import { BaseRepository } from "../BaseRepo/baseRepository";
import { jobModel } from "../../../frameWork/database/models/job.model";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { Job } from "../../../domain/entities/job.entity";
import { Types } from "mongoose";

export class JobRepository extends BaseRepository<Job> implements IJobRepository {
    constructor(){
        super (jobModel)
    }
    
  async findByIdAndUpdate(id: Types.ObjectId, job: Partial<Job>): Promise<Job | null> {
            return await jobModel.findByIdAndUpdate(id, job, { new: true })
        }

}