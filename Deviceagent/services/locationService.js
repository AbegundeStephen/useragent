import * as Location from 'expo-location'
import { updateExistingData } from '../axiosServices/deviceDataServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as TaskManager from 'expo-task-manager'

const LOCATION_TASK_NAME = 'background-location-task'

class locationInformation {
  // Define constructor
  constructor() {
    // Initialize location property
    this.deviceLocation= null;
    this.deviceAddress = null;

    // Get the device location and address using expo-location methods
    this.getDeviceLocation();
    this.getDeviceAddress();

     // A background location task that updates the deviceLocation instance
     TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
      if (error) {
        console.log(error)
        // Error occurred - check `error.message` for more details.
        return;
      }
      if (data) {
        const { locations } = data;
        // Update the deviceLocation instance with the latest location data
      this.deviceLocation = locations[0];
      
        
      }
    });
  }

  // Define async method to get location and reverse geocode it
  async getDeviceLocation() {
    // Try to get permission to access location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // Handle permission denied
      console.error('Permission to access location was denied');
      return;
    }
    // Try to get current location using Location.getCurrentPositionAsync()
    try {
    
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,});
      // Assign location to property
      this.deviceLocation = location
      // Log location coordinates
      await this.getDeviceAddress()
      return location
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }

  // Define a method to get the device address
  async getDeviceAddress() {
    // Check if the device location is available
    if (this.deviceLocation) {
      // Get the latitude and longitude from the device location
      let { latitude, longitude } = this.deviceLocation.coords;
      // Use the Google Geocoding API to convert the coordinates to an address
      // Note: You need to have a valid API key and enable the Geocoding API for your project
      // See https://developers.google.com/maps/documentation/geocoding/overview for more details
      let apiKey = 'AIzaSyBmHrZFN3RACRhbPeDkZCT_IpAmSzph1sw'; // Replace with your own API key
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
      // Fetch the response from the API
      let response = await fetch(url);
      // Parse the response as JSON
      let data = await response.json();

      // Check if the response is successful and contains results
      if (data.status === 'OK' && data.results.length > 0) {
        // Get the first result as the most relevant address
        let address = data.results[0].formatted_address;
        // Store the address in the class property
        this.deviceAddress = address;
       
        return address

      } else {
        // Handle error or no results
        console.log('Geocoding failed or no results');
      }
    } else {
      // Handle no device location
      console.log('No device location available');
    }
  }


  // Define method to watch location changes using Location.watchPositionAsync()
  async watchLocation() {

    // Define callback function to handle location updates
    // let deviceId = localStorage.getItem("deviceId");
    let callback = async (location) => {
      // Update location property
      this.deviceLocation = location
      const mobileId = await AsyncStorage.getItem("mobileId")
      if (mobileId) {
      let data ={
        deviceId:mobileId,
        updatedLocation:{
          deviceLocation: location,
          address: await this.getDeviceAddress(),
        }
        }
        await updateExistingData(data,'update location')
  
      }
      // Log location coordinates
      console.log(
        'Location coordinates from watch location:',
        location.coords.latitude,
        location.coords.longitude
      );
    };
    // Define options object to configure location updates
    let options = {
      accuracy: Location.Accuracy.High,
      timeInterval: 1000,
      distanceInterval: 1,
    };

    let { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access background location was denied');
    }
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME,options,callback);
  }

    // Start watching location and return the subscription object
    // return Location.startLocationUpdatesAsync(options, callback);

      // Define method to stop watching location using subscription.remove()
  // stopWatchingLocation(subscription) {
  //   // Stop watching location
  //   subscription.remove;
  
  // }
}

  




export { locationInformation }


