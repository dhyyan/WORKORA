import { Schema, Types } from "mongoose";
import { IWallet } from "../../../domain/entities/wallet.entity";

export const walletSchema = new Schema<IWallet>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      refPath: "role",
      required: true
    },

    role: {
      type: String,
      enum: ["client", "freelancer", "Client", "Freelancer", "admin"],
      required: true
    },

    balance: {type: Number,default: 0},

    transactions: [{
        type: {type: String, enum: ["credit", "debit"]},
        amount: Number,
        description: String,
        createdAt: {type: Date, default: Date.now}
      }]
  },
  { timestamps: true }
);
