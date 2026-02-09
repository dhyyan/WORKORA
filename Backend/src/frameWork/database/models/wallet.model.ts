import { model, ObjectId } from "mongoose";
import { IWallet } from "../../../domain/entities/wallet.entity";
import { walletSchema } from "../schema/wallet.schema";

export interface IWalletModel extends Omit<IWallet,"_id">, Document {
    _id: ObjectId
}

export const walletModel = model<IWallet>('wallet', walletSchema)