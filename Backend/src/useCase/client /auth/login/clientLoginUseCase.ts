import { Client } from "../../../../domain/entities/client.entity";
import { BaseClientOutputDtos, ClientLoginInputdDto, ClientLoginOutputdDto } from "../../../../domain/interface/DTOs/client/AuthDto";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IHashPassword } from "../../../../domain/interface/serviceInterface/IHashPassword";
import { IJwtService } from "../../../../domain/interface/serviceInterface/IJwtService";
import { IClientLoginUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/login/IClientLoginUseCase";

export class ClientLogiUseCase implements IClientLoginUseCase {

   private _hashedPassService: IHashPassword
    private _clientRepository: IClientRepository
    private _freelancerRepo:IFreelancerRepository
    private _jwtService: IJwtService

    constructor(
        hashedPassService: IHashPassword,
        clientRepository: IClientRepository,
        freelancerRepo:IFreelancerRepository,
        jwtService: IJwtService
    ) {
        this._hashedPassService = hashedPassService
        this._clientRepository = clientRepository
        this._freelancerRepo=freelancerRepo
        this._jwtService = jwtService
    }

    async logiClient(input: ClientLoginInputdDto): Promise<ClientLoginOutputdDto> {
        const { email, password } = input
        if (!email || !password) {
            throw new Error("email and password are required");
        }

        const user = await this._clientRepository.findByEmail(email);
        const fExist=await this._freelancerRepo.findByEmail(email)
        if (!user||fExist) {
            throw new Error("User with this email does not exist");
        }

        const isMatch = await this._hashedPassService.comparePassword(password, user.password);
        if (!isMatch) throw new Error("Incorrect password");

        if (user.isBlocked) throw new Error("user in this email blocked by admin. Try again later")
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

        // ✅ Create a safe client object (without password)
        const createdUser: BaseClientOutputDtos = {
            _id: user._id?.toString(),
            name: user.name,
            email: user.email,
            role: "client",
            phone: user.phone,
            profileImage: user.profileImage,
            isBlocked: user.isBlocked,
            isSubscribed: user.isSubscribed,
            googleId: user.googleId,
            createdAt: user.createdAt
        };

        return { createdUser, accessToken, refreshToken };

    }
}
