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
