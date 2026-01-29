import { Document, model, ObjectId } from "mongoose"
import { Job } from "../../../domain/entities/job.entity"
import { jobSchema } from "../schema/job.schema"


export interface IJobModel extends Omit<Job, '_id'>, Document {
    _id: ObjectId
}

export const jobModel = model<Job>('job', jobSchema)