import { model } from "mongoose";
import { IConcern } from "../../../domain/entities/concer.entity";
import { concerSchema } from "../schema/concern.shcem";

export const ConcernModel=model<IConcern>("Concern",concerSchema)