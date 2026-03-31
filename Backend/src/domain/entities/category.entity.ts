import { Types } from "mongoose";

export interface Category{
    _id?:Types.ObjectId,
    name:string,
    isListed?:boolean,
    createdAt?:Date
}