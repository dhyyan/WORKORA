import { createSlice } from "@reduxjs/toolkit";
import type { IClient } from "../../../types/client/IClient";


const initialState:{admin:IClient|null}={
    admin: null
}
const adminSlice=createSlice({
    name:"adminSlice",
    initialState,
    reducers:{
        addAdmin:(state,action)=>{
            state.admin=action.payload
        },
        removeAdmin:(state)=>{
            state.admin=null
        }
    }
})

export const {addAdmin,removeAdmin}=adminSlice.actions
export default adminSlice.reducer