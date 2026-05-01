import { Types } from "mongoose"

export interface BaseEscrowOutputDtos {
    _id: Types.ObjectId,
    milestoneId: Types.ObjectId,
    amount: string,
    status: "locked" | "released" | "refunded",
    createdAt?: Date,
}

export interface MilestoneFundInputDtos{
    id:Types.ObjectId
}

export interface MilestoneFundOutputDtos{
    escrow:BaseEscrowOutputDtos
}


//stripe
export interface createCheckoutInputDtos{
    milestoneId:Types.ObjectId
    clientId:Types.ObjectId
}

// export interface createCheckoutOutputDtos{
//     // milestoneId:Types.ObjectId,
//     req.session.url=string
    
// }