// Import React and React Native components
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { locationInformation } from '../../services/locationService';
import { useDispatch } from 'react-redux';
import { SET_ADRRESS,SET_LOCATION } from '../../redux/locationSlice';
import { Entypo } from '@expo/vector-icons';
import { networkInformation } from '../../services/networkInformationService';
import axios from 'axios';
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import { getDeviceAddress } from '../../utils/utils';

const LOCATION_TASK_NAME = 'background-location-task'

const location = new locationInformation()
const netInfo = new networkInformation()

// Define Location component
const LocationInfo = () => {
const [deviceLocation, setDeviceLocation] = useState(location)



const dispatch = useDispatch()


//useEffect for background location updates
useEffect(() => {
  (async () => {
    let {status:fore_ground} = await Location.requestForegroundPermissionsAsync()
    if(fore_ground !=='granted') {
      console.log("Permission to access location was denied")
      return
    }

    let {status:back_ground} = await Location.requestBackgroundPermissionsAsync()
    if(back_ground !=='granted') {
      console.log("Permission for background access location was denied")
      return
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME,{
      accuracy:Location.Accuracy.BestForNavigation,
      timeInterval:1000,
      distanceInterval:1,
      foregroundService:{
        notificationTitle:"This app is using your location",
        notificationBody:"Live tracker is on"
      }
    })
  })
  ();
})

 //  useEffect to run location updates
useEffect( () => {
  const location = new locationInformation
  const fetchLocationInfo = async() => {

    try{
     await location.getDeviceLocation()
     await location.getDeviceAddress()
     setDeviceLocation(location)
     dispatch(SET_LOCATION(location.deviceLocation?.coords))
     dispatch(SET_ADRRESS(location.deviceAddress))
     

    }catch(error) {
      console.error("Couldn't fetch location data", error)
    }
    
  }

  fetchLocationInfo()

  
 },[location.deviceLocation]); // Pass an empty dependency array to run the effect only once




 //useEffect to watch location changes

 useEffect(() => {
  (async() => {
    console.log("useEffect for watching location changes called")
  let {status} = await Location.requestForegroundPermissionsAsync()
  if(status !== 'granted') {
    console.log("Permission to acces Location in the foreground was denied")
    return
  }
 let currentLocation = await Location.watchPositionAsync({
    accuracy:Location.Accuracy.BestForNavigation,
    timeInterval:5000,
    distanceInterval:1000,
    foregroundService: {
      notificationTitle: 'Using your location',
      notificationBody: 'To turn off, go back to the app and switch something off.',
    },
  },async(newLocation)=>{
    const {latitude,longitude}= newLocation?.coords
    console.log("New Location: " + JSON.stringify(newLocation))
   let address = await getDeviceAddress(latitude,longitude)
   console.log("New Address: " + address)
    setDeviceLocation({
      deviceLocation:newLocation,
      deviceAddress:address
    })
    dispatch(SET_LOCATION(newLocation))
    dispatch(SET_ADRRESS(address))
  })
  // return ()=>{
  //   currentLocation.remove()
  // };
  })
  ();

  
 },[])

 

  
  return (
    <View style={styles.container}>
      <Entypo name="location-pin" size={45} color="red" />
      <Text style={styles.text}>Latitude: {deviceLocation ? deviceLocation.deviceLocation?.coords.latitude : 'N/A'}</Text>
      <Text style={styles.text}>Longitude: {deviceLocation ? deviceLocation.deviceLocation?.coords.longitude : 'N/A'}</Text>
      <Text style={styles.text}>{deviceLocation.deviceAddress ? deviceLocation.deviceAddress : 'N/A'}</Text>
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
});

// Export Location component
export default LocationInfo;
