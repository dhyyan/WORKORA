import { adminAxios } from "../../../../axios/interceptors"

export const listFreelancers=async(page:number=1,limit:number=10,search:string)=>{
    try {

        const params: Record<string, string | number> = {
            page,
            limit
        }
        if(search.trim())params.search=search.trim()
        const response=await adminAxios.get("/admin/listfreelancer",{params})
        return response.data
    } catch (error) {
        console.log("error in freelance list service",error)
    }
}