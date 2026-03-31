import { model, ObjectId } from "mongoose";
import { IContract } from "../../../domain/entities/contract.entity";
import { contractSchema } from "../schema/contract.scheema";

export interface IContractModel extends Omit<IContract,'_id'>, Document{
    _id: ObjectId
}


export const contractModel = model<IContract>('Contract', contractSchema)   