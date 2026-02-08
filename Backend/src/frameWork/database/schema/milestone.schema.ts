import { Schema } from "mongoose";
import { IMilestone } from "../../../domain/entities/milestone.entity";

export const milestoneSchema=new Schema<IMilestone>({
    contractId:{type:String, required:true, ref:"contract"},
    title:{type:String, required:true},
    amount:{type:Number, required:true},
    status:{type:String, enum:["pending", "funded", "submited", "released", "approved"], default:"pending"}
}, { timestamps: true})