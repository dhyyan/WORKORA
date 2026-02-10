import { Types } from "mongoose"

export interface BaseEscrowOutputDtos {
    _id: Types.ObjectId,
    milestoneId: Types.ObjectId,
    amount: string,
    status: "locked" | "released" | "refunded",
    createdAt?: Date,
}

export interface MilestoneFundInputDtos{
    id:string
}

export interface MilestoneFundOutputDtos{
    escrow:BaseEscrowOutputDtos
}