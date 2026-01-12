import { freelancerSendOtpInputDto, freelancerSendOtpOutputDto } from "../../../../domain/interface/DTOs/freelancer/authDtos";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IEmailService } from "../../../../domain/interface/serviceInterface/IEmailService";
import { IOtpService } from "../../../../domain/interface/serviceInterface/IOtpService";
import { IFreelancerSentOtpUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/register/IfreelancerSendOtpUseCase";

export class FreelancerSentOtpUseCase implements IFreelancerSentOtpUseCase {
    private _freelancerRepository: IFreelancerRepository
    private _clientRepository: IClientRepository
    private _otpService: IOtpService
    private _emailService:IEmailService

    constructor(freelancerRepository: IFreelancerRepository, clientRepository: IClientRepository, otpService: IOtpService,emailService:IEmailService) {
        this._freelancerRepository = freelancerRepository
        this._clientRepository = clientRepository
        this._otpService = otpService
        this._emailService=emailService
    }
    async createOtp(input: freelancerSendOtpInputDto): Promise<freelancerSendOtpOutputDto> {
        
        const {email}=input
        console.log("email from useCase", email)
        console.log("email from useCase", input)
        

        const existFreelacer =await this._freelancerRepository.findByEmail(email)
        const existClinet = await this._clientRepository.findByEmail(email)

        if(existFreelacer||existClinet)throw new Error("Email in this email already exist")

        const otp = this._otpService.generateOtp()
        await this._otpService.storeOtp(email,otp)
        await this._emailService.sendOtp(email,otp)
        console.log("Generated otp",otp)
        return {
            success: true,
            message: 'OTP sent successfully to your email'
        };
    }
}