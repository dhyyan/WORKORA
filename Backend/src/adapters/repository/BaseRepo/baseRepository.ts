import { FilterQuery, Model } from "mongoose";
import { IBaseRepository } from "../../../domain/interface/repositoryInterface/IBaseRepository";

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
        return this.model.findById(id)
    }
    findByEmail(email: string): Promise<T | null> {
        return this.model.findOne({email})
    }
  
}