import { Schema } from "mongoose";
import { Category } from "../../../domain/entities/category.entity";

export const categorySchema= new Schema<Category>({
    name:{type:String,required:true},
    isListed:{type:Boolean,required:false,default:true}
},{timestamps:true})