import axios from "axios";

export const serverUrl = "http://localhost:3000/api/v1/useragent/devices"

export const postDeviceData = async (deviceId,deviceData) => {
    try {
        const response = await axios.post(`${serverUrl}/postdeviceinfo`,deviceId,deviceData)
        return response.data
    }catch(err) {

    }
}


export const getDeviceData = async () => {
    try {
       const response = await axios.get(`${serverUrl}/getdeviceinfo`)
       return response.data
    }catch(error) {
        console.error(error.message)
    }
}


export const updateDeviceInfo = async (deviceId,newDeviceInfo) => {
    try{
      const response = await axios.patch(`${serverUrl}/updatedeviceinfo`, deviceId,newDeviceInfo)
      return response.data
    }catch(error){
        console.error(error.message)
    }
}


export const updateLocationInfo = async (deviceId,updatedLocation) => {

    try {
        const response = await axios.patch(`${serverUrl}/updatelocation`, deviceId, updatedLocation)
        return response.data
    }catch(error) {
        console.error(error.message)
    }
}

export const updateNetworkInfo = async (deviceId,updatedNetworkInfo) => {
    try {
      const response = await axios.patch(`${serverUrl}/updatenetworkinfo`,deviceId,updatedNetworkInfo)
      return response.data
    }catch(error) {
        console.error(error.message)
    }
}