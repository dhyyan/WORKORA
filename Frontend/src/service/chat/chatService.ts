import { clientAxios } from "../../axios/interceptors";

export const clientChatService=async(userId:string)=>{
try{
    const response=await clientAxios.get(`/chat/list/users/${userId}`)
    return response.data
    
}catch(error){
    console.error('Error fetching chat messages:', error);
    return []
}
}

export const clientChatHistoryService=async(roomId:string)=>{
    try{
        const response=await clientAxios.get(`/chat/message/${roomId}/history`)
        return response.data
        
    }catch(error){
        console.error('Error fetching chat messages:', error);
        return []
    }
}