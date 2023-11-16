import React,{useState,useEffect} from 'react'
import {View, Text} from 'react-native'
import DeviceInfo from 'react-native-device-info'

const DeviceInfoCompo = () => {
    const [deviceInfo, setDeviceInfo] = useState(null)
    
    useEffect(() => {
        const fetchDeviceInfo = async() => {
            try{

               const systeVersion = DeviceInfo.getBaseOs()
                    setDeviceInfo(systeVersion)
                // const info = {
                //     // deviceId: await DeviceInfo.getUniqueId(),
                //     deviceName: await DeviceInfo.getDeviceName(),
                //     manufacturer: await DeviceInfo.getManufacturer(),
                //     batteryState: await DeviceInfo.getPowerState(),
                //     ipAddress: await DeviceInfo.getIpAddress(),
                //     macAddress: await DeviceInfo.getMacAddress(),
                //     apiLevel: await DeviceInfo.getApiLevel(),
                //     phoneNumber: await DeviceInfo.getPhoneNumber()
                // }
                // console.log(info)
                // setDeviceInfo(info)
            }catch(error) {
                console.error("Error fetching device Info",error.message)
            }
        }
        fetchDeviceInfo()
    },[])
    console.log(deviceInfo)
  return (

   <View>
    <Text>{deviceInfo.systeVersion}</Text>
    {/* <Text>Unique ID: {deviceInfo.uniqueId}</Text> */}
          {/* <Text>Manufacturer: {deviceInfo.deviceId}</Text>
          <Text>Model: {deviceInfo.deviceName}</Text>
          <Text>System Name: {deviceInfo.manufacturer}</Text>
          <Text>System Version: {deviceInfo.batteryState}</Text>
          <Text>Device ID: {deviceInfo.ipAddress}</Text>
          <Text>Build Number: {deviceInfo.macAddress}</Text>
          <Text>Api Level: {deviceInfo.apiLevel}</Text>
          <Text>phoneNumber:{deviceInfo.phoneNumber}</Text> */}

   </View>
  )
}

export default DeviceInfoCompo