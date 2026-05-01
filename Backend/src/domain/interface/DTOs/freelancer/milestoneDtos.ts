import { Types } from "mongoose";

export interface SubmitMilestoneInputDtos{
    milestoneId:Types.ObjectId
    taskUrl:string,
    description:string
}

export interface SubmitMilestoneOutputDtos{
    success:boolean
}