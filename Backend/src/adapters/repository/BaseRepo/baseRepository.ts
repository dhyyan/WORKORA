import { FilterQuery, Model } from "mongoose";
import { IBaseRepository } from "../../../domain/interface/repositoryInterface/IBaseRepository";
import { Job } from "../../../domain/entities/job.entity";
import { jobModel } from "../../../frameWork/database/models/job.model";

export class BaseRepository<T> implements IBaseRepository<T>{
     protected model: Model<T>;
    constructor(model:Model<T>) {
        this.model=model
    }
     async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter);
  }
    create(data: T): Promise<T> {
        return this.model.create(data)
    }
    delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id)
    }
    findById(id: string): Promise<T | null> {
        console.log("ideyy",id)
        return this.model.findById(id)
    }
    findByEmail(email: string): Promise<T | null> {
        return this.model.findOne({email})
    }

    async findByIdAndUpdate(id: string, job: Partial<Job>): Promise<Job | null> {
            return await jobModel.findByIdAndUpdate(id, job, { new: true })
        }
  
}