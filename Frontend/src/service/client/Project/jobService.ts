import { clientAxios } from "../../../axios/interceptors";
import type { IJob } from "../../../types/client/jobs/IJob";

export const jobCreateService = async (job: IJob) => {
   try {
      const response = await clientAxios.post("/client/postjob", job)
      console.log("response in service", response)
      return response.data
   } catch (error) {
      console.error("create job error: in service", error);
      throw error;
   }
}

export const jobListService = async ({ id }: { id: string }) => {
   try {
      const response = await clientAxios.get(`/client/jobs/${id}`)
      return response.data
   } catch (error) {
      console.error("job list error: in service", error);
      throw error;
   }
}

export const jobViewService = async ({ id }: { id: string }) => {
   try {
      const response = await clientAxios.get(`/client/job/${id}`)
      return response.data
   } catch (error) {
      console.error("job view error: in service", error);
      throw error;
   }
}


export const updateJob=async(job:Partial<IJob>)=>{
try {
   console.log("hmmjob",job)
   const response=await clientAxios.put('/client/updatejob',job)
   return response.data
} catch (error) { 
    console.error("job update error: in service", error);
      throw error;
}
}


export const deleteJob=async({_id}:{_id:string})=>{
   try {
      console.log("delete id in service",_id)
      const id= _id
      const response=await clientAxios.delete(`/client/deletejob/${id}`)
      return response.data
   } catch (error) {
      console.error("job delete error: in service", error);
      throw error;
   }
}