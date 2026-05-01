import { IConcern } from "../../../domain/entities/concer.entity";
import { ConcernModel } from "../../../frameWork/database/models/concer.model";
import { BaseRepository } from "../BaseRepo/baseRepository";
import { IConcernRepository } from "../../../domain/interface/repositoryInterface/IConcerRepository";

export class ConcernRepository extends BaseRepository<IConcern> implements IConcernRepository{
    constructor(){
        super(ConcernModel)
    }
}