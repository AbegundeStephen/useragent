import React, { Component, useEffect } from 'react'
import {useState } from 'react'
import DataTable from 'react-data-table-component'
import styles from './DeviceData.module.css'
import Navbar from '../Navbar/Navbar'
import { customStyles } from '@/customstyles'
import axios from 'axios'
import { deviceDataColumnsFromApi } from '@/deviceData/deviceDataUtils.js'


const DeviceData = () => {

    const [selectedCell, setSelectedCell] = useState(null)
    const [data,setData]= useState([])
    const [mapData,setMappedData]= useState([])
    const [fetched,setFetched] = useState(false)

    

   const tableProps = {
        selectableRows:'multiple',
        highlightOnHover:true,
        pointerOnHover:true,
        striped:true,
        pagination:true,
        paginationPerPage:8,
        responsive:true
   }

useEffect(() => {
  setFetched(false)
  const loadData = async () => {
    const response = await axios.get("https://useragent-api.onrender.com/api/v1/useragent/devices/alldevices");
    setData(response.data)
    setFetched(true)
  }
  loadData()
},[])
    
const mappedData = data.allData?.map(item => ({
  id:item._id,
  deviceName:item.deviceInfo.deviceInfo?.deviceName,
  deviceId:item.deviceId,
  batteryLevel:item.deviceBattery?.batteryLevel,
  batteryState:item.deviceBattery?.batteryState,
  isCharging:item.isCharging,
  ipAddress: item.deviceNetwork?.ipAddress,
  macAddress:item.macAddress,
  androidVersion:item.androidVersion,
  phoneNumber: item.phoneNumber,
  carrier:item.deviceNetwork?.carrier,
  isConnected:item.isConnected,
  connectionType:item.deviceNetwork.networkState?.type,
  isInternetReacheable:item.isInternetReacheable,
  location:item.deviceLocation?.deviceAddress

})
);

// useEffect(() => {
//   if (fetched) {
//  const newData= mapApiData(data)
//  setMappedData(newData)
//   }else {
//     console.log("Data has not been fetched")
//   }
// })

console.log("Data from component: "+JSON.stringify(data,null,1))
  return (
    <>
    <div>
        <Navbar/>
        <div className={styles.tableContainer}>
        <DataTable
        className={styles.reactDataTableComponent}
        title="Devices Table"
        columns={deviceDataColumnsFromApi}
        data={mappedData}
        customStyles={customStyles}
        {...tableProps}
       />
       {
        selectedCell && (
            <div className='hover-display'>
                <p>{selectedCell}</p>
            </div>
        )
       }
       </div>
    </div>
    </>

  )
}


export default DeviceData