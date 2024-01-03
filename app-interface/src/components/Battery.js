import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Battery from 'expo-battery';
import { batteryInfo } from '../../services/deviceBatteryInfo';
import { useDispatch,useSelector } from 'react-redux';
import { SET_BATTERY_LEVEL,SET_BATTERY_STATE,selectBatteryLevel,selectBatteryState, selectDeviceBattery } from '../../redux/batterySlice';
import { Entypo } from '@expo/vector-icons';


const BatteryStatus = () => {
  const battery = new batteryInfo()
  const deviceBattery = useSelector(selectDeviceBattery)
  const dispatch = useDispatch()

  let battery_state = useSelector(selectBatteryState)
  let battery_level = useSelector(selectBatteryLevel)


 //UseEfect to run batteryInfo
useEffect( () => {
 
  const fetchbBatteryInfo = async() => {
   
    try {
       await battery.getBatteryState()
       await battery.getBatteryLevel()
       dispatch(SET_BATTERY_STATE(battery.batteryState))
       dispatch(SET_BATTERY_LEVEL(battery.batteryLevel))

    }catch (e) {
      console.log("Unable to get battery Information: " + e)
    }
  }
  fetchbBatteryInfo();

   //Subscribe to batteryState

 let sub = battery.subscribeToBatteryStateChanges()
  sub.then(() => {
    console.log("battery state subscription ran successfully")
    battery.subscribeToBatteryLevelChanges()
   }).catch((err) =>{
    console.log("Unable to update battery level and battery state changes: "+ err)
   })
 
},[])

useEffect(() => {
  let sub = battery.subscribeToBatteryLevelChanges()
  sub.then(() => {
    console.log("battery level just updated")
  }).catch((err) => {
    console.log("Unable to set update battery level: "+ err)
  })
},[battery.batteryLevel])
          
 
console.log("BatteryState from redux: "+ battery_state)

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
