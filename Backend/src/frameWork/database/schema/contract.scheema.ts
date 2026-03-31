import { Schema } from "mongoose";
import { IContract } from "../../../domain/entities/contract.entity";

export const contractSchema = new Schema<IContract>({
    jobId: { type: Schema.Types.ObjectId, required: true, ref: "Job" },
    freelancerId: { type: Schema.Types.ObjectId, required: true, ref: "Freelancer" },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["active", "completed", "cancelled"], default: "active" }
}, { timestamps: true
})