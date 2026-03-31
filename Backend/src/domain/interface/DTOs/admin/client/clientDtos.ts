import { Types } from "mongoose";
import { BaseClientOutputDtos } from "../../client/AuthDto";
import { BaseMilestoneOutputDtos } from "../../client/milestoneDtos";

export interface ClientListInputDtos {
    page: number,
    limit: number,
    search: string
}

export interface ClientListOutputDtos {
    clients: BaseClientOutputDtos[]
    totalClients: number

}


//block
export interface BlockUserInputDtos {
    id: Types.ObjectId,
    isBlocked: boolean
}

export interface BlockUserOutputDtos {
    success: boolean
}

//list milestone
export interface IMilestoneListInputDtos {
    page: number,
    limit: number
}

export interface IMilestoneListOutputDtos {
    miletstone: BaseMilestoneOutputDtos[],
    totalMilestone: number
}

export interface ICategoryInputDtos {
    name: string
}

export interface ICategoryOutputDtos {
    _id: Types.ObjectId
    name: string
    isListed?:boolean
    createdAt?: Date;
}



