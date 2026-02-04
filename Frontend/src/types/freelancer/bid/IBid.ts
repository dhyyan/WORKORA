export interface IBid {
    _id?: string,
    jobId: string,
    freelancerId: string,
    coverLetter: string,
    bidAmount: number,
    status?: "pending" | "accepted" | "rejected",
    createdAt?: Date,
}