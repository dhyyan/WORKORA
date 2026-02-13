import { Types } from "mongoose"

export interface BaseMilestoneOutputDtos {
    _id: Types.ObjectId,
    contractId: Types.ObjectId,
    title: string,
    amount: number,
    status: "pending" | "funded" | "submited" | "released" | "approved",
}

export interface CreateMilestoneInputDtos {
    jobId: Types.ObjectId,
    title: string,
    amount: number
}


export interface CreateMilestoneOutputDtos {
    milestone: BaseMilestoneOutputDtos,
    success: boolean
}

export interface GetMilestoneOutputDtos {
    milestones: BaseMilestoneOutputDtos[],
    success: boolean
}

