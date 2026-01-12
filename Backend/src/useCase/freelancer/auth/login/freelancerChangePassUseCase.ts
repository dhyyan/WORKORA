import { FreelancerChangePassInputDtos, FreelancerChangePassOutputDtos } from "../../../../domain/interface/DTOs/freelancer/authDtos";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IHashPassword } from "../../../../domain/interface/serviceInterface/IHashPassword";
import { IFreelancerChangePassUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/login/IFreelancerChangePassUseCase";

export class FreelancerChangePassUseCase implements IFreelancerChangePassUseCase {
    private _freelancerRepo: IFreelancerRepository
    private _clientRepo: IClientRepository
    private _hashPassword: IHashPassword

    constructor(freelancerRepo: IFreelancerRepository, clientRepo: IClientRepository, hashPassword: IHashPassword) {
        this._freelancerRepo = freelancerRepo
        this._clientRepo = clientRepo
        this._hashPassword = hashPassword
    }

    async createNewPass(input: FreelancerChangePassInputDtos): Promise<FreelancerChangePassOutputDtos> {
        const { email, password } = input
        console.log("got email pass ",email,password)

        if (!email) throw new Error("email field are missing")
        const fExist = await this._freelancerRepo.findByEmail(email)
        const cExist = await this._clientRepo.findByEmail(email)

        if (!fExist || cExist) throw new Error("User in this email not found")

        const hashPassword = await this._hashPassword.hashPassword(password)
        if (!hashPassword) throw new Error('Error while hashing password')

        const updateUser = await this._freelancerRepo.changePassword(fExist._id?.toString(), hashPassword)
        if (!updateUser) throw new Error('error while updating new password in client')

        return {
            _id: fExist._id||"",
            name: fExist.name,
            email: fExist.email,
            phone: fExist.phone,
            role: "freelancer",
            gitHubUrl: fExist.gitHubUrl,
            linkedInUrl: fExist.linkedInUrl,
            skills: fExist.skills,
            experience: fExist.experience||"",
            rating: fExist.rating,
            profileImage: fExist.profileImage,
            bio: fExist.bio,
            isSubscribed: fExist.isSubscribed,
            isBlocked: fExist.isBlocked,
            googleId: fExist.googleId,

        }
    }

}