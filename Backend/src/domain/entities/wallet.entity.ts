import { Types } from "mongoose";


// single transaction
export interface IWalletTransaction {
  type: "credit" | "debit";
  amount: number;
  description?: string;
  createdAt?: Date;
}


//  wallet
export interface IWallet {
  _id?: Types.ObjectId;

  userId: Types.ObjectId;  
  role: "client" | "freelancer";

  balance: number;

  transactions?: IWalletTransaction[];

  createdAt?: Date;
  updatedAt?: Date;
}
