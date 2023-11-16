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


 //new

 import DeviceInfo from 'react-native-device-info';
import DeviceBattery from 'react-native-device-battery';
import DeviceInfoPower from 'react-native-device-info-power';

class DeviceInfoService {
  constructor() {
    this.deviceInfo = null;
    this.batteryLevel = null;
    this.isCharging = null;
    this.powerState = null;
    this.batterySubscription = null;
    this.powerStateSubscription = null;
  }

  // Initialize the device info service
  init = () => {
    this.updateDeviceInfo();

    // Subscribe to battery level changes
    this.batterySubscription = DeviceBattery.addListener(({ level, isCharging }) => {
      this.updateBatteryInfo(level, isCharging);
    });

    // Subscribe to power state changes
    this.powerStateSubscription = DeviceInfoPower.addEventListener(state => {
      this.updatePowerState(state);
    });
  };

  // Update the local state with the latest device information
  updateDeviceInfo = () => {
    this.deviceInfo = {
      deviceId: DeviceInfo.getUniqueId(),
      model: DeviceInfo.getModel(),
      // Add more device information as needed
    };
    // You can update the React component's state or trigger any other actions here
  };

  // Update the local state with the latest battery information
  updateBatteryInfo = (level, isCharging) => {
    this.batteryLevel = level;
    this.isCharging = isCharging;
    // You can update the React component's state or trigger any other actions here
  };

  // Update the local state with the latest power state information
  updatePowerState = powerState => {
    this.powerState = powerState;
    // You can update the React component's state or trigger any other actions here
  };

  // Clean up subscriptions when the component unmounts
  unsubscribe = () => {
    if (this.batterySubscription) {
      this.batterySubscription.remove();
    }
    if (this.powerStateSubscription) {
      this.powerStateSubscription.remove();
    }
  };
}

const deviceInfoService = new DeviceInfoService();
export default deviceInfoService;





import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import deviceInfoService from './DeviceInfoService'; // Update the path accordingly

export default function App() {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [batteryInfo, setBatteryInfo] = useState(null);
  const [powerState, setPowerState] = useState(null);

  useEffect(() => {
    // Initialize the device info service
    deviceInfoService.init();

    // Get initial device information
    deviceInfoService.updateDeviceInfo();

    // Clean up subscriptions when the component unmounts
    return () => {
      deviceInfoService.unsubscribe();
    };
  }, []);

  const sendDataToServer = async () => {
    try {
      // Send data to the server
      await axios.post('http://localhost:3000/api/data', {
        location: 'N/A', // You need to handle location separately
        networkState: 'N/A', // You need to handle network state separately
        deviceInfo: deviceInfoService.deviceInfo,
        batteryInfo: {
          level: deviceInfoService.batteryLevel,
          isCharging: deviceInfoService.isCharging,
        },
        powerState: deviceInfoService.powerState,
      });
      console.log('Data sent successfully!');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <View>
      <Text>Device Info: {deviceInfo ? JSON.stringify(deviceInfo) : 'Loading...'}</Text>
      <Text>Battery Level: {batteryInfo ? `${batteryInfo.level}%` : 'Loading...'}</Text>
      <Text>Is Charging: {batteryInfo ? (batteryInfo.isCharging ? 'Yes' : 'No') : 'Loading...'}</Text>
      <Text>Power State: {powerState || 'Loading...'}</Text>
      <Button title="Send Data" onPress={sendDataToServer} />
    </View>
  );
}
