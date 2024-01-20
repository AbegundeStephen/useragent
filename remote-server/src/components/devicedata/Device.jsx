import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import {useLocation} from'react-router-dom'

const Device = () => {
    const location =useLocation()
    const id = location.pathname.split("/")[1]
    console.log("Id from url: "+id)
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = axios.get(`https://useragent-api.onrender.com/api/v1/useragent/devices/getdeviceinfo/${id}`)
        }
    })
  return (
    <div>Device</div>
  )
}

export default Device