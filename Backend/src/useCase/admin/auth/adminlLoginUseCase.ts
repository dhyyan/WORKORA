import { BaseClientOutputDtos, ClientLoginInputdDto, ClientLoginOutputdDto } from "../../../domain/interface/DTOs/client/AuthDto";
import { IClientRepository } from "../../../domain/interface/repositoryInterface/IClientRepository";
import { IHashPassword } from "../../../domain/interface/serviceInterface/IHashPassword";
import { IJwtService } from "../../../domain/interface/serviceInterface/IJwtService";
import { IClientLoginUseCase } from "../../../domain/interface/useCaseInterface/client/auth/login/IClientLoginUseCase";

export class AmdinLoginUseCase implements IClientLoginUseCase {
    private _clientRepository: IClientRepository
    private _hashPasswordService: IHashPassword
    private _jwtService: IJwtService
    constructor(clientRepository: IClientRepository, hashPasswordService: IHashPassword, jwtService: IJwtService) {
        this._clientRepository = clientRepository
        this._hashPasswordService = hashPasswordService
        this._jwtService = jwtService

    }
    async logiClient(input: ClientLoginInputdDto): Promise<ClientLoginOutputdDto> {
        try {
            const { email, password } = input
            if (!email || !password) throw new Error("required fileds are missing")

            const adminExist = await this._clientRepository.findByEmail(email)
            if (!adminExist) throw new Error("admin in this email not found")
            let isMatch = await this._hashPasswordService.comparePassword(password, adminExist?.password)

            if (!isMatch) throw new Error("password not match")
            const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY as string;
            const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY as string;

            const accessToken = this._jwtService.createAccessToken(
                ACCESS_TOKEN_KEY,
                adminExist._id?.toString() ?? "",
                adminExist.role
            );

            const refreshToken = this._jwtService.createRefreshToken(
                REFRESH_TOKEN_KEY,
                adminExist._id?.toString() ?? ""
            );

            // ✅ Create a safe client object (without password)
            const createdUser: BaseClientOutputDtos = {
                _id: adminExist._id?.toString(),
                name: adminExist.name,
                email: adminExist.email,
                role: "admin",
                phone: adminExist.phone,
                profileImage: adminExist.profileImage,
                isBlocked: adminExist.isBlocked,
                isSubscribed: adminExist.isSubscribed,
                googleId: adminExist.googleId,
                createdAt: adminExist.createdAt
            };

            return { createdUser, accessToken, refreshToken };



        } catch (error) {
            console.error("error in admin login",error)
            throw error
        }


    }
}