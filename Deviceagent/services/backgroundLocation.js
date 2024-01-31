import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'

const LOCATION_TASK_NAME = 'background-location-task'

const locationTask = async ({data,error}) => {
    if (error) {
        console.log("An Error Occured while fetching location: "+error)
        alert(`An Error occurred while fetching location ${error.message}`)
        return
    }

    if (data) {
        const {locations} = data
        //Do something with the location captured in the background
        let { latitude, longitude } = locations.coords;
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




TaskManager.defineTask(LOCATION_TASK_NAME,locationTask)

(async () => {
    let {status:foreGroundStatus} = await Location.requestForegroundPermissionsAsync();
    if (foreGroundStatus === 'granted'){
        let {status:backGroundStatus} = await Location.requestBackgroundPermissionsAsync()
        if (backGroundStatus === 'granted'){

        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy:Location.Accuracy.BestForNavigation,
            timeInterval:1000,
            distanceInterval:1,
            deferredUpdatesInterval:1000,
            foregroundService:{
                notificationTitle:"This app is using your location service",
                notificationBody:"To switch off,go to the app permission and disable access"

            }
        })
    }
}})