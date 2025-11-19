import { Client } from "../../entities/client.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IClientRepository {
    create(data: Client): Promise<Client | null>
    deleteById(id: string): Promise<Client | null>
    fidByEmail(email: string): Promise<Client | null>
    findByEmail(email: string): Promise<Client | null>
    findById(_id: string): Promise<Client | null>
    // googleLogin(user:Client):Promise<Client|null>
    changePassword(id: string | undefined, password: string): Promise<Client | null>
    updateProfile(email: string, phone: string, name: string, profile_image: string): Promise<Client | null>
}