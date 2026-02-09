import { model, ObjectId } from "mongoose";
import { Escrow } from "../../../domain/entities/escrow.entity";
import { escrowScheema } from "../schema/escrow.scheema";

export interface IEscrowModel extends Omit<Escrow,"_id">, Document{
     _id: ObjectId
}

export const escrowModel=model<Escrow>("esrow",escrowScheema)