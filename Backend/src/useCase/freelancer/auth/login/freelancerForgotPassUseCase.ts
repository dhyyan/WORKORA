import { FreelancerForgotPassInputDtos, FreelancerForgotPassOutputDtos } from "../../../../domain/interface/DTOs/freelancer/authDtos";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IEmailService } from "../../../../domain/interface/serviceInterface/IEmailService";
import { IOtpService } from "../../../../domain/interface/serviceInterface/IOtpService";
import { IFreelancerForgotPassUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/login/IFreelancerForgotPassUseCase";


export class FreelancerForgotPassUseCase implements IFreelancerForgotPassUseCase{

    private _freelancerRepo:IFreelancerRepository
    private _clientRepo:IClientRepository
    private _otpService:IOtpService
    private _emailService:IEmailService
    constructor(freelancerRepo:IFreelancerRepository,clientRepo:IClientRepository,otpService:IOtpService,emailService:IEmailService){
        this._freelancerRepo=freelancerRepo
        this._clientRepo=clientRepo
        this._otpService=otpService
        this._emailService=emailService
    }
    async excute(input: FreelancerForgotPassInputDtos): Promise<FreelancerForgotPassOutputDtos> {
        const {email}=input
        console.log("emailll",email)
        if(!email)throw new Error("email field are missing")
        const fExist=await this._freelancerRepo.findByEmail(email)
        const _cExist=await this._clientRepo.findByEmail(email)

        console.log("before",fExist)
        if(!fExist)throw new Error("User in this email not found")
            console.log("after")
        
        const otp=await this._otpService.generateOtp()
        await this._otpService.storeOtp(email,otp)
        await this._emailService.sendOtp(email,otp)
        console.log('generate otp :>> ', otp);
        
        return{
            success:true
        }
          
    }
}