export interface BaseBidOutPutDtos {
    _id: string,
    jobId: string,
    freelancerId: string,
    coverLetter: string,
    bidAmount?: number,
    status?: "pending" | "accepted" | "rejected",
    createAt?: Date
}

export interface BidCreateInputDtos {
    jobId: string,
    freelancerId: string,
    coverLetter: string,
    bidAmount: number,
}

export interface BidCreateOutPutDtos{
    bid:BaseBidOutPutDtos
}