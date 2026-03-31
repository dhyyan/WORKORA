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
    async findAllMilestone(page: number, limit: number): Promise<{ milestone: IMilestone[]; totalMilestone: number; }> {
        const query: any = {}
        const skipAmount = (page - 1) * limit;

        const [milestone, totalMilestone] = await Promise.all([
            milestoneModel.find().skip(skipAmount).limit(limit),
            milestoneModel.countDocuments()
        ])
        return { milestone: milestone as unknown as IMilestone[], totalMilestone }
    }
}
