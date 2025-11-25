import { FreelancerResendOtpInputDtos, FreelancerResendOtpOutputDtos } from "../../../../domain/interface/DTOs/freelancer/authDtos";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IEmailService } from "../../../../domain/interface/serviceInterface/IEmailService";
import { IOtpService } from "../../../../domain/interface/serviceInterface/IOtpService";
import { IFreelancerRresendOtpUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/register/IFreelancerResendOtpUseCase";

export class FreelancerResendOtpUseCase implements IFreelancerRresendOtpUseCase{
    private _freelancerRepository:IFreelancerRepository
    private _clientRepository:IClientRepository
    private _otpService:IOtpService
    private _emailService:IEmailService

    constructor(freelancerRepository:IFreelancerRepository,clientRepository:IClientRepository,otpService:IOtpService,emailService:IEmailService) {
        this._freelancerRepository=freelancerRepository
        this._clientRepository=clientRepository
        this._otpService=otpService
        this._emailService=emailService
    }
    async generateOtp(input: FreelancerResendOtpInputDtos): Promise<FreelancerResendOtpOutputDtos> {
        const {email}=input
        const freelancerExist=await this._freelancerRepository.findByEmail(email)
        const clientExist=await this._clientRepository.findByEmail(email)
        if(freelancerExist||clientExist)throw new Error("User in this email already exist")

            const otp =await this._otpService.generateOtp()
            await this._otpService.storeOtp(email,otp)
            await this._emailService.sendOtp(email,otp)
            console.log("New Otp",otp)

            return{
                success:true
            }
    }
}