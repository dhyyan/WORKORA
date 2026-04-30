import { Client } from "../../../../domain/entities/client.entity";
import { IWallet } from "../../../../domain/entities/wallet.entity";
import { ClientRegisterInputDto, ClientRegisteroutputDto } from "../../../../domain/interface/DTOs/client/AuthDto";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IWalletRepository } from "../../../../domain/interface/repositoryInterface/IWalletRepository";
import { IHashPassword } from "../../../../domain/interface/serviceInterface/IHashPassword";
import { IRegisterClientUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/register/IRegisterUseCase";

export class RegisterClientUseCase implements IRegisterClientUseCase {
    private _clientRepository: IClientRepository
    private _freelancerRepo: IFreelancerRepository
    private _hashPassword: IHashPassword
    private _walletRepository: IWalletRepository
    constructor(clientRepo: IClientRepository, freelancerRepo: IFreelancerRepository, hashPassword: IHashPassword, walletRepository: IWalletRepository) {
        this._clientRepository = clientRepo
        this._freelancerRepo = freelancerRepo
        this._hashPassword = hashPassword
        this._walletRepository = walletRepository

    }
    async createClient(client: ClientRegisterInputDto): Promise<ClientRegisteroutputDto> {
        const Cexist = await this._clientRepository.findByEmail(client.email)
        const Fexist = await this._freelancerRepo.findByEmail(client.email)

        if (Cexist || Fexist) throw new Error("user in this email already exist")
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
            authProvider: "local",
            profileImage: "",
            isSubscribed: false,
            freeJobsCount: 0,
            isBlocked: false,

        })

        if(!newCliet?._id)throw new Error("user id is missing")

        const walletData: IWallet = {
            userId:newCliet?._id,
            role:"client",
            balance:0,


        }
        const wallet = await this._walletRepository.create(walletData)
        console.log("wallet created",wallet)

        if (!newCliet) throw new Error("Error while creating new Client")

        const returnClient: ClientRegisteroutputDto = {
            _id: newCliet._id,
            name: newCliet.name,
            email: newCliet.email,
            phone: newCliet.phone,
            role: 'client',
            profileImage: newCliet.profileImage || "",
            googleId: newCliet.googleId,
            isBlocked: newCliet.isBlocked,
            isSubscribed: newCliet.isSubscribed,
        }

        return returnClient

    }

}