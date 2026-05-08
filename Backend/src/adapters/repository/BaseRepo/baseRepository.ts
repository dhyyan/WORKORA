import { FilterQuery, Model, Types } from "mongoose";
import { IBaseRepository } from "../../../domain/interface/repositoryInterface/IBaseRepository";

export class BaseRepository<T> implements IBaseRepository<T> {
    protected model: Model<T>;
    constructor(model: Model<T>) {
        this.model = model
    }
    async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
        console.log("find all data", filter)
        return this.model.find(filter);
    }
    async create(data: T): Promise<T> {
        console.log("create data in base repo", data)
        const created = await this.model.create(data)
        console.log("created", created)
        return created
    }
    delete(id: Types.ObjectId): Promise<T | null> {
        return this.model.findByIdAndDelete(id)
    }
    findById(id: Types.ObjectId): Promise<T | null> {
        console.log("ideyy", id)
        return this.model.findById(id)
    }

    findByEmail(email: string): Promise<T | null> {
        return this.model.findOne({ email })
    }

    async update(id: Types.ObjectId, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }



}