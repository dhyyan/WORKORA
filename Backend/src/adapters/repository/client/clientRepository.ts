import { Query, Types } from "mongoose";
import { Client } from "../../../domain/entities/client.entity";
import { IClientRepository } from "../../../domain/interface/repositoryInterface/IClientRepository";
import { clietModel } from "../../../frameWork/database/models/client.model";
import { BaseRepository } from "../BaseRepo/baseRepository";
import { jobModel } from "../../../frameWork/database/models/job.model";

export class ClientRepository extends BaseRepository<Client> implements IClientRepository {
    constructor() {
        super(clietModel)
    }   
    // async create(data: Client): Promise<Client | null> {
    //     return await clietModel.create(data)
    // }return { clients };

    // async deleteById(id: Types.ObjectId): Promise<Client | null> {
    //     return await clietModel.findByIdAndDelete(id)
    // }

    // async findByEmail(email: string): Promise<Client | null> {
    //     return await clietModel.findOne({ email })
    // }

    // async findById(_id: Types.ObjectId): Promise<Client | null> {
    //     return await clietModel.findById(_id)
    // }

    // async updateProfile(id: Types.ObjectId, user: Partial<Client>): Promise<Client | null> {
        //     return await clietModel.findByIdAndUpdate(id, user, { new: true })
        // }
        
        async changePassword(id: Types.ObjectId, hashedPassword: string): Promise<Client | null> {
            if (!id) return null;
    
            return await clietModel.findByIdAndUpdate(
                id,
             { password: hashedPassword },
                { new: true }
            );
        }

    async findAllClient(page: number, limit: number, search: string): Promise<{ client: Client[], totalClients: number }> {
        const query: any = {}
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } }
            ]
        }
        const skipamount = (page - 1) * limit
        const [client, totalClients] = await Promise.all([
            clietModel.find(query).skip(skipamount).limit(limit),
            clietModel.countDocuments(query)
        ])
        return { client, totalClients };

    }
}