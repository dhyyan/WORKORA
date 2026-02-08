export interface BaseBidOutPutDtos {
    _id: string,
    jobId: string,
    freelancerId: string,
    coverLetter: string,
    bidAmount?: number,
    // deadline: string,
    status?: "pending" | "accepted" | "rejected",
    createdAt?: Date
}

export interface BidCreateInputDtos {
    jobId: string,
    freelancerId: string,
    coverLetter: string,
    // deadline: string,
    bidAmount: number,
}

export interface BidCreateOutPutDtos{
    bid:BaseBidOutPutDtos
}