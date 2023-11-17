import React, { Component } from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { mappedData } from '@/deviceData/deviceDataUtils.js'
import styles from './DeviceData.module.css'
import Navbar from '../Navbar/Navbar'
import DataTableCell from '../datacell/Datacell'
import { customStyles } from '@/customstyles'
import { deviceDataColumns } from '@/deviceData/deviceDataUtils.js'


const DeviceData = () => {

    const [selectedCell, setSelectedCell] = useState(null)

    

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