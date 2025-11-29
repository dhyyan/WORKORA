import { ForgotOtpPasswordInputDto, ForgotOtpPasswordOutPutDto } from "../../../../domain/interface/DTOs/client/AuthDto";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IOtpService } from "../../../../domain/interface/serviceInterface/IOtpService";
import { IForgotOtpPasswordUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/password/IForgotOtpPasswordUseCase";

export class ForgotOtpPasswordUseCase implements IForgotOtpPasswordUseCase {
    private _freelancerRepo:IFreelancerRepository
    private _clientRepository:IClientRepository
    private _otpService: IOtpService
    constructor(freelancerRepo:IFreelancerRepository,clientRepository:IClientRepository,otpService: IOtpService) {
        this._freelancerRepo=freelancerRepo
        this._clientRepository=clientRepository
        this._otpService = otpService
    }

    async valid(input: ForgotOtpPasswordInputDto): Promise<ForgotOtpPasswordOutPutDto> {
        const {email,otp}=input
        const fExist=await this._freelancerRepo.findByEmail(email)
        const exist= await this._clientRepository.findByEmail(email)
        if(!exist||fExist)throw new Error("User not found at this email")
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