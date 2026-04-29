import { GoogeleAuthInputDtos, GoogeleAuthOutPutDtos } from "../../../../domain/interface/DTOs/client/AuthDto";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IJwtService } from "../../../../domain/interface/serviceInterface/IJwtService";
import { IGoogleAuthUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/login/IGoogleAuthUseCase";
import { verifyGoogleToken } from "../../../../frameWork/service/googleTokenVerificatio";

export class FreelancerGoogleAuthUseCase implements IGoogleAuthUseCase {

    private _freelancerRepository: IFreelancerRepository
    private _clientRepository: IClientRepository
    private _jwtService: IJwtService
    constructor(freelancerRepository: IFreelancerRepository, clientRepository: IClientRepository, jwtService: IJwtService) {
        this._freelancerRepository = freelancerRepository
        this._clientRepository = clientRepository
        this._jwtService = jwtService
    }



    async googleSign(input: GoogeleAuthInputDtos): Promise<any> {
        try {
            const payload = await verifyGoogleToken(input.token);

            if (!payload || !payload.email) {
                throw new Error("Invalid Google token");
            }

            const email = payload.email;
            const name = payload.name ?? "";
            const picture = payload.picture ?? "";

            const client = await this._clientRepository.findByEmail(email);
            if (client) {
                throw new Error("Email already registered as client");
            }

            let freelancer = await this._freelancerRepository.findByEmail(email);
            if(freelancer?.isBlocked)throw new Error("user in this email is blocked by admin")
            
            if (!freelancer) {
                freelancer = await this._freelancerRepository.create({
                    email,
                    name,
                    profileImage: picture,
                    role: "freelancer",
                    gitHubUrl:"",
                    linkedInUrl:"",
                    skills:[],
                    experience:"",
                    rating:0,
                    bio:"",
                    isBlocked:false,
                    isSubscribed:false,
                    freeApplicationsCount: 0,
                    googleId: payload.sub
                });
            } else if (!freelancer.googleId) {
                // Update existing freelancer if they login with Google for the first time
                await this._freelancerRepository.update(freelancer._id!, { googleId: payload.sub });
                freelancer.googleId = payload.sub;
            }

            if (!freelancer || !freelancer._id) {
                throw new Error("Freelancer creation failed");
            }

            const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY as string;
            const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY as string;

            const userId = freelancer._id.toString();

            const accessToken = this._jwtService.createAccessToken(
                ACCESS_TOKEN_KEY,
                userId,
                "freelancer"
            );

            const refreshToken = this._jwtService.createRefreshToken(
                REFRESH_TOKEN_KEY,
                userId
            );

            return {
                client: freelancer, // Reusing DTO structure, might want to rename property or create new DTO if strict typing matches property name
                accessToken,
                refreshToken,
            };
        } catch (error) {
            throw error;
        }
    }

}
