import * as Battery from 'expo-battery'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateExistingData } from '../axiosServices/deviceDataServices';
class batteryInfo {
    constructor() {
        this.batteryState = null;
        this.batteryLevel = null;

        // this.getBatteryState();
    
        // // Subscribe to battery state and level changes using expo-battery methods
        // this.batteryStateSubscription = this.subscribeToBatteryStateChanges;
        // this.batteryLevelSubscription =this.subscribeToBatteryLevelChanges
    }
     // Define a method to get the battery state
  async getBatteryState() {
    // Use expo-battery method to get the battery state
    let batteryState = await Battery.getBatteryStateAsync();
    // Convert the battery state to a string
    switch (batteryState) {
      case Battery.BatteryState.UNKNOWN:
        this.batteryState = 'Unknown';
        break;
      case Battery.BatteryState.UNPLUGGED:
        this.batteryState = 'Unplugged';
        break;
      case Battery.BatteryState.CHARGING:
        this.batteryState = 'Charging';
        break;
      case Battery.BatteryState.FULL:
        this.batteryState = 'Full';
        break;
        
    }
    
    return this.batteryState
  }

  // Define a method to get the battery level
  async getBatteryLevel() {
    // Use expo-battery method to get the battery level
    let batteryLevel = await Battery.getBatteryLevelAsync();
    // Convert the battery level to a percentage
    this.batteryLevel = Math.round(batteryLevel * 100) + '%';
    return Math.round(batteryLevel * 100) + '%'
  }

  // Define a callback function to handle battery state changes
  onBatteryStateChange(batteryState) {
    // Update the battery state
    console.log("State changed: " + batteryState)
    if (batteryState === 1){
    this.batteryState = "UNPLUGGED";
  }else if(batteryState === 2) {
     this.batteryState = "CHARGING"
  }
  else {
    this.batteryState= "FULL"
  }
console.log("Inside  battery state onchange handler: " + this.batteryState)

}

  // Define a callback function to handle battery level changes
  onBatteryLevelChange({ batteryLevel }) {
    // Update the battery level
    console.log("Level changed"+batteryLevel)
    this.batteryLevel = batteryLevel;
    
  }

 subscribeToBatteryStateChanges() {

    // let deviceId = localStorage.getItem("deviceId")
  
   Battery.addBatteryStateListener(({batteryState}) => {
      // if (batteryState === 1){
      //   this.batteryState = "UNPLUGGED";
      // }else if(batteryState === 2) {
      //    this.batteryState = "CHARGING"
      // }
      // else {
      //   this.batteryState= "FULL"
      // }
      this.onBatteryStateChange(batteryState)
      return batteryState
     
    //   console.log("state changed2: "+ batteryState)
    //   const mobileId = await AsyncStorage.getItem("mobileId")
    //   console.log("battery state inside sub:"+ batteryState)
    //  this.onBatteryStateChange(batteryState)
    //  if (mobileId){
    //   let data = {
    //     deviceId:mobileId,
    //     batteryState:batteryState
    //   }
    //   await updateExistingData(data,'update batterystate')
    //
  //}
     return this.batteryState
     
      //Mongodb database can also be updated here

    })
    // console.log("inside sub: ",this.deviceId)
    
  }
subscribeToBatteryLevelChanges() {
  // let deviceId =localStorage.getItem("deviceId")
   this.levelSubscription = Battery.addBatteryLevelListener( async ({batteryLevel}) => {
    const mobileId = await AsyncStorage.getItem("mobileId")
    
   this.onBatteryLevelChange(batteryLevel)
      //Mongodb can be updated here
      if(mobileId){
        let data = {
         deviceId:mobileId,
         batteryLevel:batteryLevel
        }
         await updateExistingData(data,'update batterylevel')
         
       }
      

      return batteryLevel
      
    })
console.log("Inside level", this.deviceId)

}
  // // Define a method to unsubscribe from battery state and level changes
  unsubscribe() {
    // Use expo-battery methods to remove the listeners
    this.levelSubscription.remove
    this.stateSubscription.remove
  }

}

export {batteryInfo}