import { BaseClientOutputDtos } from "../../../../domain/interface/DTOs/client/AuthDto";
import { UpateProfileInputDtos, UpateProfileOutputDtos } from "../../../../domain/interface/DTOs/client/ProfileDto";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IUpateProfileUseCase } from "../../../../domain/interface/useCaseInterface/client/Dashboard/Profile/UpdateProfileUseCase";

export class UpateProfileUseCase implements IUpateProfileUseCase {

    private _clientRepository: IClientRepository
    constructor(clientRepository: IClientRepository) {
        this._clientRepository = clientRepository
    }
    async updateProfile(input: UpateProfileInputDtos): Promise<UpateProfileOutputDtos> {
        const { email, name, phone, profileImage } = input
        
        console.log("user profile usecase data", input)

        try {
            console.log("looooogoogo")
            const exist = await this._clientRepository.findByEmail(email)
            if (!exist) throw new Error("user in this email not founded ")
            const updateProfile = await this._clientRepository.updateProfile(
                exist._id?.toString()!,
                input,

                
            )
            console.log("updateduser dataa", updateProfile)
            const updatedUser: BaseClientOutputDtos = {
                _id: updateProfile?._id,
                name: updateProfile?.name??'',
                email: updateProfile?.email??"",
                phone: updateProfile?.phone,
                role: "client",
                profileImage: updateProfile?.profileImage,
                isBlocked: updateProfile?.isBlocked,
                isSubscribed:updateProfile?.isSubscribed,
               
            }
            return {
                updatedUser,
                success: true
            }
        } catch (error) {
            console.log(error)
            throw error 

        }
    }
}