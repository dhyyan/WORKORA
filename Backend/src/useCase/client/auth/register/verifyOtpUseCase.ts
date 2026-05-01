import { IOtpService } from "../../../../domain/interface/serviceInterface/IOtpService";
import { IVerifyOtpUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/register/IVerifyOtpUseCase";

export class VerifyOtpUseCase implements IVerifyOtpUseCase {

    private _OtpService: IOtpService
    constructor(otpService: IOtpService) {
        this._OtpService = otpService

    }
    verify(email: string, otp: string): Promise<boolean> {
        console.log("email and received in verify otpuseCase", email, otp)
        if (!email || !otp) throw new Error("otp or email are missing recheck properly")
        return this._OtpService.verifyOtp(email, otp)
    }

}