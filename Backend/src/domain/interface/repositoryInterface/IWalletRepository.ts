import { Types } from "mongoose";
import { IWallet, IWalletTransaction } from "../../entities/wallet.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IWalletRepository extends IBaseRepository<IWallet> {
    findByUserId(userId:Types.ObjectId):Promise<IWallet|null>
    findTransactionsByUserId(userId: Types.ObjectId, skip: number, limit: number): Promise<{ transactions: IWalletTransaction[], totalTransactions: number, totalCredit: number, totalDebit: number }>
    addTransaction(userId: Types.ObjectId, transaction: IWalletTransaction): Promise<void>
}