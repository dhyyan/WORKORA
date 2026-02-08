import { Bid } from "../../../domain/entities/bid.entity";
import { IBidRepository } from "../../../domain/interface/repositoryInterface/IBidRepository";
import { bidModel } from "../../../frameWork/database/models/bid.model";
import { BaseRepository } from "../BaseRepo/baseRepository";

export class BidRepository extends BaseRepository<Bid> implements IBidRepository {
    constructor() {
        super(bidModel)
    }
    findByJobId(jobId: string): Promise<Bid | null> {
        return this.model.findOne({ jobId })
    }

    updateBid(id: string, bid: Partial<Bid>): Promise<Bid | null> {
        return this.model.findByIdAndUpdate(id, bid, { new: true })
    }
}