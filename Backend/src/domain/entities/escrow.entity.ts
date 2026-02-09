
export interface Escrow{
    _id?:string,
    milestoneId:string,
    amount:number,
    status?:"locked" | "released" | "refunded",
    createdAt?: Date,
}