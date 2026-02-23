import { Schema } from "mongoose";
import { IMilestone } from "../../../domain/entities/milestone.entity";

export const milestoneSchema = new Schema<IMilestone>({
    contractId: { type: Schema.Types.ObjectId, required: true, ref: "contract" },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    description:{type:String,required:false},
    taskUrl:{type:String,required:false},
    reason:{type:String,required:false},
    status: { type: String, enum: ["pending", "funded", "submited", "released", "rejected" , "approved", "locked", "refunded"], default: "pending" }
}, { timestamps: true })