import { Types } from "mongoose";
import { Bid } from "../../entities/bid.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IBidRepository extends IBaseRepository<Bid> {
    updateBid(id: Types.ObjectId, bid: Partial<Bid>): Promise<Bid | null>

    findByJobId(jobId: Types.ObjectId): Promise<Bid | null>

    findAllBids(freelancerId: Types.ObjectId): Promise<Bid[] | null>
}