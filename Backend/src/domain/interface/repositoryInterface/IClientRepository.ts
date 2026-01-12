import { Client } from "../../entities/client.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IClientRepository {
    create(data: Client): Promise<Client | null>
    deleteById(id: string): Promise<Client | null>
    findByEmail(email: string): Promise<Client | null>
    findById(_id: string): Promise<Client | null>
    // googleLogin(user:Client):Promise<Client|null>
    changePassword(id: string | undefined, password: string): Promise<Client | null>
    updateProfile(id: string, user: Partial<Client>): Promise<Client | null>
    findAll():Promise<Client[]|null>
}