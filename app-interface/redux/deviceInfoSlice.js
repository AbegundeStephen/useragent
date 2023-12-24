import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFetched:false,
    deviceInfo: {
    deviceInfo:null,
    uptime:null
    }
}

const deviceInfoSlice = createSlice({
    name:"deviceInfo",
    initialState,
    reducers: {
        SET_DEVICE_INFO(state,action) {
            state.deviceInfo.deviceInfo = action.payload
        },
        SET_UPTIME(state,action) {
            state.deviceInfo.uptime = action.payload
            state.isFetched = true
        },
    }
})
export const {SET_DEVICE_INFO,SET_UPTIME} = deviceInfoSlice.actions
export const selectDeviceInfo = (state) =>  state.deviceInfo.deviceInfo.deviceInfo
export default deviceInfoSlice.reducer