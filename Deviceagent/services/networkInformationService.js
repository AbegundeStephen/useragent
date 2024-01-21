// Import expo-network library
import * as Network from 'expo-network';
import * as Cellular from 'expo-cellular'
import { updateExistingData } from '../axiosServices/deviceDataServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_NETWORK_STATE } from '../redux/networkSlice';
import { store } from '../redux/store';



// Define networkInformation classs 
class networkInformation {
  // Define constructor
  constructor() {
    // Initialize network state, ip address and mac address properties
    this.networkState = null;
    this.ipAddress = null;
    this.carrier = null;
    this.isConnected = null;
    // this.macAddress = null;

    this.getNetworkState()
    
  }

  async getId() {
    let id = await AsyncStorage.getItem("deviceId")
    this.mobileId = id
  }

  // Define async method to get network state, ip address and mac address
  async getNetworkState() {
    // Try to get network state using Network.getNetworkStateAsync()
    try {
      let networkState = await Network.getNetworkStateAsync();
      // dispatch(SET_NETWORK_STATE(networkState))

      // Assign network state to property
      this.networkState = networkState;
      this.isConnected = networkState.isConnected
      console.log("network state",networkState,this.isConnected)
      return networkState
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }
  // Try and get the network carrier
  async getNetworkCarrier() {
   try {

    let carrier = await Cellular.getCarrierNameAsync()
    console.log('carrier: ', carrier)
    return this.carrier = carrier

    

   }catch (error) {

    console.error("Failed to get carrier", error.message)
    return this.carrier

   }
  }
  

  //Try and get ipaddress
  async getIpAddress() {
    try {
      let ipAddress = await Network.getIpAddressAsync();
      // Assign ip address to property
      this.ipAddress = ipAddress;
      console.log("ipAddress", ipAddress)
      return ipAddress
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }

  // Define method to subscribe to network state changes using Network.addNetworkStateListener()
  async subscribeToNetworkChanges() {
  
    // Define callback function to handle network state changes
    let callback = (networkState) => {
      // Update network state property
      // store.dispatch(SET_NETWORK_STATE(networkState))
      this.networkState = networkState;
      // Log network state changes
      console.log('Network state changed:', networkState);
    };
    // Add network state listener and return the subscription object
    let newState = await Network.getNetworkStateAsync(callback);
    store.dispatch(SET_NETWORK_STATE(newState))
    console.log("New network state:", newState);
    let mobileId = await AsyncStorage.getItem("mobileId")
    // let deviceId = localStorage.getItem("deviceId")
    console.log("deviceId: "+ this.mobileId)
    if (mobileId) {
      let updatedNetwork1 = {
          deviceId:mobileId,
          updatedNetwork:{
          networkState: newState,
          ipAddress:await this.getIpAddress(),
          carrier: await this.getNetworkCarrier()
          }
      }
      console.log("updated network1: "+JSON.stringify(updatedNetwork1,null, 2))
      try{
        let updatedNetwork= JSON.stringify(updatedNetwork1)
         console.log("updated Network: "+ updatedNetwork)
      const data = await updateExistingData(updatedNetwork1,'update network')
        console.log("networkState updated succesfully: " +JSON.stringify(data))
      }catch(error){
        console.log("Unable to update network,no mobileId: " + error)
      }

      
    }
    return newState
  }

  //Define method to unsubscribe from network state changes using subscription.remove()
  // unsubscribeFromNetworkChanges(subscription) {
  //   // Remove network state listener
  //   subscription.remove()
  //}
}

export {networkInformation}
