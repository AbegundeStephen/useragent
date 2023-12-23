import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locationStatus:false,
    locationData:{
    deviceLocation:null,
    deviceAddress:null
    }
}

const locationSlice = createSlice({
name:"deviceLocation",
initialState,
reducers:{
    SET_LOCATION(state,action) {
        state.locationData.deviceLocation = action.payload
    },
    SET_ADRRESS(state,action) {
     state.locationData.deviceAddress = action.payload
    },
    UPDATE_LOCATION(state,action) {
        state.deviceLocation = action.payload
    },
    UPDATE_ADDRESS(state,action) {
        state.deviceAddress = action.payload
        state.locationStatus = true
    },
   
    }

})

export const {SET_LOCATION,SET_ADRRESS,UPDATE_LOCATION,UPDATE_ADDRESS} = locationSlice.actions
export const selectDeviceLocation = (state) => state.deviceLocation.locationData
export const locationFetched = (state) => state.locationStatus

export default locationSlice.reducer