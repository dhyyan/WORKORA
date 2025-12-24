import { Request, Response } from "express";
import { IUpdateProfileUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/dashboard/Profile/IUpdateProfileUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FreelancerUpdateProfileController{
    private _updateProfileUseCase:IUpdateProfileUseCase
    constructor(updateProfileUseCase:IUpdateProfileUseCase){
        this._updateProfileUseCase=updateProfileUseCase
    }

    async update(req:Request,res:Response):Promise<void>{
        const {name,email,phone,bio,experience,skill,profileImage}=req.body
        console.log("data of updated user", req.body)

        try {
            const {updatedFreelancer,success}= await this._updateProfileUseCase.update({name,email,phone,bio,experience,skill,profileImage})
            if(!updatedFreelancer){
             res.status(HttpStatus.BAD_REQUEST).json({message:"user while updating error",success:false})
            }
            const data={
                name:updatedFreelancer.name,
                email:updatedFreelancer.email,
                phone:updatedFreelancer.phone,
                bio:updatedFreelancer.bio,
                experience:updatedFreelancer.experience,
                skill:updatedFreelancer.skills,
                profileImage:updatedFreelancer.profileImage

            }
            res.status(HttpStatus.OK).json({message:"update profile success",data:data,success:true})
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while update profile',
                error: error instanceof Error ? error.message : 'error while updating profile'
        })
    }
}
}