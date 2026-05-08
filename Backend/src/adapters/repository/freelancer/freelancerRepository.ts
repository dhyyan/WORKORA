import  { Types } from "";
import { Freelancer } from "../../../domain/entities/freelancerntity";
import { IFreelancerRepository } from "../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { freelacerModel } from "../../../frameWork/database/models/freelancerModel";
import { BaseRepository } from "../BaseRepo/baseRepository";

export class FreelancerRepository extends BaseRepository<Freelancer> implements IFreelancerRepository {
    constructor() {
        super(freelacerModel)
    }

    // async create(data: Freelancer): Promise<Freelancer | null> {
    //     return await freelacerModel.create(data)
    // }

    // async deleteById(id: Types.ObjectId): Promise<Freelancer | null> {
    //     return await freelacerModel.findByIdAndDelete(id)
    // }
    // async findByEmail(email: string): Promise<Freelancer | null> {
    //     return await freelacerModel.findOne({ email })
    // }
    // async findById(_id: Types.ObjectId): Promise<Freelancer | null> {
    //     if (!mongoose.Types.ObjectId.isValid(_id)) {
    //         return null;
    //     }
    //     return await freelacerModel.findById(new mongoose.Types.ObjectId(_id));
    // }
    // async updateProfile(id: Types.ObjectId, user: Partial<Freelancer>): Promise<Freelancer | null> {
    //     return await freelacerModel.findByIdAndUpdate(id, user, { new: true })
    // }
    // async findAll(): Promise<Freelancer[] | null> {
    //     return freelacerModel.find({ role: "freelancer" });
    // }
    async changePassword(id: Types.ObjectId | undefined, hashedPassword: string): Promise<Freelancer | null> {
        if (!id) return null;

        return await freelacerModel.findByIdAndUpdate(
            id,
            { password: hashedPassword },
            { new: true }
        );
    }

    async findAllFreelancer(page: number, limit: number, search: string): Promise<{ freelancer: Freelancer[], totalFreelancer: number }> {
        const query: any = {}
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } }
            ]
        }
        const skipamount = (page - 1) * limit
        const [freelancer, totalFreelancer] = await Promise.all([
            freelacerModel.find(query).skip(skipamount).limit(limit),
            freelacerModel.countDocuments(query)
        ])
        return { freelancer, totalFreelancer };

    }

}