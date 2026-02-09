import { ClientListInputDtos, ClientListOutputDtos } from "../../../domain/interface/DTOs/admin/client/clientDtos";
import { BaseClientOutputDtos } from "../../../domain/interface/DTOs/client/AuthDto";
import { IClientRepository } from "../../../domain/interface/repositoryInterface/IClientRepository";
import { IClientListUseCase } from "../../../domain/interface/useCaseInterface/admin/client/clientListUseCase";

export class ClientListUseCase implements IClientListUseCase {
    private _clientRepository: IClientRepository
    constructor(clientRepository: IClientRepository) {
        this._clientRepository = clientRepository

    }
    async listclients(input: ClientListInputDtos): Promise<ClientListOutputDtos> {
        try {
            const users = await this._clientRepository.findAll()
            console.log("list users data from usecase", users)
            if (!users) throw new Error("users not found")

            const clients: BaseClientOutputDtos[] = users.map((user) => ({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: "client",
                profileImage: user.profileImage,
                isBlocked: user.isBlocked,
                createdAt: user.createdAt,
                // googleId: user.googleId,
                // isSubscribed: user.isSubscribed,
            }));

            return { clients };

        } catch (error) {
            console.log("error in list user useCase", error)
            throw error
        }
    }
}