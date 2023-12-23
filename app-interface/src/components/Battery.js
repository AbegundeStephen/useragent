import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Battery from 'expo-battery';
import * as Permissions from 'expo-permissions';
import { batteryInfo } from '../../services/deviceBatteryInfo';
import { useDispatch,useSelector } from 'react-redux';
import { SET_BATTERY_LEVEL, SET_BATTERY_STATE} from '../../redux/batterySlice';
import { Entypo } from '@expo/vector-icons';
const battery = new batteryInfo
const BatteryStatus = () => {
  const [deviceBattery, setDeviceBattery] = useState(battery);
  const dispatch = useDispatch()


 //UseEfect to run batteryInfo
useEffect( () => {
  const battery = new batteryInfo()
  const fetchbBatteryInfo = async() => {
   
    try {
       await battery.getBatteryState()
       await battery.getBatteryLevel()
       dispatch(SET_BATTERY_STATE(battery.batteryState))
       dispatch(SET_BATTERY_LEVEL(battery.batteryLevel))

      setDeviceBattery(battery)

    }catch (e) {
      console.log("Unable to get battery Information: " + e)
    }
  }
  fetchbBatteryInfo();
          
 //Subscribe to batteryState
  Battery.addBatteryStateListener(({ batteryState }) => {
    let status = "";
    if (batteryState ===1) {
      status = "UNPLUGGED"
      setDeviceBattery({
        batteryState:status,
        batteryLevel:battery.batteryLevel
      })
      dispatch(SET_BATTERY_STATE(status))
    }else if (batteryState ===2) {
      status = "CHARGING"
      setDeviceBattery({
        batteryState:status,
        batteryLevel:battery.batteryLevel
      })
      dispatch(SET_BATTERY_STATE(status))
    }else {
      status = "FULL"
      setDeviceBattery({
        batteryState:status,
        batteryLevel:battery.batteryLevel
      })
      dispatch(SET_BATTERY_STATE(status))

    }
  });
         

// useEffect(() => {
//   try {
//     let stateSub = battery.subscribeToBatteryStateChanges()
//     console.log("stateSub"+JSON.stringify(stateSub))
//   }catch(err) {
//     console.log(err)
//   }
 },[dispatch,battery.batteryState])

  return (
    <View style={styles.container}>
      <Entypo name="battery" size={40} color="white" />
        <Text style={styles.text}>Battery State: {deviceBattery.batteryState}</Text>
        <Text style={styles.text}>Battery Level: {deviceBattery.batteryLevel}</Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:'20px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    color:"black"
  },
  title: {
    fontSize: 24,
    
    fontWeight: 'bold',
    margin: 10,
  },
  text: {
    fontSize: 18,
    margin: 5,
    color:"white", 
    fontFamily:'monospace',
    fontWeight:"900"
  },

  buttonContainer: {
    marginTop:'65px',
    flexDirection: "row",
    justifyContent: "space-around",
    gap:10,
    // width: "100%",
    position: "absolute fixed",
    bottom: 0,
  },
  button:{
    color:"green",
    
  },
  gradient: {
      height: 'fit-content',
      zIndex: 3,
      width: '100%',
      maxWidth: '640px',
      backgroundColor:'-moz-radial-gradient(circle at 3% 25%, rgba(0, 40, 83, 1) 0%, rgba(4, 12, 24, 1) 25%)',
  }

});

export default BatteryStatus;
