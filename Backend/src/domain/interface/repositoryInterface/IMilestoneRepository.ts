import { IMilestone } from "../../entities/milestone.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IMilestoneRepository extends IBaseRepository<IMilestone>{
    findAllMilestone(page:number,limit:number):Promise<{milestone:IMilestone[],totalMilestone:number}>
}
