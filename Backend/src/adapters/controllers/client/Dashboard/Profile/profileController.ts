import { Request, Response } from "express";
import { IUpateProfileUseCase } from "../../../../../domain/interface/useCaseInterface/client/Dashboard/Profile/UpdateProfileUseCase";
import { HttpStatus } from "../../../../../domain/entities/httpStatus";

export class ClientProfileUpdateController{
    private _UpdatProfileUseCase:IUpateProfileUseCase
    constructor(UpdatProfileUseCase:IUpateProfileUseCase){
        this._UpdatProfileUseCase=UpdatProfileUseCase
    }

    async updateProfile (req:Request,res:Response):Promise<void>{
        const {email,name,phone,profileImage}=req.body
        console.log("update profile controller",req.body)

        try {
            const {updatedUser}=await this._UpdatProfileUseCase.updateProfile({
                email,
                name,
                phone,
                profileImage
            })

            if (!updatedUser) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: 'user not found' })
                return
            }
        
                const data={
                    _id: updatedUser?._id,
                    email:updatedUser?.email,
                    name:updatedUser?.name,
                    phone:updatedUser?.phone,
                    role: "client",
                    profileImage:updatedUser?.profileImage,
                    isSubscribed: updatedUser?.isSubscribed,
                    isBlocked: updatedUser?.isBlocked,
                    googleId: updatedUser?.googleId,
                }
                res.status(HttpStatus.OK).json({message:"profile updated success", updatedUser: data})
            
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while update profile',
                error: error instanceof Error ? error.message : 'error while updating profile'
            })
        }
    }
}