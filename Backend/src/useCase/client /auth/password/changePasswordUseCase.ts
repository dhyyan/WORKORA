import { ChangePasswordIputDtos, ChangePasswordOutPutDtos } from "../../../../domain/interface/DTOs/client/AuthDto";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IHashPassword } from "../../../../domain/interface/serviceInterface/IHashPassword";
import { IChangePasswordUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/password/IChangePasswordUseCase";

export class ChangePassowrdUseCase implements IChangePasswordUseCase{
    private _freelancerRepo:IFreelancerRepository
    private _clientRepository:IClientRepository
    private _hashPassword:IHashPassword
    constructor(freelancerRepo:IFreelancerRepository,clientRepository:IClientRepository,hashPassword:IHashPassword){
        this._freelancerRepo=freelancerRepo
        this._clientRepository=clientRepository
        this._hashPassword=hashPassword
    }
    async update(input: ChangePasswordIputDtos): Promise<ChangePasswordOutPutDtos> {
        const {email,password}=input
        const user=await this._clientRepository.findByEmail(email)

        const fExist=await this._freelancerRepo.findByEmail(email)

        if(!user||fExist)throw new Error("email in this user not found")

            const hashPassword=await this._hashPassword.hashPassword(password)

        if (!hashPassword) throw new Error('Error while hashing password')

            const updateClient=await this._clientRepository.changePassword(user._id,hashPassword)

         if (!updateClient) throw new Error('error while updating new password in client')

            if(!user._id)throw new Error("user id is missing")
            return{
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
    }
    
}