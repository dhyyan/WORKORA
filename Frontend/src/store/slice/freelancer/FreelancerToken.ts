import { createSlice } from "@reduxjs/toolkit";

interface TokenState {
    token: string | null;
}
const initialState:TokenState={
    token:null
}
export const freelancerToken=createSlice({
    name: "freelancerToken",
    initialState,
    reducers:{
        freelancerAddToken:(state,action)=>{
            state.token=action.payload
        },
        freelancerRemoveToken:(state)=>{
            state.token=null
        }
    }

})

export const {freelancerAddToken,freelancerRemoveToken}=freelancerToken.actions
export default freelancerToken.reducer