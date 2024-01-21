// Import React and React Native components
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { locationInformation } from '../../services/locationService';
import { useDispatch } from 'react-redux';
import { SET_ADRRESS,SET_LOCATION } from '../../redux/locationSlice';
import { Entypo } from '@expo/vector-icons';
import { networkInformation } from '../../services/networkInformationService';
const location = new locationInformation()
const netInfo = new networkInformation()

// Define Location component
const LocationInfo = () => {
const [deviceLocation, setDeviceLocation] = useState(location)
const dispatch = useDispatch()


//  useEffect to run location updates
useEffect( () => {
  const location = new locationInformation
  const fetchLocationInfo = async() =>{

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
  // Watch location changes and update state
  const watch = async() => {
    try{
      await location.watchLocation()
      await location.getDeviceAddress()
      dispatch(SET_LOCATION(location.deviceLocation?.coords))
      dispatch(SET_ADRRESS(location.deviceAddress))
      
      setDeviceLocation(location)
  
    }catch(error) {
     console.log("Issues watching location changes: ", + error)
    }
   }
   watch();
   
  

  
  // Return a cleanup function to stop watching location
  // return () => {
  //   location.stopWatchingLocation(sub);
  // };
 },[dispatch, location])
  
// console.log("deviceLocation: "+ JSON.stringify(deviceLocation))
// console.log("coords: "+ JSON.stringify(deviceLocation.deviceLocation?.coords))
  // Return a view with text components to display location information
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
