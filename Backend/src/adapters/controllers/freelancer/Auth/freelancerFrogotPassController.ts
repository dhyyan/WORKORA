import { Request, Response } from "express";
import { FreelancerForgotPassUseCase } from "../../../../useCase/freelancer/auth/login/freelancerForgotPassUseCase";
import { IFreelancerForgotPassUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/login/IFreelancerForgotPassUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FreelancerForgotPassController {
    private _freelancerFortPassUseCae: IFreelancerForgotPassUseCase
    constructor(freelancerFortPassUseCae: FreelancerForgotPassUseCase) {
        this._freelancerFortPassUseCae = freelancerFortPassUseCae

    }
    async sendOtp(req: Request, res: Response): Promise<void> {
        const { email } = req.body
        try {
            const exist = await this._freelancerFortPassUseCae.excute({ email })
            if (exist) {

                res.status(HttpStatus.OK).json({ message: "otp will send your email" })
            } else {
                res.status(HttpStatus.NOT_FOUND).json({ message: "user not find" })
            }
        } catch (error) {
            console.error("Error in forgot password:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: "Failed to send password reset instructions",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }
}