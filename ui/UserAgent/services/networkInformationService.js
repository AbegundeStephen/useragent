import NetInfo, {useNetInfo}  from "@react-native-community/netinfo"

const fetchNetworkInfo = async (cb) => {
    try {

      const netinfoState = await NetInfo.fetch();
      cb([netinfoState])
    }catch(error) {
      console.error("Error fetching network state", error.message)
    }
  }

  fetchNetworkInfo()

  const unsubscribe = NetInfo.addEventListener((state) => {
    cb([state]);
    // socket.emit("updatedNetworkInfo",state);
  });
  return () => {
    unsubscribe()
    socket.disconnect()
  };