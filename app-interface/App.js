import React, { useEffect, useState,  } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Button, SafeAreaView} from 'react-native';
import { postDeviceData} from './axiosServices/deviceDataServices.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import shortid from 'shortid'
import DeviceInfo from './src/components/DeviceInfo.js';
import NetworkInfo from './src/components/NetworkInfo.js';
import LocationInfo from "./src/components/LocationInfo.js"
import BatteryStatus from './src/components/Battery.js';
import { useDispatch,useSelector } from 'react-redux';
import { selectDeviceNetwork } from './redux/networkSlice.js';
import { SET_ID } from './redux/deviceIdSlice.js';
import { LinearGradient } from 'expo-linear-gradient'
import { selectDeviceLocation } from './redux/locationSlice.js';
import { selectDeviceBattery } from './redux/batterySlice.js';
import { selectDeviceInfo,selectUptime } from './redux/deviceInfoSlice.js';


 function App() {
 const [deviceId, setDeviceId] = useState("")
 const deviceNetwork = useSelector(selectDeviceNetwork)
 const deviceLocation = useSelector(selectDeviceLocation)
 const deviceBattery = useSelector(selectDeviceBattery)
 const deviceInfo= useSelector(selectDeviceInfo)
 
 

 const dispatch = useDispatch()

//  console.log("deviceNetwork from redux: "+ JSON.stringify(deviceNetwork))
//  console.log("deviceBattery from redux: "+ JSON.stringify(deviceBattery))
//  console.log("deviceInfo from redux: "+ JSON.stringify(deviceInfo))


//useEffect to run initial data posting to the server
 useEffect(() => {
//  if(status === "Fetched"){
  console.log("Preparing to post Initial Data...");
  
  const uploadDeviceData = async () => {
    try {
      // const storedDeviceId =  localStorage.getItem("deviceId")
      const mobileId = await AsyncStorage.getItem("mobileId")
      console.log("MobileId",mobileId)
      if (mobileId) {
        console.log("Device data already posted")
      }
      else {
        console.log('posting Initial Data')
        const newDeviceId = shortid.generate()
        dispatch(SET_ID(newDeviceId))
        setDeviceId(newDeviceId)
        const data = {
          deviceId:newDeviceId,
          deviceNetwork:deviceNetwork,
          deviceLocation:deviceLocation,
          deviceInfo:deviceInfo,
          deviceBattery:deviceBattery
        }
        console.log("Data Inside Post:"+JSON.stringify(data))
        const response = await postDeviceData(data);
        console.log("Post",JSON.stringify(response,null,2))
        if (response.status === 200){
          dispatch(SET_ID(response.data.result.deviceId))
        await AsyncStorage.setItem("mobileId",response.data.result.deviceId)
        // localStorage.setItem("deviceId", response.result.deviceId )  
        } 
      }

    
      
  }catch(error) {
    console.error(error)
  }}

  // }
  uploadDeviceData()

 },[])
 

// console.log("Data"+JSON.stringify(data,null,2))

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView >
   
        <LinearGradient
  colors={['blue', 'yellow']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={{ flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50,gap:10,height:'auto' }}
> 
     <NetworkInfo />
     <DeviceInfo />
     <BatteryStatus/>
    <LocationInfo/> 
    </LinearGradient>
    </ScrollView>
     </SafeAreaView>
     
  )
}
   


const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
    marginTop:'45px',
     backgroundColor:'-moz-radial-gradient(circle at 3% 25%, rgba(0, 40, 83, 1) 0%, rgba(4, 12, 24, 1) 25%)',
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
    color:"black" 
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


export default App
