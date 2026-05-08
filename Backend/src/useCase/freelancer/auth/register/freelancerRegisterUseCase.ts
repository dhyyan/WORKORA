import { FreelancerRegisterInputDtos, FreelancerRegisterOutputDtos } from "../../../../domain/interface/DTOs/freelancer/authDtos";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IHashPassword } from "../../../../domain/interface/serviceInterface/IHashPassword";
import { IFreelancerRegisterUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/register/IFreelancerRegisterUseCase";
import { IWallet } from "../../../../domain/entities/wallet.entity";
import { IWalletRepository } from "../../../../domain/interface/repositoryInterface/IWalletRepository";

export class FreelacerRegisterUseCase implements IFreelancerRegisterUseCase {

    private _freelancerRepository: IFreelancerRepository
    private _clientRepository: IClientRepository
    private _hashPassword: IHashPassword
     private _walletRepository: IWalletRepository
    constructor(freelancerRepository: IFreelancerRepository, clientRepository: IClientRepository, hashPassword: IHashPassword,walletRepository: IWalletRepository) {
        this._freelancerRepository = freelancerRepository
        this._clientRepository = clientRepository
        this._hashPassword = hashPassword
        this._walletRepository = walletRepository
    }
    async create(input: FreelancerRegisterInputDtos): Promise<FreelancerRegisterOutputDtos> {
        const { name, email, phone, password } = input
        if (!name || !email || !phone || !password) throw new Error("filds are required")

        const freelancerExist = await this._freelancerRepository.findByEmail(email)
        const clientExist = await this._clientRepository.findByEmail(email)

        if (freelancerExist || clientExist) throw new Error("user in this email already exist")

        const hashPassword = await this._hashPassword.hashPassword(password)

        const newUser = await this._freelancerRepository.create({
            
            name,
            email,
            phone,
            password: hashPassword || "",
            role:"freelancer",
            gitHubUrl: "",
            linkedInUrl: "",
            skills: [],
            experience: "",
            rating: 1,
            profileImage: "",
            bio: "",
            isSubscribed: false,
            freeApplicationsCount: 0,
            isBlocked: false,
            googleId:""
        })
        
        if (!newUser) throw new Error("Error while creating new User")

        const walletData: IWallet = {
                    userId:newUser._id!,
                    role:"freelancer",
                    balance:0,
        
        
                }
                const wallet = await this._walletRepository.create(walletData)
                console.log("wallet created",wallet)
        

        const returnUser: FreelancerRegisterOutputDtos = {
            _id: newUser._id!,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
            gitHubUrl: newUser.gitHubUrl,
            linkedInUrl: newUser.linkedInUrl,
            skills: newUser.skills,
            experience: newUser.experience||"",
            rating: newUser.rating,
            profileImage: newUser.profileImage,
            bio: newUser.bio,
            isSubscribed: newUser.isSubscribed,
            isBlocked: newUser.isBlocked,
            googleId:newUser.googleId
            
        }
        return returnUser
    }
}