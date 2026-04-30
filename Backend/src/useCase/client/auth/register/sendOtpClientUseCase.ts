import { IClientRepository } from "../../../../domain/interface/repositoryInterface/IClientRepository";
import { IEmailService } from "../../../../domain/interface/serviceInterface/IEmailService";
import { IOtpService } from "../../../../domain/interface/serviceInterface/IOtpService";
import { ISendOtpUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/register/ISendOtpUseCase";

export class SendOtpClientUseCase implements ISendOtpUseCase {
    private _clientRepository: IClientRepository
    private _OtpSerrvice: IOtpService
    private _emailService: IEmailService
    constructor(clientRepository: IClientRepository, otpSerrvice: IOtpService, emailService: IEmailService) {
        this._clientRepository = clientRepository
        this._OtpSerrvice = otpSerrvice
        this._emailService = emailService
    }
    async excute(email: string): Promise<{ message: string; success: boolean; }> {
        console.log("email from usecase", email)
        if (!email) throw new Error("email filed is empty")
        const exist = await this._clientRepository.findByEmail(email)

        if (exist) throw new Error("user in this email already exist")
        const otp = this._OtpSerrvice.generateOtp()

        console.log("generate otp", otp)

        await this._OtpSerrvice.storeOtp(email, otp)
        await this._emailService.sendOtp(email, otp)
        console.log("completed")

        return {
            success: true,
            message: 'OTP sent successfully to your email'
        };
    }
}