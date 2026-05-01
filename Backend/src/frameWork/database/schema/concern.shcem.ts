import { Schema } from "mongoose";
import { IConcern } from "../../../domain/entities/concer.entity";

export const concerSchema = new Schema<IConcern>({

    contractId: {
        type: Schema.Types.ObjectId,
        ref: "Contract"
    },
    milestoneId: {
        type: Schema.Types.ObjectId,
        ref: "milestone"
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "resolved"],
        default: "pending"
    }
}, { timestamps: true })