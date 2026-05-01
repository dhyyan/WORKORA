import { Types } from "mongoose"
import { BaseClientOutputDtos } from "./AuthDto"

 export interface UpateProfileInputDtos{
    email:string,
    name:string,
    phone:string,
    profileImage:string
 }

 export interface UpateProfileOutputDtos{
   updatedUser:BaseClientOutputDtos,
   success:boolean
 }

 export interface ClientDataInputDtos{
  userId:Types.ObjectId
 }

 export interface ClientDataOutputDtos{
  client:BaseClientOutputDtos,
  success:boolean
 }