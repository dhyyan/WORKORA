import { createSlice } from "@reduxjs/toolkit";
import type { IClient } from "../../../types/client/IClient";


const initialState: { client: IClient | null } = {
    client: null
}
export const clientSlice = createSlice({
    name: "clientSlice",
    initialState,
    reducers: {
        addClient: (state, action) => {
            state.client = action.payload
        },
        removeClient: (state) => {
            state.client = null
        }
    }
})

export const { addClient, removeClient } = clientSlice.actions
export default clientSlice.reducer