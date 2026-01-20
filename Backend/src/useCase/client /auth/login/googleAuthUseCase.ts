import { GoogeleAuthInputDtos, GoogeleAuthOutPutDtos } from "../../../../domain/interface/DTOs/client/AuthDto";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IJwtService } from "../../../../domain/interface/serviceInterface/IJwtService";
import { IGoogleAuthUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/login/IGoogleAuthUseCase";
import { verifyGoogleToken } from "../../../../frameWork/service/googleTokenVerificatio";

export class GoogleAuthUseCase implements IGoogleAuthUseCase {

    private _freelancerRepository: IFreelancerRepository
    private _clientRepository: IClientRepository
    private _jwtService: IJwtService
    constructor(freelancerRepository: IFreelancerRepository, clientRepository: IClientRepository, jwtService: IJwtService) {
        this._freelancerRepository = freelancerRepository
        this._clientRepository = clientRepository
        this._jwtService = jwtService
    }



    async googleSign(input: GoogeleAuthInputDtos): Promise<GoogeleAuthOutPutDtos> {
  try {
    const payload = await verifyGoogleToken(input.token);

    if (!payload || !payload.email) {
      throw new Error("Invalid Google token");
    }

    const email = payload.email;
    const name = payload.name ?? "";
    const picture = payload.picture ?? "";

    const freelancer = await this._freelancerRepository.findByEmail(email);
    if (freelancer) {
      throw new Error("Email already registered as freelancer");
    }

    let client = await this._clientRepository.findByEmail(email);
    if(client?.isBlocked)throw new Error("user in this email is blocked by admin")

    if (!client) {
      client = await this._clientRepository.create({
        email,
        name,
        profileImage: picture,
        authProvider: "google",
        googleId: payload.sub,
        role: "client",
        phone:"",
        isBlocked:false,
        isSubscribed:false
      });
    }

    if (!client || !client._id) {
      throw new Error("Client creation failed");
    }

    const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY as string;
    const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY as string;

    const userId = client._id.toString();

    const accessToken = this._jwtService.createAccessToken(
      ACCESS_TOKEN_KEY,
      userId,
      "client"
    );

    const refreshToken = this._jwtService.createRefreshToken(
      REFRESH_TOKEN_KEY,
      userId
    );

    return {
      client,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
}

}

