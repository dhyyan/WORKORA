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
            const {page,limit,search}=input
            console.log("page,limt, search",page,limit,search)

            const  response= await this._clientRepository.findAllClient(page,limit,search)
            console.log("list users data from usecase", response.client)
            if (!response.client) throw new Error("users not found")

            const clients: BaseClientOutputDtos[] = response.client.map((user) => ({
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

            return {clients,totalClients:response.totalClients};

        } catch (error) {
            console.log("error in list user useCase", error)
            throw error
        }
    }
}