import { FreelancerForgotPassOtpInputDtos, FreelancerForgotPassOtpOutputDtos } from "../../../../domain/interface/DTOs/freelancer/authDtos";
import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IFreelancerRepository } from "../../../../domain/interface/repositoryInterface/IFreelancerRepository";
import { IOtpService } from "../../../../domain/interface/serviceInterface/IOtpService";
import { IFreelancerForgotPassOtpUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/login/IFreelancerForgotPassOtpUseCase";

export class FreelancerForgotPassOtpUseCase implements IFreelancerForgotPassOtpUseCase {
    private _freelancerRepo: IFreelancerRepository
    private _clientRepo: IClientRepository
    private _otpService: IOtpService
    constructor(freelancerRepo: IFreelancerRepository, clientRepo: IClientRepository, otpService: IOtpService) {
        this._freelancerRepo = freelancerRepo
        this._clientRepo = clientRepo
        this._otpService = otpService
    }
    async check(input: FreelancerForgotPassOtpInputDtos): Promise<FreelancerForgotPassOtpOutputDtos> {
        const { email, otp } = input
        if (!email||!otp) throw new Error("required field are missing")
        const fExist = await this._freelancerRepo.findByEmail(email)
        const cExist = await this._clientRepo.findByEmail(email)
        if (!fExist || cExist) throw new Error("User in this email not found")

        const isMatch = await this._otpService.verifyOtp(email, otp)
        if (!isMatch) throw new Error("otp not match")
        console.log("otp verifyed")
        return {
            success: true
        }
    }
}