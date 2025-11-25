import { ResendOtpInputDto, ResendOtpOutPutDto } from "../../../../domain/interface/DTOs/client/AuthDto";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IEmailService } from "../../../../domain/interface/serviceInterface/IEmailService";
import { IOtpService } from "../../../../domain/interface/serviceInterface/IOtpService";
import { IResendOtpUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/register/IResendOtpUseCase";

export class ResendOtpUseCase implements IResendOtpUseCase{

    private _clientRepository:IClientRepository
    private _otpService:IOtpService
    private _emailService:IEmailService 
    constructor(clientRepository:IClientRepository,otpService:IOtpService,emailService:IEmailService){
        this._clientRepository=clientRepository
        this._otpService=otpService
        this._emailService=emailService
        
    }
    async resendOtp(input: ResendOtpInputDto): Promise<ResendOtpOutPutDto> {
        const {email}=input
        console.log("email from resendOtp useCase",email)
        const client=await this._clientRepository.findByEmail(email)
        if(client)throw new Error("user in this email already exist")

            const otp =  this._otpService.generateOtp()
            console.log("new resend Otp",otp)
            await this._otpService.storeOtp(email,otp)
            await this._emailService.sendOtp(email,otp)

            return{
              succes:true  
            }
    }
}