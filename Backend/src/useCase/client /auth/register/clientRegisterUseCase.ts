import { Client } from "../../../../domain/entities/client.entity";
import { ClientRegisterInputDto, ClientRegisteroutputDto } from "../../../../domain/interface/DTOs/client/AuthDto";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IHashPassword } from "../../../../domain/interface/serviceInterface/IHashPassword";
import { IRegisterClientUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/register/IRegisterUseCase";

export class RegisterClientUseCase implements IRegisterClientUseCase {
    private _clientRepository: IClientRepository
    private _freelancerRepo:IFreelancerRepository
    private _hashPassword: IHashPassword
    constructor(clientRepo: IClientRepository, freelancerRepo:IFreelancerRepository, hashPassword: IHashPassword) {
        this._clientRepository = clientRepo
        this._freelancerRepo=freelancerRepo
        this._hashPassword = hashPassword
    }
    async createClient(client: ClientRegisterInputDto): Promise<ClientRegisteroutputDto> {
        const Cexist = await this._clientRepository.findByEmail(client.email)
        const Fexist=await this._freelancerRepo.findByEmail(client.email)

        if (Cexist||Fexist) throw new Error("user in this email already exist")
        const { password, email, name, phone } = client

        let hashPassword = null
        if (password) {
            hashPassword = await this._hashPassword.hashPassword(password)
        }

        const newCliet = await this._clientRepository.create({

            name,
            email,
            phone,
            password: hashPassword ?? "",
            role: "client",
            profileImage: "",
            isSubscribed: false,
            isBlocked: false,

        })

        if (!newCliet) throw new Error("Error while creating new Client")

        const returnClient: ClientRegisteroutputDto = {
            _id: newCliet._id?.toString()||"",
            name: newCliet.name,
            email: newCliet.email,
            phone: newCliet.phone,
            role: 'client',
            profileImage:newCliet.profileImage||"",
            googleId: newCliet.googleId,
            isBlocked: newCliet.isBlocked,
            isSubscribed:newCliet.isSubscribed ,
        }
        
        return returnClient

    }

}