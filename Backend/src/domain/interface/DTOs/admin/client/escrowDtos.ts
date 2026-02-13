import { Types } from "mongoose"
import { BaseMilestoneOutputDtos } from "../../client/milestoneDtos"

export interface IPaymentReleseInputDtos{
    milestoneId:Types.ObjectId 
}

export interface IPaymentReleseOutputDtos{
    success:boolean
}