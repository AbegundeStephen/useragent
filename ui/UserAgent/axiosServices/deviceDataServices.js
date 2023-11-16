import axios from "axios";

export const serverUrl = "http://localhost:3000/api/v1/useragent/devices"

export const postDeviceData = async (deviceInfo,deviceNetwork,deviceLocaton) => {
    try {
        const response = await axios.post(`${serverUrl}/postdeviceinfo`,deviceInfo,deviceNetwork,deviceLocaton)
        return response.data
    }catch(err) {

    }
}


export const getDevicesData = async () => {
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

export const updateNetworkInfo = async (deviceId,updatedNetwork) => {
    try {
      const response = await axios.patch(`${serverUrl}/updatenetinfo`,deviceId,updatedNetwork)
      return response.data
    }catch(error) {
        console.error(error.message)
    }
}