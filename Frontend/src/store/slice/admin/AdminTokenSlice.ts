import { createSlice } from "@reduxjs/toolkit";

interface TokenState {
    token: string | null;
}
const initialState:TokenState={
    token:null
}
export const adminToken=createSlice({
    name: "adminToken",
    initialState,
    reducers:{
       adminAddToken:(state,action)=>{
            state.token=action.payload
        },
        adminRemoveToken:(state)=>{
            state.token=null
        }
    }

})

export const {adminAddToken,adminRemoveToken}=adminToken.actions
export default adminToken.reducer