import mongoose from "mongoose";
import { Freelancer } from "../../../domain/entities/freelancerntity";
import { IFreelancerRepository } from "../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { freelacerModel } from "../../../frameWork/database/models/freelancerModel";

export class FreelancerRepository implements IFreelancerRepository {
    async create(data: Freelancer): Promise<Freelancer | null> {
        return await freelacerModel.create(data)
    }

    async deleteById(id: string): Promise<Freelancer | null> {
        return await freelacerModel.findByIdAndDelete(id)
    }
    async findByEmail(email: string): Promise<Freelancer | null> {
        return await freelacerModel.findOne({ email })
    }
    async findById(_id: string): Promise<Freelancer | null> {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return null;
        }
        return await freelacerModel.findById(new mongoose.Types.ObjectId(_id));
    }
    async changePassword(id: string | undefined, hashedPassword: string): Promise<Freelancer | null> {
        if (!id) return null;

        return await freelacerModel.findByIdAndUpdate(
            id,
            { password: hashedPassword },
            { new: true }
        );
    }
    async updateProfile(id: string, user: Partial<Freelancer>): Promise<Freelancer | null> {
        return await freelacerModel.findByIdAndUpdate(id, user, { new: true })
    }
    async findAll(): Promise<Freelancer[] | null> {
        return freelacerModel.find({ role: "freelancer" });
    }

}