import { Request, Response } from "express";
import { IAuthChangePasswordUseCase } from "../../../domain/interface/useCaseInterface/client/auth/password/IAuthChangePasswordUseCase";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class AuthChangePasswordController {
    private _authChangePasswordUseCase: IAuthChangePasswordUseCase;

    constructor(authChangePasswordUseCase: IAuthChangePasswordUseCase) {
        this._authChangePasswordUseCase = authChangePasswordUseCase;
    }

    async changePassword(req: Request, res: Response): Promise<void> {
        const { currentPassword, newPassword } = req.body;
        const userId = (req as any).user.userId;

        console.log("Change password request for client userId:", userId);

        try {
            const result = await this._authChangePasswordUseCase.changePassword({
                userId,
                oldPassword: currentPassword,
                newPassword: newPassword
            });

            if (!result) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error while changing password' });
                return;
            }

            res.status(HttpStatus.OK).json({ message: "Password changed successfully" });
        } catch (error) {
            console.log('Error while changing password', error);
            res.status(HttpStatus.BAD_REQUEST).json({
                message: error instanceof Error ? error.message : 'Error while changing password',
                success: false
            });
        }
    }
}
