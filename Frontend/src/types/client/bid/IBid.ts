export interface IBid {
    _id?: string,
    jobId: string,
    freelancerId: string,
    coverLetter: string,
    bidAmount: number,
    // deadline: string,
    status?: "pending" | "accepted" | "rejected",
    createdAt?: Date,
}

export interface HireFreelancerInput{
    jobId:string,
    bidId:string,
    freelancerId:string,
    totalAmount:number
}