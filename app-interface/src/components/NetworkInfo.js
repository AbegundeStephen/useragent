// Import React and React Native components
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { networkInformation } from '../../services/networkInformationService';
import { useDispatch,useSelector } from 'react-redux';
import { SET_NETWORK_STATE,SET_IP, SET_CARRIER, selectNetworkState, selectDeviceNetwork} from '../../redux/networkSlice';
import { Entypo } from '@expo/vector-icons';


const netInfo = new networkInformation

const NetworkInfo = () => {
  
const dispatch = useDispatch()
  // Return a view with text components to display network information
  // const [deviceNetwork, setDeviceNetwork] = useState(net)
  const deviceNetwork = useSelector(selectDeviceNetwork)
  const networkState = useSelector(selectNetworkState)
   //use efect to run when the network state changes
useEffect(() => {
  // Get network information and update state
 const getNetworkInfo = async() => {
  try{
    await netInfo.getIpAddress()
    await netInfo.getNetworkCarrier()
    await netInfo.getNetworkState()
    dispatch(SET_NETWORK_STATE(netInfo.networkState))
    dispatch(SET_IP(netInfo.ipAddress))
    dispatch(SET_CARRIER(netInfo.carrier))
    // console.log("NetInfo Inside try :"+ JSON.stringify(netInfo))
  
}catch(error){
    console.error("Unable to set device network states",error)
  }
  }
  getNetworkInfo()

    
  let sub = netInfo.subscribeToNetworkChanges()
  sub.then(() => {
    dispatch(SET_NETWORK_STATE(netInfo.networkState))
    dispatch(SET_CARRIER(netInfo.carrier))
    dispatch(SET_IP(netInfo.ipAddress))
    
  })

  // return () => {
  //   netInfo.unsubscribeFromNetworkChanges(sub)
  // }
 },[])
//  console.log("deviceNetwork: "+ JSON.stringify(deviceNetwork))
  return (
    <View style={styles.container}>
      <Entypo name="network" size={23} color="red"/>
      <View style={styles.box}>
      <Text style={styles.text}>
        State: {deviceNetwork.networkState?.isConnected == false? 'Disconnected' : 'Connected'}
      </Text>
      <Text style={styles.text}>IP Address: {deviceNetwork.ipAddress ? deviceNetwork.ipAddress : "Fetching....."}</Text>
      <Text style={styles.text}>ConnectionType: {deviceNetwork.networkState?.type}</Text>
      <Text style={styles.text}>Carrier: {deviceNetwork.carrier? deviceNetwork.carrier : "Unavailable"}</Text>
    </View>
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
   flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily:"monospace",
   
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  text: {
    fontSize: 18,
    color:"white",
    fontFamily:"monospace"

  },
  /* Create a container element with flex display and wrap */
// .container {
//   display: flex;
//   flex-wrap: wrap;
// }

/* Create a box element with a shadow and a fixed width */
box: {
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)',/* horizontal, vertical, blur, color */
  width: '300px',
  margin: '10px',
  // backgroundColor:'green',
  // borderTopRightRadius:'20px',
},

/* Use media queries to change the flex property of the box element for different screen sizes */
'@media (max-width: 600px)': {
  /* For small screens, make the box element take 100% of the container width */
  box:{
    flex: "100%",
  }
},

'@media (min-width: 601px) and (max-width: 900px)': {
  /* For medium screens, make the box element take 50% of the container width */
  box: {
    flex: "50%",
  }
},

'@media (min-width: 901px)': {
  /* For large screens, make the box element take 33.33% of the container width */
  box:{
    flex: '33.33%'
  }
}

});

// Export NetworkInfo component
export default NetworkInfo;
