import { BaseRepository } from "../BaseRepo/baseRepository";
import { jobModel } from "../../../frameWork/database/models/job.model";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { Job } from "../../../domain/entities/job.entity";

export class JobRepository extends BaseRepository<Job> implements IJobRepository {
    constructor(){
        super (jobModel)
    }
   async updateProfile(id: string, job: Partial<Job>): Promise<Job | null> {
       return await jobModel.findByIdAndUpdate(id,job,{new:true})
    }

}