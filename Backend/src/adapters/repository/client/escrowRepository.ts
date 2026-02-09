import { Escrow } from "../../../domain/entities/escrow.entity";
import { IEscrowRepository } from "../../../domain/interface/repositoryInterface/IEscrowRepository";
import { escrowModel } from "../../../frameWork/database/models/escrow.model";
import { BaseRepository } from "../BaseRepo/baseRepository";

export class EscrowRepository extends BaseRepository<Escrow> implements IEscrowRepository{
    constructor(){
        super(escrowModel)
    }
}