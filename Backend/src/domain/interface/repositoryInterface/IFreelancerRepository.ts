import { Freelancer } from "../../entities/freelancerntity";
import { IBaseRepository } from "./IBaseRepository";

export interface IFreelancerRepository {
    create(data: Freelancer): Promise<Freelancer | null>
    deleteById(id: string): Promise<Freelancer | null>
    findByEmail(email: string): Promise<Freelancer | null>
    findById(_id: string): Promise<Freelancer | null>
    // googleLogin(user:Client):Promise<Client|null>
    changePassword(id: string | undefined, password: string): Promise<Freelancer | null>
    updateProfile(email: string, phone: string, name: string, profile_image: string): Promise<Freelancer | null>
}