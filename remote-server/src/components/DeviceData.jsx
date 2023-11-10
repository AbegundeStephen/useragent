import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'

const DeviceData = () => {

    // const [deviceData, setDeviceData] = useState(data)

    const deviceInfo = [
        
         
        {
          deviceId: "123456789",
          deviceName: "My Device",
          manufacturer: "BrandX",
          model: "ModelY",
          systemName: "Android",
          systemVersion: "10.0.1",
            isLowPowerMode: true,
          isBatterySaverMode:true
        }
    ]
    
          
      
       const deviceLocation= [
        {
          latitude: 37.7749,
          longitude: -122.4194,
        accuracy: 10,
          timestamp: 1672539541
        }
    ]
          
         const deviceNetwork = [
       {
          isConnected: true,
          connectionType: "wifi",
          cellularSignalStrength: 4,
          wifiSignalStrength: 70
        }
    ]
    
      
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try{
    //             const response = await axios.get("http://localhost:5000/api/devices/getdeviceinfo")
    //             setDeviceData(response.data)
    //         }catch(error) {
    //             console.error("Error fetching data", error)
    //         }
    //     }

    //     fetchData()
    // })

    const deviceInfoColumns = [
        {
            name: "Device Info",
            selector:"deviceInfo",
            // sortable:true
        },
    ]
       const deviceNetworkColumns= [ {
            name: "Network Info",
            selector:"deviceNetwork",
            // sortable:true
        }
    ]
        
    const deviceLocationColumns = [
        {
            name: "Location Info",
            selector:"deviceLocation",
            // sortable:true
        },
    ]
  return (
    <>
    <div>
        <DataTable
        title="Device Info"
        columns={deviceInfoColumns}
        data={deviceInfo}
        pagination
        />
        <DataTable
        title="Device Network"
        columns={deviceNetworkColumns}
        data={deviceNetwork}/>
        <DataTable
        title="Device Location"
        columns={deviceLocationColumns}
        data={deviceLocation}/>
    </div>
    </>
  )
}

export async function getServerSideProps() {
    const response = await axios.get("http://localhost:5000/api/devices/getdeviceinfo")
    const data = response.data

    return {
        props:{data}
    }
}
export default DeviceData