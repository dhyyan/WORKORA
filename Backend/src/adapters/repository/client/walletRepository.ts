import { Types } from "mongoose";
import { IWallet, IWalletTransaction } from "../../../domain/entities/wallet.entity";
import { IWalletRepository } from "../../../domain/interface/repositoryInterface/IWalletRepository";
import { walletModel } from "../../../frameWork/database/models/wallet.model";
import { BaseRepository } from "../BaseRepo/baseRepository";

export class WalletRepository extends BaseRepository<IWallet> implements IWalletRepository {
    constructor(){
        super(walletModel)
    }
    async findByUserId(userId: Types.ObjectId): Promise<IWallet | null> {
        console.log("id in repoo", userId)
        return await walletModel.findOne({ userId: userId })
    }

    async findTransactionsByUserId(userId: Types.ObjectId, skip: number, limit: number): Promise<{ transactions: IWalletTransaction[], totalTransactions: number, totalCredit: number, totalDebit: number }> {
        const result = await walletModel.aggregate([
            { $match: { userId: userId } },
            {
                $project: {
                    totalTransactions: { $size: "$transactions" },
                    totalCredit: {
                        $reduce: {
                            input: "$transactions",
                            initialValue: 0,
                            in: {
                                $cond: [
                                    { $eq: ["$$this.type", "credit"] },
                                    { $add: ["$$value", "$$this.amount"] },
                                    "$$value"
                                ]
                            }
                        }
                    },
                    totalDebit: {
                        $reduce: {
                            input: "$transactions",
                            initialValue: 0,
                            in: {
                                $cond: [
                                    { $eq: ["$$this.type", "debit"] },
                                    { $add: ["$$value", "$$this.amount"] },
                                    "$$value"
                                ]
                            }
                        }
                    },
                    transactions: { $slice: ["$transactions", skip, limit] }
                }
            }
        ]);

        if (result.length > 0) {
            return {
                transactions: result[0].transactions,
                totalTransactions: result[0].totalTransactions,
                totalCredit: result[0].totalCredit || 0,
                totalDebit: result[0].totalDebit || 0
            };
        }
        return { transactions: [], totalTransactions: 0, totalCredit: 0, totalDebit: 0 };
    }

    async addTransaction(userId: Types.ObjectId, transaction: IWalletTransaction): Promise<void> {
        await walletModel.updateOne(
            { userId: userId },
            { $push: { transactions: transaction } }
        );
    }
}