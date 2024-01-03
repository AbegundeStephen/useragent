import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isFetched:false,
    deviceBattery: {
        batteryState:"",
        batteryLevel:null
    }
}

const batterySlice = createSlice({
  
    name:"battery",
    initialState,
    reducers: {
        SET_BATTERY_STATE(state,action) {
            state.deviceBattery.batteryState=action.payload
            state.isFetched= action.payload
        },
        SET_BATTERY_LEVEL(state,action) {
          
            state.deviceBattery.batteryLevel =action.payload
            state.isFetched= action.payload
        }
    }
})

export const {SET_BATTERY_LEVEL, SET_BATTERY_STATE,SET_DEVICE_BATTERY} = batterySlice.actions

export const selectBatteryState = (state) => state.deviceBattery.deviceBattery.batteryState
export const selectBatteryLevel = (state) => state.deviceBattery.batteryLevel
export const selectDeviceBattery = (state) => state.deviceBattery.deviceBattery

export default batterySlice.reducer