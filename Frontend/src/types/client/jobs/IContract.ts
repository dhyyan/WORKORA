export interface IContract {
    _id?: string,
    jobId: string,
    freelancerId: string,
    totalAmount: number,
    status?: "active" | "completed" | "cancelled",
    createdAt?: Date,
}