import DeviceInfo from "react-native-device-info";
import { postDeviceData, updateDeviceInfo } from "../axiosServices/deviceDataServices";
import {AsyncStorage} from 'react-native'



 const runDeviceInfoUpdate = async (cb,id) => {
    
        const updatedDeviceInfo = {
                deviceId: await DeviceInfo.getUniqueId(),
                deviceName: await DeviceInfo.getDeviceName(),
                manufacturer: await DeviceInfo.getManufacturer(),
                batteryState: await DeviceInfo.getPowerState(),
                ipAddress: await DeviceInfo.getIpAddress(),
                macAddress: await DeviceInfo.getMacAddress(),
                apiLevel: await DeviceInfo.getApiLevel(),
                phoneNumber: await DeviceInfo.getPhoneNumber()
            }

        try {
            const result = await updateDeviceInfo(id, updatedDeviceInfo)
            console.log(result)
            return cb(result)
        }catch(error) {
                console.error(error.message)
        }
    runDeviceInfoUpdate()
 }


 const runPostDeviceInfo = async (cb) => {
    const deviceInfo = {
                deviceId: await DeviceInfo.getUniqueId(),
                deviceName: await DeviceInfo.getDeviceName(),
                manufacturer: await DeviceInfo.getManufacturer(),
                batteryLevel: await DeviceInfo.getBatteryLevel(),
                ipAddress: await DeviceInfo.getIpAddress(),
                macAddress: await DeviceInfo.getMacAddress(),
                apiLevel: await DeviceInfo.getApiLevel()
    }

    try {
        const result = await postDeviceData(deviceInfo)
  
        return cb(result)

    }catch(error) {
        console.error(error.message)
    }

    runPostDeviceInfo()
 }

 export {runDeviceInfoUpdate, runPostDeviceInfo}