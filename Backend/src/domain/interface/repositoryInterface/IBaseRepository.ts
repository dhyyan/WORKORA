import { FilterQuery, Types } from "mongoose";
import { Job } from "../../entities/job.entity";

export interface IBaseRepository<T> {
    create(data: T): Promise<T>
    delete(id: Types.ObjectId): Promise<T | null>

    findById(id: Types.ObjectId): Promise<T | null>
    findByEmail(email: string): Promise<T | null>
    findAll(filter?: FilterQuery<T>): Promise<T[]>;
    update(id: Types.ObjectId, data: Partial<T>): Promise<T | null>;
}

// export interface IClientRepository {
//     create(data: Client): Promise<Client | null>
//     deleteById(id: string): Promise<Client | null>
//     findByEmail(email: string): Promise<Client | null>
//     findById(_id: string): Promise<Client | null>
//     // googleLogin(user:Client):Promise<Client|null>
//     changePassword(id: string | undefined, password: string): Promise<Client | null>
//     updateProfile(id: string, user: Partial<Client>): Promise<Client | null>
//     findAll():Promise<Client[]|null>
// }