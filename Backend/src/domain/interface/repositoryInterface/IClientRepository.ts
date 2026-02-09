import { Types } from "mongoose";
import { Client } from "../../entities/client.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IClientRepository {
    create(data: Client): Promise<Client | null>
    deleteById(id: Types.ObjectId): Promise<Client | null>
    findByEmail(email: string): Promise<Client | null>
    findById(_id:Types.ObjectId): Promise<Client | null>
    // googleLogin(user:Client):Promise<Client|null>
    changePassword(id: Types.ObjectId | undefined, password: string): Promise<Client | null>
    updateProfile(id: Types.ObjectId, user: Partial<Client>): Promise<Client | null>
    findAll(): Promise<Client[] | null>
}