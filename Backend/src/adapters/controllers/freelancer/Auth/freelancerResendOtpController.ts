import { Request, Response } from "express";
import { IFreelancerRresendOtpUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/register/IFreelancerResendOtpUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FreelancerResendOtpController {
    private _freelancerResendOtpUseCase: IFreelancerRresendOtpUseCase
    constructor(freelancerResendOtpUseCase: IFreelancerRresendOtpUseCase) {
        this._freelancerResendOtpUseCase = freelancerResendOtpUseCase

    }
    async resendOtp(req: Request, res: Response): Promise<void> {
        const { email } = req.body

        try {
            const resendOtp = await this._freelancerResendOtpUseCase.generateOtp({ email })
            if (!resendOtp) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: "Email is required" });
                return;
            }
            res.status(HttpStatus.OK).json({ message: "Otp sent to your email." });
        } catch (error) {
            console.error('error while sending otp', error)
            res.status(HttpStatus.BAD_REQUEST).json({ message: "error while sending otp test", error: error instanceof Error ? error.message : 'error while sending otp' })
        }

    }
}