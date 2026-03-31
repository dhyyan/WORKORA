import { Types } from "mongoose"

export interface BaseBidOutPutDtos {
    _id: Types.ObjectId,
    jobId?: Types.ObjectId,
    freelancerId?: Types.ObjectId,
    coverLetter: string,
    bidAmount?: number,
    // deadline: string,
    status?: "pending" | "accepted" | "rejected",
    createdAt?: Date
}

export interface BidCreateInputDtos {
    jobId: Types.ObjectId,
    freelancerId: Types.ObjectId,
    coverLetter: string,
    // deadline: string,
    bidAmount: number,
}

export interface BidCreateOutPutDtos {
    bid: BaseBidOutPutDtos
}

export interface ListBidInputDtos {
    freelancerId: Types.ObjectId
}

export interface ListBidOutputDtos {
    bids: BaseBidOutPutDtos[]
}