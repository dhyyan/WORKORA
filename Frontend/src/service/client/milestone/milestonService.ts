import { clientAxios } from "../../../axios/interceptors";

export const milestoneCreateService = async (milestone: { jobId: string, title: string, amount: number }) => {
   try {
      const response = await clientAxios.post("/client/milestone", milestone)
      return response.data
   } catch (error) {
      console.error("milestone create error: in service", error);
      throw error;
   }
}

export const milestoneListService = async ({ jobId }: { jobId: string }) => {
   try {
      console.log("Calling milestoneListService with jobId:", jobId);
      const response = await clientAxios.get(`/client/milestone/${jobId}`)
      console.log("milestoneListService response:", response.data);
      return response.data
   } catch (error) {
      console.error("milestone list error: in service", error);
      throw error;
   }
}

export const approveMilestonPaymentService=async(milestoneId:string)=>{
    try {
        const response=await clientAxios.post(`/client/milestone/approve/payment/${milestoneId}`)
        return response.data
    } catch (error) {
        console.error("milestone approve payment error: in service", error);
      throw error;
    }
}

export const requestMilestonChangeService=async({milestoneId,reason}:{milestoneId:string,reason:string})=>{
    try {
        console.log("reason in service",reason)
        const response=await clientAxios.post(`/client/milestone/requstchange/${milestoneId}`,{reason})
        return response.data
    } catch (error) {
        console.error("milestone request change error: in service", error);
      throw error;
    }
}
