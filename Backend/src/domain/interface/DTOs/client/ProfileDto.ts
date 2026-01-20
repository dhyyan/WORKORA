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
  userId:string
 }

 export interface ClientDataOutputDtos{
  client:BaseClientOutputDtos,
  success:boolean
 }