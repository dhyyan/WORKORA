import { Types } from "mongoose"
import { BaseFreelancerOutputDtos } from "../freelancer/authDtos"
import { BaseContractOutPutDtos } from "./bidDtos"



export interface BaseJobOutPutDtos {
    _id?: Types.ObjectId,
    clientId?: Types.ObjectId,
    title: string,
    summary: string,
    features?: string[],
    category?: string,
    duration: string,
    deadline: string,
    price?: number,
    freelancerId?: Types.ObjectId
    status?: "open" | "assigned" | "closed",
    createAt?: Date | string
}


export interface JobCreateInputDtos {
    clientId: Types.ObjectId,
    title: string,
    summary: string,
    features: string[],
    category: string,
    duration: string,
    deadline: string,
    price: number,
    status: "open" | "assigned" | "closed",
    createAt: Date
}

export interface JobCreateOutPutDtos {
    job: BaseJobOutPutDtos,
    success: boolean
}

export interface JobListInputDtos {
    id: Types.ObjectId;
    page: number;
    limit: number;
}

export interface JobListOutPutDtos {
    jobs: BaseJobOutPutDtos[];
    totalJobs: number;
}

export interface JobViewInputDtos {
    id: Types.ObjectId
}

export interface JobViewOutputDtos {
    job: BaseJobOutPutDtos
}

export interface JobUpdateInputDtos {

    _id: Types.ObjectId,
    clientId: Types.ObjectId,
    title: string,
    summary: string,
    features: string[],
    category: string,
    duration: string,
    deadline: string,
    price: number,
    status: "open"
}

export interface JobUpdateOutputDtos {
    jobs: BaseJobOutPutDtos
}

export interface JobDeleteInputDtos {
    id: Types.ObjectId
}

export interface JobDeleteOutputDtos {
    success: boolean
}

export interface JobContractInputDtos {
    id: Types.ObjectId
}

export interface JobContractOutPutDtos {
    contract: BaseContractOutPutDtos,
    freelancer: BaseFreelancerOutputDtos
}

export interface JobListAssignInputDtos {
    clientId: Types.ObjectId
}

export interface JobListAssignOutputDtos {
    _id: Types.ObjectId
    title: string,
    summary: string,
    features: string[],
    category: string,
    duration: string,
    deadline: string,
    price: number,
    status: "assigned" | "closed"
}

export interface IConcerInputDtos {
    contractId: Types.ObjectId,
    milestoneId: Types.ObjectId,
    description: string,
    amount: number
}

export interface IConcerOutputDtos {
    _id: Types.ObjectId,
    contractId: Types.ObjectId,
    milestoneId: Types.ObjectId,
    description: string,
    amount: number,
    status: string
}