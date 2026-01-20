import { admintAxios } from "../../../../axios/interceptors"

export const listFreelancers=async()=>{
    try {
        const response=await admintAxios.get("/admin/listfreelancer")
        return response.data
    } catch (error) {
        console.log("error in freelance list service",error)
    }
}