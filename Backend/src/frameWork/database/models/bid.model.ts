import { Document, model, ObjectId } from "mongoose"
import { Bid } from "../../../domain/entities/bid.entity"
import { bidSchema } from "../schema/bid.schema"


export interface IBidModel extends Omit<Bid, '_id'>, Document {
    _id: ObjectId
}

export const bidModel = model<Bid>('bid', bidSchema)