// Import React and useState hook
import React, { useState,useEffect } from 'react';
import { View, Text,Pressable, StyleSheet,Button} from 'react-native';
import { timeFormatter } from '../../utils/utils.js';
import { deviceInformation } from '../../services/deviceInfoService.js';
import {useDispatch,useSelector} from 'react-redux'
import {SET_DEVICE_INFO, SET_UPTIME} from '../../redux/deviceInfoSlice.js'
import { AntDesign } from '@expo/vector-icons';

const initialDeviceInfo = {
  deviceInfo : {},
  uptime:null,
}
const device = new deviceInformation()
// Define a functional component that displays the device information
const DeviceInfo = () => {


const [deviceInfo, setDeviceInfo] = useState(device)
const dispatch = useDispatch()
  //Useffect to run device information
 useEffect(() => {
  // Create an instance of the deviceInformation class
  const fetchDeviceInfo = async () => {
   try {
    let deviceInfo = device.deviceInfo
     let uptime = device.uptime
    dispatch(SET_DEVICE_INFO(deviceInfo))
    dispatch(SET_UPTIME(uptime))
    
    console.log("deviceInfo: "+ JSON.stringify(device.deviceInfo))
    

    }catch(error) {
      console.error(error.message)
    }
  }

  fetchDeviceInfo()

  
},[]); // Pass an empty array to indicate that the effect should only run once

console.log("deviceInfo: "+ JSON.stringify(deviceInfo))
  // Return the JSX element that renders the component
  return (
    <>
    <View style={styles.container}>
    <AntDesign name="android1" size={40} color="green" />
      <Text style={styles.text}>Brand: {deviceInfo.deviceInfo.brand}</Text>
      <Text style={styles.text}>Product Name: {deviceInfo.deviceInfo.deviceName}</Text>
      <Text style={styles.text}>OS Name: {deviceInfo.deviceInfo.osName}</Text>
      <Text style={styles.text}>OS Version: {deviceInfo.deviceInfo.osVersion}</Text>
      <Text style={styles.text}>AndroidId: {deviceInfo.deviceInfo.androidId}</Text>
      <Text style={styles.text}>Ram: {deviceInfo.deviceInfo.totalMemory}</Text>
      <Text style={styles.text}>Up since: {timeFormatter(deviceInfo.uptime)}</Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
     //backgroundColor: '#fd6572',
     padding: '50px',
     height: '100%'
   
  },

  title: {
    fontSize: 34,  
    fontWeight: 'bold',
    margin: 10,
  },
  text: {
    fontSize: 18,
     fontWeight: 'bold',
    fontFamily: 'sans-serif',
    fontStyle:"normal",
    color:"black"
     
  },

})

// Export the DeviceInfoComponent
export default DeviceInfo;