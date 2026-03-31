import { Types } from "mongoose";
import { BaseJobOutPutDtos } from "../client/JobDto";

export interface JobListOutPutDtos {
    jobs: BaseJobOutPutDtos[];
    totalJobs: number;
}

export interface ListJobInputDtos {
    category: string[], skills: string[], priceRange: number[], page: number, limit: number, search?: string
}

export interface JobViewOutputDtos {
    jobDetail: BaseJobOutPutDtos,
    user: {
        name: string,
        email: string,
        phone?: string,
        profileImage?: string,
    }
}

export interface ListAcceptJobInputDtos {
    freelancerId: Types.ObjectId
}

export interface ListAcceptJobOutputDtos {
    jobs: BaseJobOutPutDtos[]
}

export interface ListCompletedJobsInputDtos {
    freelancerId: Types.ObjectId
}

export interface ListCompletedJobsOuputDtos {
    jobs: BaseJobOutPutDtos[]
}