import { IMilestone } from "../../../domain/entities/milestone.entity";
import { IMilestoneRepository } from "../../../domain/interface/repositoryInterface/IMilestoneRepository";
import { jobModel } from "../../../frameWork/database/models/job.model";
import { milestoneModel } from "../../../frameWork/database/models/milestone.modes";
import { BaseRepository } from "../BaseRepo/baseRepository";
import { Model } from "mongoose";

export class MileStoneRepository extends BaseRepository<IMilestone> implements IMilestoneRepository {
    constructor() {
        super(milestoneModel as unknown as Model<IMilestone>)
    }
    async findAllMilestone(page: number, limit: number): Promise<{ milestone: IMilestone[]; totalMilestone: number; totalEscrowAmount: number }> {
        const skipAmount = (page - 1) * limit;

        const [milestone, totalMilestone, escrowStats] = await Promise.all([
            milestoneModel.find().sort({ createdAt: -1 }).skip(skipAmount).limit(limit),
            milestoneModel.countDocuments(),
            milestoneModel.aggregate([
                { $match: { status: { $in: ['funded', 'approved'] } } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ])
        ])

        const totalEscrowAmount = escrowStats.length > 0 ? escrowStats[0].total : 0;

        return { milestone: milestone as unknown as IMilestone[], totalMilestone, totalEscrowAmount }
    }
}
