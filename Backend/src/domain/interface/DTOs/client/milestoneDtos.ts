import { Types } from "mongoose"

export interface BaseMilestoneOutputDtos {
    _id?: Types.ObjectId,
    contractId: Types.ObjectId,
    title: string,
    amount: number,
    description?: string,
    taskUrl?: string,
    reason?: string,
    status?: "pending" | "funded" | "submited" | "released" | "rejected" | "approved" | "locked" | "refunded",
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

export interface IApproveMilestonePaymentInputDtos {
    milestoneId: Types.ObjectId
}

export interface IApproveMilestonePaymentOutputDtos {
    success: boolean
}

export interface IRequestMilestoneChangeInputDtos {
    milestoneId: Types.ObjectId,
    reason: string
}

export interface IRequestMilestoneChangeOutputDtos {
    success: boolean
}
