import { Document, model, ObjectId } from "mongoose";
import { Freelancer } from "../../../domain/entities/freelancerntity";
import { freelancerSceema } from "../schema/freelancerScheema";

export interface IFreelancerModel extends Omit<Freelancer, '_id'>, Document {
    _id: ObjectId
}

export const freelacerModel = model<Freelancer>('Freelancer', freelancerSceema)