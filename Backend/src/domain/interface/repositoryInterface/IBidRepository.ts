import { Bid } from "../../entities/bid.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IBidRepository extends IBaseRepository<Bid> {
    updateBid(id: string, bid: Partial<Bid>): Promise<Bid | null>

    findByJobId(jobId: string): Promise<Bid|null>
}