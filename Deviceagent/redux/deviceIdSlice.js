import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    deviceId: null,
}

const idSlice = createSlice({
    name:"deviceId",
    initialState,
    reducers: {
        SET_ID(state,action) {
            state.deviceId = action.payload
        }
    }
})
export const {SET_ID} = idSlice.actions
export const selectId = (state) => state.deviceId

export default idSlice.reducer