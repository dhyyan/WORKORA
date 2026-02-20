import { ListBidInputDtos, ListBidOutputDtos } from "../../../../DTOs/freelancer/bidDtos";

export interface IListBidUsecase{
    listBids(input:ListBidInputDtos):Promise<ListBidOutputDtos>
}