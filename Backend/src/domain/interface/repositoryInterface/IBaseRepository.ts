import { FilterQuery } from "mongoose";
import { Job } from "../../entities/job.entity";

export interface IBaseRepository<T> {
    create(data: T): Promise<T>
    delete(id: string): Promise<T | null>
    findById(id: string): Promise<T | null>
    findByEmail(email: string): Promise<T | null>
    findAll(filter?: FilterQuery<T>): Promise<T[]>;
    findByIdAndUpdate(id: string, job: Partial<Job>): Promise<Job | null>
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