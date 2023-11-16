import React from "react";
import { useState,useEffect } from "react";
// import { getDeviceInfo } from "../../services/deviceInfoService";
import NetInfo from "@react-native-community/netinfo"
import {View,Text} from 'react-native'
import {DataTable} from "react-native-paper";


const NetworkInfo = () => {
    const [networkInfo, setNetworkInfo] = useState([])
    console.log(networkInfo)

    useEffect(() => {
      const fetchNetworkInfo = async () => {
        try {
          const netinfoState = await NetInfo.fetch();
          setNetworkInfo([netinfoState])
        }catch(error) {
          console.error("Error fetching network state", error.message)
        }
      }

      fetchNetworkInfo()

      const unsubscribe = NetInfo.addEventListener((state) => {
        setNetworkInfo([state]);
        // socket.emit("updatedNetworkInfo",state);
      });
      return () => {
        unsubscribe()
        socket.disconnect()
      };
    },[])

  return ( 
    <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Type</DataTable.Title>
            <DataTable.Title>Connected</DataTable.Title>
            <DataTable.Title>Internet</DataTable.Title>
          </DataTable.Header>
          {networkInfo.map((info,index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{info.type}</DataTable.Cell>
              <DataTable.Cell>{info.isConnected}</DataTable.Cell>
              <DataTable.Cell>{info.isInternetReachable}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
    </View>
  )
}

export default NetworkInfo