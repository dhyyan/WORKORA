import { freelancerAxios } from "../../../axios/interceptors";
import type { IProfile } from "../../../types/freelancer/Dashboard/IProfile";

export const updateProfile=async({name,email,phone,bio,experience,skills,gitHubUrl,linkedInUrl,profileImage}:IProfile)=>{

    console.log("update profile service data frontend..",name,email,phone,bio,experience,skills,gitHubUrl,linkedInUrl,profileImage)

    try {
        
        const respone=await freelancerAxios.post("/freelancer/updateprofile",{
            name,
            email,
            phone,
            bio,
            experience,
            skills,
            gitHubUrl,
            linkedInUrl,
            profileImage
        })

        console.log("response from update profile",respone.data)
        return respone.data

    } catch (error) {
          console.error("update profile error:", error);
        throw error;
    }
}


export const getUserDetails=async({userId}: { userId: string })=>{
    try {
        console.log("refresh service called",userId)
        const respone=await freelancerAxios.get(`freelancer/userdata/${userId}`)
        console.log("service response",respone.data)
        return respone.data
    } catch (error) {
          console.error("update profile error:", error);
        throw error;
    }
}