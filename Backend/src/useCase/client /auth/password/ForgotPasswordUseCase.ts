import { ForgotPasswordInputDto, ForgotpasswordOutPutDto } from "../../../../domain/interface/DTOs/client/AuthDto";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IEmailService } from "../../../../domain/interface/serviceInterface/IEmailService";
import { IOtpService } from "../../../../domain/interface/serviceInterface/IOtpService";
import { IForgotPasswordUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/password/IForgotPasswordUseCase";

export class ForgotPasswordUseCase implements IForgotPasswordUseCase{
    private _freelancerRepo:IFreelancerRepository
    private _clientRepository:IClientRepository
    private _otpService:IOtpService
    private _emailService:IEmailService

    constructor(freelancerRepo:IFreelancerRepository,clientRepository:IClientRepository, otpService:IOtpService, emailService:IEmailService){
        this._freelancerRepo=freelancerRepo
        this._clientRepository=clientRepository
        this._otpService=otpService
        this._emailService=emailService

    }
    async excute(input: ForgotPasswordInputDto): Promise<ForgotpasswordOutPutDto> {
        const {email}=input
        console.log("forgot email usecase ",email)

        const exist=await this._clientRepository.findByEmail(email)
        const fExist=await this._freelancerRepo.findByEmail(email)
        if(!exist||fExist)throw new Error("user in this email not found")
            const otp = await this._otpService.generateOtp()
        console.log("forgot Otp",otp)

        await this._otpService.storeOtp(email,otp)
        await this._emailService.sendOtp(email,otp)
        return{
            success:true,
            message: 'OTP sent successfully to your email'
        }
    }

}