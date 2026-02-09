import { BaseClientOutputDtos } from "../../../../domain/interface/DTOs/client/AuthDto";
import { ClientDataInputDtos, ClientDataOutputDtos } from "../../../../domain/interface/DTOs/client/ProfileDto";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IClientDataUseCase } from "../../../../domain/interface/useCaseInterface/client/Dashboard/Profile/iclientDataUseCase";

export class ClientDataUseCasse implements IClientDataUseCase {
    private _clientRepository: IClientRepository
    constructor(clientRepository: IClientRepository) {
        this._clientRepository = clientRepository
    }
    async fetchData(input: ClientDataInputDtos): Promise<ClientDataOutputDtos> {
        try {
            const user = await this._clientRepository.findById(input.userId)
            if (!user) throw new Error("user in this id not found")
            const client: BaseClientOutputDtos = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: "client",
                phone: user.phone,
                profileImage: user.profileImage,
                isBlocked: user.isBlocked,
                isSubscribed: user.isSubscribed,
                googleId: user.googleId,
                createdAt: user.createdAt
            }
            return {
                client,
                success:true
            }
        } catch (error) {
            throw error
        }
    }
}