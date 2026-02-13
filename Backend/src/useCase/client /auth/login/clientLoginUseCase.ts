import { Client } from "../../../../domain/entities/client.entity";
import { IWallet } from "../../../../domain/entities/wallet.entity";
import { BaseClientOutputDtos, ClientLoginInputdDto, ClientLoginOutputdDto } from "../../../../domain/interface/DTOs/client/AuthDto";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IWalletRepository } from "../../../../domain/interface/repositoryInterface/IWalletRepository";
import { IHashPassword } from "../../../../domain/interface/serviceInterface/IHashPassword";
import { IJwtService } from "../../../../domain/interface/serviceInterface/IJwtService";
import { IClientLoginUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/login/IClientLoginUseCase";

export class ClientLoginUseCase implements IClientLoginUseCase {

    private _hashedPassService: IHashPassword
    private _clientRepository: IClientRepository
    private _freelancerRepo: IFreelancerRepository
    private _jwtService: IJwtService
    // private _walletRepository: IWalletRepository

    constructor(
        hashedPassService: IHashPassword,
        clientRepository: IClientRepository,
        freelancerRepo: IFreelancerRepository,
        jwtService: IJwtService,
        // walletRepository: IWalletRepository
    ) {
        this._hashedPassService = hashedPassService
        this._clientRepository = clientRepository
        this._freelancerRepo = freelancerRepo
        this._jwtService = jwtService
        // this._walletRepository = walletRepository
    }

    async logiClient(input: ClientLoginInputdDto): Promise<ClientLoginOutputdDto> {
        const { email, password } = input
        if (!email || !password) {
            throw new Error("email and password are required");
        }

        const user = await this._clientRepository.findByEmail(email);
        const fExist = await this._freelancerRepo.findByEmail(email)
        if (!user || fExist) {
            throw new Error("User with this email does not exist");
        }
        if (!user.password) {
            throw new Error("Password authentication not available");
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

        // const walletData

        
        // const walletData: IWallet = {
        //             userId:user?._id!,
        //             role:"client",
        //             balance:0,
        
        
        //         }
        // const wallet=await this._walletRepository.create(walletData)

        const createdUser: BaseClientOutputDtos = {
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
        };
        console.log("login user data in usecase",createdUser)

        return { createdUser, accessToken, refreshToken };

    }
}
