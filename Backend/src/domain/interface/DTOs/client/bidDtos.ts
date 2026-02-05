import { BaseBidOutPutDtos } from '../freelancer/bidDtos'; // Adjust the import path as needed

export interface BidListInputDtos{
    jobId: string
}

export interface BidListOutputDtos{
    bids: BaseBidOutPutDtos[]
}