import { Schema} from "mongoose";
import { Bid } from "../../../domain/entities/bid.entity";

export const bidSchema = new Schema<Bid>({
    jobId:{type:Schema.Types.ObjectId, required:true,ref:"Job"},
    freelancerId:{type:Schema.Types.ObjectId, required:true,ref:"Freelancer"},
    coverLetter:{type:String, required:true},
    //  deadline:{type:String, required:true},
    bidAmount:{type:Number, required:true},
    status:{type:String, required:true}
}, { timestamps: true })