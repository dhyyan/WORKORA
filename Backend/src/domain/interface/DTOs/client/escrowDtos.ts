export interface BaseEscrowOutputDtos {
    _id: string,
    milestoneId: string,
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