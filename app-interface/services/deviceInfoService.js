import * as Device from 'expo-device'
import * as Application from 'expo-application'


// Define the deviceInformation class using ES6 syntax
class deviceInformation {
  constructor() {
  // Initialize the device information and battery state and level
    this.deviceInfo={}
    this.uptime = null;

    // Get the device information using expo-device methods
    // this.deviceInfo.brand = Device.brand;
    // this.deviceInfo.deviceName = Device.productName;
    // this.deviceInfo.osName = Device.osName;
    // this.deviceInfo.osVersion = Device.osVersion;
    // this.deviceInfo.androidId = Application.androidId;
    // this.deviceInfo.deviceType= Device.deviceType;
    // this.deviceInfo.totalMemory= Device.totalMemory;
    this.getUptime()
    // Get the initial battery state and level using expo-battery methodss
  }
   //Define method to get the device uptime

   getInfo() {
    return {
      brand : Device.brand,
    deviceName : Device.productName,
    osName : Device.osName,
    osVersion : Device.osVersion,
    androidId : Application.androidId,
    deviceType: Device.deviceType,
    totalMemory: Device.totalMemory,

    }
   }

   async getUptime() {
        let uptime = await Device.getUptimeAsync()
        this.uptime = uptime
        return uptime
      }
    

 
  
}

export {deviceInformation}

