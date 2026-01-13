import { BaseFreelancerOutputDtos, FreelancerLoginInputDtos, FreelancerLoginIOutputDtos } from "../../../../domain/interface/DTOs/freelancer/authDtos";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IHashPassword } from "../../../../domain/interface/serviceInterface/IHashPassword";
import { IJwtService } from "../../../../domain/interface/serviceInterface/IJwtService";
import { IFreelancerLoginUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/login/IfreelancerLoginUseCase";

export class FreelancerLoginUseCase implements IFreelancerLoginUseCase {

    private _freelancerRepository: IFreelancerRepository
    private _hashPasswordService: IHashPassword
    private _jwtService: IJwtService
    constructor(freelancerRepository: IFreelancerRepository, hashPasswordService: IHashPassword, jwtService: IJwtService) {

        this._freelancerRepository = freelancerRepository
        this._hashPasswordService = hashPasswordService
        this._jwtService = jwtService

    }
    async verify(input: FreelancerLoginInputDtos): Promise<FreelancerLoginIOutputDtos> {
        const { email, password } = input
        if (!email || !password) throw new Error("required fields are missign in loginUsCase")

        const user = await this._freelancerRepository.findByEmail(email)
        if (!user) throw new Error("user in this email not find")

        if (!user.password) {
            throw new Error("Invalid login method. Please use Google Sign-In.");
        }
        const isMatch = await this._hashPasswordService.comparePassword(password, user.password)
        if (!isMatch) throw new Error("password not match")

        if (user.isBlocked) throw new Error("This user was blocked by admin. Try again later..")

        const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY as string;
        const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY as string;

        const accessToken = this._jwtService.createAccessToken(
            ACCESS_TOKEN_KEY,
            user._id?.toString() ?? "",
            user.role
        );

        const refreshToken = this._jwtService.createRefreshToken(
            REFRESH_TOKEN_KEY,
            user._id?.toString() ?? ""
        );

        const createdUser: BaseFreelancerOutputDtos = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: "freelancer",
            gitHubUrl: user.gitHubUrl,
            linkedInUrl: user.linkedInUrl,
            skills: user.skills,
            experience: user.experience ?? "",
            rating: user.rating,
            profileImage: user.profileImage,
            bio: user.bio,
            isSubscribed: user.isSubscribed,
            isBlocked: user.isBlocked,
            googleId: user.googleId
        }

        return {
            createdUser,
            accessToken,
            refreshToken
        }

    }
}