import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFetched:false,
    deviceNetwork:{
    networkState:null,
    ipAddress: null,
    carrier: null
}
    
}

const networkSlice = createSlice({
    name:"deviceNetwork",
    initialState,
    reducers:{
    SET_DEVICENETWORK(state,action) {
        const network = action.payload
        state.ipAddress = network.ipAddress,
        state.carrier = network.carrier
        state.isFetched = true
    },
    SET_NETWORK_STATE(state,action) {
        state.deviceNetwork.networkState = action.payload
    },
    SET_CARRIER(state,action) {
        state.deviceNetwork.carrier = action.payload
        state.isFetched=true
    },
    SET_IP(state,action) {
        state.deviceNetwork.ipAddress = action.payload
    },
    UPDATE_STATE(state,action) {
        state.deviceNetwork = action.payload
    },
},
});

export const {SET_DEVICENETWORK,SET_NETWORK_STATE,SET_CARRIER,SET_IP,UPDATE_STATE} = networkSlice.actions

export const selectIsFetched = (state) => state.deviceNetwork.isFetched
export const selectDeviceNetwork = (state) => state.deviceNetwork.deviceNetwork
export const selectNetworkState = (state) => state.deviceNetwork.deviceNetwork.networkState

export default networkSlice.reducer;