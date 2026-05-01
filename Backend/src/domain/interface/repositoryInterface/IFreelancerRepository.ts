import { Types } from "mongoose";
import { Freelancer } from "../../entities/freelancerntity";
import { IBaseRepository } from "./IBaseRepository";

export interface IFreelancerRepository extends IBaseRepository<Freelancer> {
    // create(data: Freelancer): Promise<Freelancer | null>
    // deleteById(id: Types.ObjectId): Promise<Freelancer | null>
    // findByEmail(email: string): Promise<Freelancer | null>
    // findById(_id: Types.ObjectId): Promise<Freelancer | null>
    // // googleLogin(user:Client):Promise<Client|null>
    // updateProfile(id: Types.ObjectId, user: Partial<Freelancer>): Promise<Freelancer | null>
    // findAll(): Promise<Freelancer[] | null>
    changePassword(id: Types.ObjectId | undefined, password: string): Promise<Freelancer | null>
    findAllFreelancer(page: number, limit: number, search: string): Promise<{ freelancer: Freelancer[], totalFreelancer: number }>
}