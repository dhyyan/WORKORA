import { Types } from "mongoose";
import { Escrow } from "../../entities/escrow.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IEscrowRepository extends IBaseRepository<Escrow>{
findByMilestoneId(milestoneId:Types.ObjectId):Promise<Escrow|null>
}