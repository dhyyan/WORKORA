import { Schema } from "mongoose";
import { Escrow } from "../../../domain/entities/escrow.entity";

export const escrowScheema= new Schema<Escrow>({
    milestoneId:{type:String,required:true,ref:"milestone"},
    amount:{type:Number,required:true},
    status:{type:String,enum: ["locked", "released", "refunded"],default:"locked"}
},{ timestamps: true })