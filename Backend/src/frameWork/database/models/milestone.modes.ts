import { model, ObjectId } from "mongoose";
import { IMilestone } from "../../../domain/entities/milestone.entity";
import { milestoneSchema } from "../schema/milestone.schema";

export interface IMilestoneModel extends Omit<IMilestone,'_id'>, Document {
    _id: ObjectId
}

export const milestoneModel = model<IMilestoneModel>('milestone', milestoneSchema as any)