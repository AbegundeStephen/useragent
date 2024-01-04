import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFetched:false,
    infoData:{
    deviceInfo:null,
    uptime:null
    }
}

const deviceInfoSlice = createSlice({
    name:"deviceInfo",
    initialState,
    reducers: {
        SET_DEVICE_INFO(state,action) {
            state.infoData.deviceInfo = action.payload
        },
        SET_UPTIME(state,action) {
            state.infoData.uptime = action.payload
            state.isFetched = true
        },
    }
})
export const {SET_DEVICE_INFO,SET_UPTIME} = deviceInfoSlice.actions
export const selectDeviceInfo = (state) =>  state.deviceInfo.infoData
export const selectUptime = (state) => state.deviceInfo.infoData.uptime
export default deviceInfoSlice.reducer