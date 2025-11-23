import { createSlice } from "@reduxjs/toolkit";

interface TokenState {
    token: string | null;
}
const initialState:TokenState={
    token:null
}
export const clientToken=createSlice({
    name: "clientToken",
    initialState,
    reducers:{
        addToken:(state,action)=>{
            state.token=action.payload
        },
        removeToken:(state)=>{
            state.token=null
        }
    }

})

export const {addToken,removeToken}=clientToken.actions
export default clientToken.reducer