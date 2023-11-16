import React, { Component } from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import deviceData from '@/deviceData/deviceData.js'
import { mappedData } from '@/deviceData/deviceData.js'
import styles from './DeviceData.module.css'
import Navbar from '../Navbar/Navbar'


const DeviceData = () => {

     const [selectedCell, setSelectedCell] = useState(null)
  
    const deviceDataColumns = [
        { name: "deviceId",selector:row=>row.deviceId},
        { name: "deviceName", selector:row=>row.deviceName},
        {name:"location", selector:row=>row.location},
        { name: "isCharging",selector:'isCharging',sortable:true,cell:row=><div><div className={`${row.isCharging ? styles.booleanTrue : styles.booleanFalse}`}>{row.isCharging? "True" : "False"}</div></div>},
        { name: "batteryLevel", selector:row=>row.batteryLevel},
        {name:"ipAddress",selector:row=>row.ipAddress},
        {name:"macAddress", selector:row=>row.macAddress},
        {name:"androidVersion", selector:row=>row.androidVersion},
        {name:"phoneNumber", selector:row=>row.phoneNumber},
        {name:"carrier",selector:row=>row.carrier},
        {name:"isConnected",selector:"isCOnnected", sortable:true, cell:row=><div className={`${row.isConnected ? styles.booleanTrue : styles.booleanFalse}`} onClick={() => setSelectedCell(row.isConnected)}>{row.isConnected? "True" : "False"}</div>},
        {name:"isInternetReacheable",selector:"isInterNetreacheable", cell:row=><div><div className={`${row.isConnected ? styles.booleanTrue : styles.booleanFalse}`}>{row.isConnected? "True" : "False"}</div></div>},
        {name:"connectionType", selector:row=>row.connectionType},
        

    ]
  
    const customStyles = {
        container: {
            style: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth:'500px',
                   }
        },
        header: {
            style: {
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginTop: 10,
                    marginBottom: 10,
                    textAlign:'center',
                    textTransform:'uppercase',
                    '@media(max-width:767px)':{fontSize:'1rem'},
                    '@media(max-width:740px)':{fontSize:'0.8rem'},
                 }
        },
        rows: {
            style:{
                minHeight:'42px',
                fontStyle:'sans-serif'
            }
        },
        cells: {
            style: {
                backgroundColor: "#1c1b1b",
                color:"#fff"
            }
        },
        headCells:{
            style: {
                color:"#4caf50",
                textTransform:'uppercase',
                fontSize:"12px",
                fontWeight:'bold'
            }
        },

    }

   const tableProps = {
        selectableRows:'multiple',
        highlightOnHover:true,
        pointerOnHover:true,
        striped:true,
        pagination:true,
        paginationPerPage:8,
        responsive:true
   }
console.log(selectedCell)
    
  return (
    <>
    <div>
        <Navbar/>
        <div className={styles.tableContainer}>
        <DataTable
        className={styles.reactDataTableComponent}
        title="Devices Table"
        columns={deviceDataColumns}
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