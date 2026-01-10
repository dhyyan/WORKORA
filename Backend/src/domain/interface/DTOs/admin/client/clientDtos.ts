import { BaseClientOutputDtos } from "../../client/AuthDto";

export interface ClientListInputDtos{

}

export interface ClientListOutputDtos {
    clients: BaseClientOutputDtos[]
}
