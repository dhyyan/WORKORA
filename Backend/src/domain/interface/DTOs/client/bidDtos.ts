import { Types } from 'mongoose';
import { BaseBidOutPutDtos } from '../freelancer/bidDtos'; // Adjust the import path as needed

export interface BaseContractOutPutDtos{
    _id: string;
    jobId: string;
    freelancerId: Types.ObjectId;
    totalAmount: number;
    status: "active" | "completed" | "cancelled";
}

export interface BidListInputDtos{
    jobId: string
}

export interface BidListOutputDtos{
    bids: BaseBidOutPutDtos[]
}

export interface HireFreelancerInputDtos{
    bidId: string;
    jobId: string;
    freelancerId: Types.ObjectId;
    totalAmount: number;
}

export interface HireFreelancerOutputDtos{
    contract:BaseContractOutPutDtos
}