import axios from "axios";
import io from "socket.io-client";


export const serverUrl = "https://useragent-api.onrender.com"
const socket = io("https://useragent-api.onrender.com")

export const postDeviceData = async (data) => {
    try {
        const response = await axios.post(`${serverUrl}/api/v1/useragent/devices/postdevicedata`,data
         )
        console.log("Inside axios: "+JSON.stringify(response.data))
        return response
    }catch(error) {
        console.error(error)
    }
}


export const getDevicesData = async () => {
    try {
       const response = await axios.get(`${serverUrl}/api/v1/useragent/devices/getdeviceinfo`)
       return response.data.message
    }catch(error) {
        console.error(error.message)
    }
}


export const updateDeviceInfo = async (deviceId,newDeviceInfo) => {
    try{
      const response = await axios.patch(`${serverUrl}/api/v1/useragent/devices/updatedeviceinfo`, deviceId,newDeviceInfo)
      if (response.status === 200) {
        socket.emit('device info updated', response.data)
        return response.data.message
      }else {
        throw `Failed to update device info: ${response.status}`
      }
     
    }catch(error){
        console.error(error.message)
    }
}


export const updateLocationInfo = async (data) => {

    try {
        const response = await axios.patch(`${serverUrl}/api/v1/useragent/devices/updatelocation`, data)
        if (response.status === 200) {
            socket.emit('locationupdated', response.data)
            console.log(response.data.message)
            return response.data
        }else{
            throw `Could not update location: ${response.status}`
        }
    }catch(error) {
        console.error(error.message)
    }
}

export const updateNetworkInfo = async (data) => {
    try {
      const response = await axios.patch(`${serverUrl}/api/v1/useragent/devices/updatenetinfo`,data)
      if (response.status === 200) {
        socket.emit('networkupdated', response.data)
        return response.data
      }else {
        throw `Failed to update network info: ${response}`
      }
    
    }catch(error) {
        console.log(error)
    }
}

export const updateBatteryLevel = async (data) => {
    try {
      const response = await axios.patch(`${serverUrl}/api/v1/useragent/devices/updatebatterylevel`,data)
      if (response.status=== 200) {
        socket.emit('dataUpdate', response.data)
        console.log(response.data.message)
        return response.data.message
      }else {
        throw `Failed to update battery level: ${response.status}`
      }
    
    }catch(error) {
        console.error(error)
    }
}

export const updateBatteryState = async (data) => {
    try {
      const response = await axios.patch(`${serverUrl}/api/v1/useragent/devices/updatebatterystate`,data)
      if (response.status === 200) {
        socket.emit('dataUpdate', response.data)
        console.log(response.data.message)
        return response.data.message
      }else {
        throw `Failed to update battery state: ${response.status}`
      }
    
    }catch(error) {
        console.error(error)
    }
}


export const updateExistingData = async (data,type) => {
    try {
        switch(type){
            case 'update network' :
                const networkData = await updateNetworkInfo(data)
                return networkData;

            case 'update device info' :
                const deviceInfo = await updateDeviceInfo(data)
                return deviceInfo;

                case 'update location' : 
                const deviceLocation = await updateLocationInfo(data)
                return deviceLocation;

                case 'update batterystate' : 
                const batteryState = await updateBatteryState(data)
                return batteryState;

                case 'update batterylevel' : 
                const batteryLevel = await updateBatteryLevel(data)
                return batteryLevel;


            default : `throw Invalid data type: ${type}`

        }

    }catch(error) {
        console.error(error)
    }
}