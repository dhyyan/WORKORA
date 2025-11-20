import { ForgotOtpPasswordInputDto, ForgotOtpPasswordOutPutDto } from "../../../../domain/interface/DTOs/client/AuthDto";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IOtpService } from "../../../../domain/interface/serviceInterface/IOtpService";
import { IForgotOtpPasswordUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/password/IForgotOtpPasswordUseCase";

export class ForgotOtpPasswordUseCase implements IForgotOtpPasswordUseCase {
    private _clientRepository:IClientRepository
    private _otpService: IOtpService
    constructor(clientRepository:IClientRepository,otpService: IOtpService) {
         this._clientRepository=clientRepository
        this._otpService = otpService
    }

    async valid(input: ForgotOtpPasswordInputDto): Promise<ForgotOtpPasswordOutPutDto> {
        const {email,otp}=input

        const exist= await this._clientRepository.fidByEmail(email)
        if(!exist)throw new Error("User not found at this email")
            console.log("emai otp from frogotOtp",email,otp)
        const verifyOtp=await this._otpService.verifyOtp(email,otp)
        console.log("verifyed",verifyOtp)
        if(!verifyOtp)throw new Error("otp not match, Try again")
            console.log("verifyed completed")
            return{
                success:true,
                message:"Enter new Password",
                isValid:true
            }

    }

}