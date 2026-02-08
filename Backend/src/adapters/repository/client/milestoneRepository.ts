import { IMilestone } from "../../../domain/entities/milestone.entity";
import { IMilestoneRepository } from "../../../domain/interface/repositoryInterface/IMilestoneRepository";
import { milestoneModel } from "../../../frameWork/database/models/milestone.modes";
import { BaseRepository } from "../BaseRepo/baseRepository";
import { Model } from "mongoose";

export class MileStoneRepository extends BaseRepository<IMilestone> implements IMilestoneRepository {
    constructor() {
        super(milestoneModel as unknown as Model<IMilestone>)
    }
}