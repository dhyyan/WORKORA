import { Query, Types } from "mongoose";
import { Client } from "../../../domain/entities/client.entity";
import { IClientRepository } from "../../../domain/interface/repositoryInterface/IClientRepository";
import { clientModel } from "../../../frameWork/database/models/client.model";
import { BaseRepository } from "../BaseRepo/baseRepository";
import { jobModel } from "../../../frameWork/database/models/job.model";

export class ClientRepository extends BaseRepository<Client> implements IClientRepository {
    constructor() {
        super(clientModel)
    }
    // async create(data: Client): Promise<Client | null> {
    //     return await clientModel.create(data)
    // }return { clients };

    // async deleteById(id: Types.ObjectId): Promise<Client | null> {
    //     return await clientModel.findByIdAndDelete(id)
    // }

    // async findByEmail(email: string): Promise<Client | null> {
    //     return await clientModel.findOne({ email })
    // }

    // async findById(_id: Types.ObjectId): Promise<Client | null> {
    //     return await clientModel.findById(_id)
    // }

    // async updateProfile(id: Types.ObjectId, user: Partial<Client>): Promise<Client | null> {
    //     return await clientModel.findByIdAndUpdate(id, user, { new: true })
    // }

    async updateProfile(id: Types.ObjectId, data: Partial<Client>): Promise<Client | null> {
        console.log("updating client profile in repo", id, data)
        return await clientModel.findByIdAndUpdate(id, data, { new: true })
    }

    async changePassword(id: Types.ObjectId, hashedPassword: string): Promise<Client | null> {
        if (!id) return null;

        return await clientModel.findByIdAndUpdate(
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
            clientModel.find(query).skip(skipamount).limit(limit),
            clientModel.countDocuments(query)
        ])
        return { client, totalClients };

    }
}