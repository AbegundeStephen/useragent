import Geolocation from '@react-native-community/geolocation'
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000")

//Get current location

export const getCurrentLocation = (cb) => {
     Geolocation.getCurrentPosition((position) => {
        const {latitude,longitude} = position.coords;
        cb({latitude, longitude})
        socket.emit("updateLocation",{latitude,longitude})

    }, (error) => {
        console.error("Error getting locationi:", error);
        cb(null)
    },
    {enableHighAccuracy:true, timeout:20000, maximumAge:1000})
}

//Subscribe to location changes

export const fetchLocationChanges = (cb) => {
    const watchId = Geolocation.watchPosition((position) => {
        const {latitude,longitude} = position.coords
        cb({latitude,longitude})

        // update MongoDB
        socket.emit("updateLocation", {latitude,longitude})        
    },  (error) => {
        console.error('Error watching location:', error.message);
      },
      { enableHighAccuracy: true, distanceFilter: 10 }
    );

      return () => {
        Geolocation.clearWatch(watchId)
        socket.disconnect()
      }
}

