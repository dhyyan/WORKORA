import { Schema } from "mongoose";
import { Bid } from "../../../domain/entities/bid.entity";

export const bidSchema = new Schema<Bid>({
    jobId:{type:String, required:true,ref:"job"},
    freelancerId:{type:String, required:true,ref:"freelancer"},
    coverLetter:{type:String, required:true},
    //  deadline:{type:String, required:true},
    bidAmount:{type:Number, required:true},
    status:{type:String, required:true}
}, { timestamps: true })