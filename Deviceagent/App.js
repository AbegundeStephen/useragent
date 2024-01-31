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
import { getDeviceAddress } from './utils/utils.js';
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import * as Battery from 'expo-battery'
import { updateExistingData } from './axiosServices/deviceDataServices.js';
import { getBatteryState } from './utils/utils.js';

const LOCATION_TASK_NAME= 'background-location-task'


TaskManager.defineTask(LOCATION_TASK_NAME,async({data,error}) => {
  const mobileId = await AsyncStorage.getItem("mobileId")
  if(error) {
    console.log("error running background location update: " + error)
    return
  }
  if(data) {
    const {locations} = data
    console.log("Received New Location From Task Manager: "+JSON.stringify(locations[0]))
    const {latitude,longitude} = locations[0].coords
    console.log("latitude: "+latitude, "longitude: "+ longitude)
    const location = locations[0]
    let address = await getDeviceAddress(latitude,longitude)
    console.log("New Address from Taskmanager: "+ address)
   if (mobileId) {
    let locationData ={
      deviceId:mobileId,
      updatedLocation:{
        deviceLocation: location,
        deviceAddress: address
      }
      
      }
      let level = await Battery.getBatteryLevelAsync()
      let state = await getBatteryState()
      let batteryLevel = {
        deviceId:mobileId,
        batteryLevel:Math.round(level*100)+ "%"
       }
       let bateryState = {
        deviceId:mobileId,
        bateryState:state
       }

      await updateExistingData(locationData, 'update location')
      await updateExistingData(bateryState, "update batterystate")
      await updateExistingData(batteryLevel,"upadate batterylevel")


  }else {
    console.log("No deeviceId found thereby unable to update location in the background")
  }
}})

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


//useEffect to run initial data upload
 useEffect(() => {
//  if(status === "Fetched"){
  console.log("Preparing to post Initial Data...");
  
  const uploadDeviceData = async () => {
    try {
      // const storedDeviceId =  localStorage.getItem("deviceId")
      const mobileId = await AsyncStorage.getItem("mobileId")
      console.log("MobileId",mobileId)
      if (mobileId) {
        console.log(`Device data with the mobile id ${mobileId} already posted`)
      // await AsyncStorage.removeItem("mobileId")
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
          dispatch(SET_ID(response.deviceId))
          console.log("Inside Post",JSON.stringify(response.data.result.deviceId))
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
colors={['#4c669f', '#3b5998','green']}

  style={styles.linearGradient}
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
      backgroundColor:'-moz-radial-gradient(circle at 3% 25%, rgba(0, 46, 83, 1) 0%, rgba(4, 12, 16, 1) 25%)',
    backgroundColor:"grey"
  },
  title: {
    fontSize: 24,
    
    fontWeight: 'bold',
    margin: 10,
  },
  linearGradient: {
    flex:1,
    height:'auto',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap:10,
    marginTop:50,gap:10,borderRadius:20,
 
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
