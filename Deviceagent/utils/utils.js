import AsyncStorage from "@react-native-async-storage/async-storage"
import { updateExistingData } from "../axiosServices/deviceDataServices"
import * as Battery from 'expo-battery'

export const timeFormatter = uptime => {
    const currentTime = new Date().getTime()
    const difference = currentTime - uptime
    const date = new Date(difference)
    return date.toLocaleString()

}

export const toPOw = (num) => {

// Divide by 2^30
let gig = num / Math.pow(2, 30);
// Round to one decimal place
gig = Math.round(gig * 10) / 10;
// Print the result
console.log(gig); // 1.9
return gig

}


export const toPercent = (number, decimals) => {
    // Multiply the number by 100
    let percent = number * 100;
    // Format the percent value with the given number of decimal places
    percent = percent.toFixed(decimals);
    // Append a percent sign to the end of the string
    percent = percent + "%";
    // Return the percentage value as a string
    return percent;
  }

  export const outputProperties = (obj) => {
    // Loop through the object keys
    for (let key in obj) {
      // Get the value of the current key
      let value = obj[key];
      // Check the type of the value
      if (typeof value === "object" && value !== null) {
        // If the value is another object, call the function recursively
        outputProperties(value);
      } else {
        // If the value is not an object, print the key and the value
        console.log("output", key + ": " + value);
        return key + value
      }
    }
  }

  export const getDeviceAddress = async (latitude,longitude) => {
  // const mobileId = await AsyncStorage.getItem("mobileId")
  
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
      return address

    } else {
      // Handle error or no results
      console.log('Geocoding failed or no results');
    }

  }

 export const getBatteryState = async() => {
    // Use expo-battery method to get the battery state
    let batteryState = await Battery.getBatteryStateAsync();
    // Convert the battery state to a string
    switch (batteryState) {
      case Battery.BatteryState.UNKNOWN:
        batteryState = 'Unknown';
        break;
      case Battery.BatteryState.UNPLUGGED:
       batteryState = 'Unplugged';
        break;
      case Battery.BatteryState.CHARGING:
       batteryState = 'Charging';
        break;
      case Battery.BatteryState.FULL:
        batteryState = 'Full';
        break;
        
    }
    
    return batteryState
  }