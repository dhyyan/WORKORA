import { BidCreateInputDtos, BidCreateOutPutDtos } from "../../../DTOs/freelancer/bidDtos";

export interface ICreateBidUseCase {
    create(input:BidCreateInputDtos):Promise<BidCreateOutPutDtos>
}