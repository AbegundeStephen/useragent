import NetInfo from '@react-native-community/netinfo';

class NetworkInfoService {
  constructor() {
    this.isConnected = null;
    this.type = null;
    this.subscribe = null;
  }

  // Initialize the network info service
  init = (cb) => {
    // Subscribe to network state changes
      this.subscribe = NetInfo.addEventListener(state => {
        console.log("NetInfo state", state)
       cb(state)
      this.updateNetworkState(state.isConnected, state.type);
    });

    // Get the initial network state
    this.updateNetworkState();
  };


  // Update the local state with the latest network state
  updateNetworkState = (isConnected, type) => {
    this.isConnected = isConnected;
    this.type = type;
    // You can update the React component's state or trigger any other actions here
  };

  // Clean up the subscribe when the component unmounts
  unsubscribe = () => {
    if (this.subscription) {
      this.subscription();
    }
  };
}

const networkInfoService = new NetworkInfoService();
export default networkInfoService;
