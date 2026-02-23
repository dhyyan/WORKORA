import { FilterQuery, Types } from "mongoose";

export interface IBaseRepository<T> {
    create(data: T): Promise<T>
    delete(id: Types.ObjectId): Promise<T | null>
    findById(id: Types.ObjectId): Promise<T | null>
    findByEmail(email: string): Promise<T | null>
    findAll(filter?: FilterQuery<T>): Promise<T[]>;
    update(id: Types.ObjectId, data: Partial<T>): Promise<T | null>;
}

