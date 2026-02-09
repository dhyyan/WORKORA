import { Types } from "mongoose";
import { BaseClientOutputDtos } from "../../client/AuthDto";

export interface ClientListInputDtos{

}

export interface ClientListOutputDtos {
    clients: BaseClientOutputDtos[]
}


//block
export interface BlockUserInputDtos{
    id:Types.ObjectId,
    isBlocked:boolean
}

export interface BlockUserOutputDtos{
    success:boolean
}