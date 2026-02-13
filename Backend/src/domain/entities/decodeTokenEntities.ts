import { Types } from "mongoose";

export interface DecodeTockenEntity{
    userId:Types.ObjectId,
    role:string,
    iat:number,
    exp:number
}