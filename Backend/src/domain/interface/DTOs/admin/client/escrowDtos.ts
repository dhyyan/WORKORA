import { Types } from "mongoose"

export interface IPaymentReleseInputDtos{
    milestoneId:Types.ObjectId 
}

export interface IPaymentReleseOutputDtos{
    success:boolean
}