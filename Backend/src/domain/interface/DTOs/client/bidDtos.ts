import { Types } from 'mongoose';
import { BaseBidOutPutDtos } from '../freelancer/bidDtos'; // Adjust the import path as needed

export interface BaseContractOutPutDtos{
    _id: Types.ObjectId;
    jobId: Types.ObjectId;
    freelancerId: Types.ObjectId;
    totalAmount: number;
    status: "active" | "completed" | "cancelled";
}

export interface BidListInputDtos{
    jobId: Types.ObjectId
}

export interface BidListOutputDtos{
    bids: BaseBidOutPutDtos[]
}

export interface HireFreelancerInputDtos{
    bidId: Types.ObjectId;
    jobId: Types.ObjectId;
    freelancerId: Types.ObjectId;
    totalAmount: number;
}

export interface HireFreelancerOutputDtos{
    contract:BaseContractOutPutDtos
}

export interface IRejectFreelancerInputDtos{
    bidId:Types.ObjectId
}
export interface IRejectFreelancerOutputDtos{
    success:boolean
}