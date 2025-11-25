import { Client } from "../../../domain/entities/client.entity";
import { IClientRepository } from "../../../domain/interface/repositoryInterface/IClientRepository";
import { clietModel } from "../../../frameWork/database/models/client.model";

export class ClientRepository implements IClientRepository {

    async create(data: Client): Promise<Client | null> {
        return await clietModel.create(data)
    }

    async deleteById(id: string): Promise<Client | null> {
        return await clietModel.findByIdAndDelete(id)
    }

    async findByEmail(email: string): Promise<Client | null> {
        return await clietModel.findOne({ email })
    }

    async findById(_id: string): Promise<Client | null> {
        return await clietModel.findById(_id)
    }

    async changePassword(id: string | undefined, hashedPassword: string): Promise<Client | null> {
        if (!id) return null;

        return await clietModel.findByIdAndUpdate(
            id,
            { password: hashedPassword },
            { new: true }
        );
    }
    async updateProfile(email: string, phone: string, name: string, profile_image: string): Promise<Client | null> {
        return await clietModel.findOneAndUpdate({ email })
    }
}