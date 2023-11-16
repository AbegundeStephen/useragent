import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import networkInfoService from './services/networkInformationService';

export default function App() {
  const [location, setLocation] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [deviceNetwork, setDeviceNetwork]= useState(null``)

  useEffect(() => {
    // Initialize the network info service
    networkInfoService.init(setDeviceNetwork);

    // // Get device location
    // Geolocation.getCurrentPosition(
    //   position => {
    //     setLocation({
    //       type: 'Point',
    //       coordinates: [position.coords.latitude, position.coords.longitude],
    //     });
    //   },
    //   error => {
    //     console.log('Error getting location:', error);
    //   },
    //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    // );

    // Get device information
    // setDeviceInfo(DeviceInfo.getModel());

    // Clean up subscriptions when the component unmounts
    return () => {
      networkInfoService.unsubscribe();
    };
  }, []);

  // const sendDataToServer = async () => {
  //   try {
  //     // Send data to the server
  //     await axios.post('http://localhost:3000/api/data', {
  //       location,
  //       networkState: networkInfoService.type,
  //       deviceInfo,
  //     });
  //     console.log('Data sent successfully!');
  //   } catch (error) {
  //     console.error('Error sending data:', error);
  //   }
  // };
console.log(networkInfoService.init)
console.log(deviceNetwork)
  return (
    <View>
      {/* <Text>Device Location: {location ? JSON.stringify(location) : 'Loading...'}</Text> */}
      <Text>Network State: {networkInfoService.isConnected? 'Connected' : 'Disconnected'}</Text>
      <Text>Network Type: {networkInfoService.type || 'Loading...'}</Text>
      {/* <Text>Device Info: {deviceInfo || 'Loading...'}</Text>
      <Button title="Send Data" onPress={sendDataToServer} /> */}
    </View>
  );
}


//Location
// import React, { useEffect, useState } from 'react';
// import { View, Text, Button } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
// import axios from 'axios';
// import locationService from './LocationService'; // Update the path accordingly

// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [deviceInfo, setDeviceInfo] = useState(null);

//   useEffect(() => {
//     // Initialize the location service
//     locationService.init();

//     // Get device information
//     setDeviceInfo(DeviceInfo.getModel());

//     // Clean up subscriptions when the component unmounts
//     return () => {
//       locationService.unsubscribe();
//     };
//   }, []);

//   const sendDataToServer = async () => {
//     try {
//       // Send data to the server
//       await axios.post('http://localhost:3000/api/data', {
//         location,
//         networkState: 'N/A', // Add your network state logic here
//         deviceInfo,
//       });
//       console.log('Data sent successfully!');
//     } catch (error) {
//       console.error('Error sending data:', error);
//     }
//   };

//   return (
//     <View>
//       <Text>Device Location: {location ? JSON.stringify(location) : 'Loading...'}</Text>
//       <Text>Device Info: {deviceInfo || 'Loading...'}</Text>
//       <Button title="Send Data" onPress={sendDataToServer} />
//     </View>
//   );
// }
