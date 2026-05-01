import { Request, Response } from "express";
import { IGetWalletUseCase } from "../../../../../domain/interface/useCaseInterface/client/Dashboard/Wallet/IGetWalletUseCase";
import { Types } from "mongoose";

export class GetWalletController {
    private _getWalletUseCase: IGetWalletUseCase;

    constructor(getWalletUseCase: IGetWalletUseCase) {
        this._getWalletUseCase = getWalletUseCase;
    }

    async getWallet(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;

        try {
            const input = {
                userId: new Types.ObjectId(userId),
                page,
                limit
            };

            const result = await this._getWalletUseCase.getWallet(input);
            res.status(200).json(result);
        } catch (error) {
            console.error("GetWalletController error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
