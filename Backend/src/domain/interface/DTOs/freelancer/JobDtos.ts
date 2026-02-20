import { Types } from "mongoose";
import { BaseJobOutPutDtos } from "../client/JobDto";

export interface JobListOutPutDtos {
    jobs: BaseJobOutPutDtos[]
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