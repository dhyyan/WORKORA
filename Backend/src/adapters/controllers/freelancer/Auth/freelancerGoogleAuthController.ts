import { Request, Response } from "express";
import { IGoogleAuthUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/login/IGoogleAuthUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FreelancerGoogleController {
    private _googleAuthUseCase: IGoogleAuthUseCase
    constructor(googleAuthUseCase: IGoogleAuthUseCase) {
        this._googleAuthUseCase = googleAuthUseCase
    }
    async googleAuth(req: Request, res: Response): Promise<void> {

        try {
            const { token } = req.body
            console.log("google token in freelancer controller", token)
            // Note: The usecase returns { client, accessToken, refreshToken } but for freelancer flow
            // it will be { freelancer, accessToken, refreshToken } effectively.
            // The DTO might overlap or sharing DTOs might cause property naming mismatch if not careful.
            // In the usecase I returned `client: freelancer`.
            const { client, accessToken, refreshToken } = await this._googleAuthUseCase.googleSign({ token })

            if (client) {
                res.status(HttpStatus.OK).json({ message: "google sign success", data: client, accessToken })
            }

        } catch (error: any) {
            console.log("|error in google signIn", error)
            // Handle duplicate email error specifically if needed, or generic error
            res.status(500).json({ message: "Google Auth Failed", error: error.message || error });
        }

    }
}
