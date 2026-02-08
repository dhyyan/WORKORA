export interface BaseMilestoneOutputDtos {
    _id: string,
    contractId: string,
    title: string,
    amount: number,
    status: "pending" | "funded" | "submited" | "released" | "approved",
}

export interface CreateMilestoneInputDtos {
    jobId: string,
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

