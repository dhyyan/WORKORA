import { BaseClientOutputDtos } from "../../client/AuthDto";

export interface ClientListInputDtos{

}

export interface ClientListOutputDtos {
    clients: BaseClientOutputDtos[]
}


//block
export interface BlockUserInputDtos{
    id:string,
    isBlocked:boolean
}

export interface BlockUserOutputDtos{
    success:boolean
}