import { Types } from "mongoose";
import { IWalletTransaction } from "../../../entities/wallet.entity";

export interface GetWalletInputDto {
    userId: Types.ObjectId;
    page: number;
    limit: number;
}

export interface GetWalletOutputDto {
    balance: number;
    transactions: IWalletTransaction[];
    totalTransactions: number;
    totalPages: number;
    currentPage: number;
    totalCredit: number;
    totalDebit: number;
}
