export interface Bid {
    _id?: string,
    jobId: string,
    freelancerId: string,
    coverLetter: string,
    bidAmount: number,
    // deadline: string,
    status?: "pending" | "accepted" | "rejected",
    createdAt?: Date,
}