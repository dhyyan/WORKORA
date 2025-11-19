import { model, Document, ObjectId } from "mongoose"
import { Client } from "../../../domain/entities/client.entity"
import { clientSchem } from "../schema/client.scheema"

export interface IClientModel extends Omit<Client, '_id'>, Document {
    _id: ObjectId
}

export const clietModel = model<Client>('client', clientSchem)