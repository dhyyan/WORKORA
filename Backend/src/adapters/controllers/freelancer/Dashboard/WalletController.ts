import { Request, Response } from "express";
import { IGetWalletUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/dashboard/Wallet/IGetWalletUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { Types } from "mongoose";

export class WalletController {
    private _getWalletUseCase: IGetWalletUseCase;

    constructor(getWalletUseCase: IGetWalletUseCase) {
        this._getWalletUseCase = getWalletUseCase;
    }

    async getWallet(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;

        if (!Types.ObjectId.isValid(userId)) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid user ID" });
            return;
        }

        try {
            const result = await this._getWalletUseCase.getWallet({
                userId: new Types.ObjectId(userId),
                page,
                limit
            });

            res.status(HttpStatus.OK).json({
                message: "Wallet fetched success",
                data: result,
                success: true
            });
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error while fetching wallet',
                error: error instanceof Error ? error.message : 'Error while fetching wallet'
            });
        }
    }
}
