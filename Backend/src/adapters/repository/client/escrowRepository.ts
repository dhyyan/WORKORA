import { Types } from "mongoose";
import { Escrow } from "../../../domain/entities/escrow.entity";
import { IEscrowRepository } from "../../../domain/interface/repositoryInterface/IEscrowRepository";
import { escrowModel } from "../../../frameWork/database/models/escrow.model";
import { BaseRepository } from "../BaseRepo/baseRepository";

export class EscrowRepository extends BaseRepository<Escrow> implements IEscrowRepository{
    constructor(){
        super(escrowModel)
    }
    async findByMilestoneId(milestoneId: Types.ObjectId): Promise<Escrow|null> {
        console.log("id dd",milestoneId)
        return await escrowModel.findOne({milestoneId})
    }
}