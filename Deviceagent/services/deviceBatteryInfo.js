import * as Battery from 'expo-battery'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateExistingData } from '../axiosServices/deviceDataServices';
import { store } from '../redux/store';
import { SET_BATTERY_STATE,SET_BATTERY_LEVEL } from '../redux/batterySlice';
import * as TaskManager from 'expo-task-manager'

class batteryInfo {
    constructor() {
        this.batteryState = null;
        this.batteryLevel = null;

        this.getBatteryLevel();
    
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
    const deviceId = AsyncStorage.getItem("mobileId")
    // Use expo-battery method to get the battery level
    let batteryLevel = await Battery.getBatteryLevelAsync();
    // Convert the battery level to a percentage
    this.batteryLevel = Math.round(batteryLevel * 100) + '%';
    store.dispatch(SET_BATTERY_LEVEL(this.batteryLevel))
    // if (deviceId){
    //   let data ={
    //     deviceId: deviceId,
    //     batteryLevel: Math.round(batteryLevel * 100) + '%'
    //   }
    //   updateExistingData(data, 'update batterylevel')
    // }
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

 async subscribeToBatteryStateChanges() {
   Battery.addBatteryStateListener(({ batteryState }) => {
  let status = "";
  if (batteryState ===1) {
    status = "UNPLUGGED"
    this.batteryState = status
   store.dispatch(SET_BATTERY_STATE(status))
    // store.dispatch(SET_BATTERY_LEVEL(battery.batteryLevel))
  }else if (batteryState ===2) {
    status = "CHARGING"
    this.batteryState = status
    store.dispatch(SET_BATTERY_STATE(status))
    // store.dispatch(SET_BATTERY_LEVEL(battery.batteryLevel))
  }else {
    status = "FULL"
    this.batteryState = status
   store.dispatch(SET_BATTERY_STATE(status))
  //  store.dispatch(SET_BATTERY_LEVEL(battery.batteryLevel))
  }

  })
  let deviceId = await AsyncStorage.getItem("mobileId")
  
  if (deviceId) {
    let data = {
          deviceId:deviceId,
          batteryState:this.batteryState
        }
   updateExistingData(data,'update batterystate')
}
}

async subscribeToBatteryLevelChanges() {
Battery.addBatteryLevelListener(({batteryLevel}) => {
  console.log("Battery level inside sub: "+batteryLevel)
      this.batteryLevel = batteryLevel
      store.dispatch(SET_BATTERY_LEVEL(this.batteryLevel))
    })
    let deviceId = await AsyncStorage.getItem("mobileId")
      if(deviceId){
        let data = {
         deviceId:deviceId,
         batteryLevel:this.batteryLevel
        }
    updateExistingData(data,'update batterylevel')
         
       }
}
  // // Define a method to unsubscribe from battery state and level changes
  unsubscribe() {
    // Use expo-battery methods to remove the listeners
    this.levelSubscription.remove
    this.stateSubscription.remove
  }

}

export {batteryInfo}