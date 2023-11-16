import DeviceDataModel from '../models/deviceModel.js'
import asyncHandler from 'express-async-handler'
import {io} from '../index.js'




export const postDeviceData = asyncHandler(async(req,res) => {
        const {deviceInfo, deviceNetwork, deviceLocation} = req.body

        if(!deviceInfo || !deviceNetwork || !deviceLocation){
            res.status(400)
            throw new Error("Please provide all required fields")
        }

      try {
         const result = await DeviceDataModel.create({deviceInfo,deviceNetwork,deviceLocation})
         res.status(200).json({success: true, message:"Device Data Has Been Posted to the Database",result})
         io.emit("postdevicedata", {result})
         console.log("Data saved successfully",result)
         return result
      }catch(error) {
         console.error("Error storing device information data", error.message)
         throw error
      }
    }
) 


export const updateNetworkInfo = asyncHandler(async (req, res) => {

    try {
        const {id,updatedNetwork} = req.body
      

        const devicedata = await DeviceDataModel.findById(id)
        if(!devicedata) {
            res.status(404)
            throw Error("No Device Data matches the provided id")

        }

        const newNetInfo = await DeviceDataModel.updateOne({_id:id}, {$set:{deviceNetwork:updatedNetwork}},{new:true, runValidators: true,upsert:true})
             if (newNetInfo.modifiedCount > 0) {
                console.log("Network Info Succesfully Updated")
                io.emit("updateNetworkInfo", {id,newNetInfo})
                res.status(200).json({newNetInfo})
        
        
    } else {
        res.status(400).json({success:false,message:'Error Updating Device Network info'})
    }
 
    }catch(error){
        console.error("Error updating network info",error.message)
        res.status(500).json({success:false, message:"Internal server error"})
    

    }
})


export const updateDeviceInfo = asyncHandler(async (req, res) => {
    try {
        const {id,updatedDeviceInfo} = req.body
      

        const devicedata = await DeviceDataModel.findById(id)
        if(!devicedata) {
            res.status(404)
            throw Error("No Device Data matches the provided id")

        }

        const newDeviceInfo = await DeviceDataModel.findByIdAndUpdate({_id:id}, {$set:{deviceInfo:updatedDeviceInfo}},{new:true, runValidators: true,upsert:true})
        if (newDeviceInfo) {
            console.log("Device Info Succesfully Updated")
            io.emit("updateLocation", {id,newDeviceInfo}, () => {
                console.log("Socket is working",id,newDeviceInfo.deviceInfo)
            })
             res.status(200).json({newDeviceInfo})
        
        
    } else {
        res.status(400).json({success:false,message:'Error Updating Device Network info'})
    }
 
    }catch(error){
        console.error("Error updating network info",error.message)
        res.status(500).json({success:false, message:"Internal server error"})

    }
})


export const updateLocation = asyncHandler(async (req,res) => {
    try {
        const {id,updatedLocation} = req.body
      

        const devicedata = await DeviceDataModel.findById(id)
        if(!devicedata) {
            res.status(404)
            throw Error("No Device Data matches the provided id")

        }

        const newLocation = await DeviceDataModel.updateOne({_id:id}, {$set:{deviceLocation:updatedLocation}},{new:true, runValidators: true})
        if (newLocation.modifiedCount) {
            console.log("Device Location Succesfully Updated")
            io.emit("updateLocation", {id,newLocation})
            res.status(200).json({newLocation})
        
        
    } else {
        res.status(400).json({success:false,message:'Error Updating Device Network info'})
    }
 
    }catch(error){
        console.error("Error updating network info",error.message)
        res.status(500).json({success:false, message:"Internal server error"})

    }
})

export const fetchDeviceData = asyncHandler( async (req, res) => {

    try {
        const id = req.body
        const deviceData = await DeviceDataModel.findById({id})
        console.log("Retrieved Data for the provided id is", deviceData)
        res.status(200).json({result})
    }catch(error) {
        console.error("Error retrieving device data", error.message)
        throw error
    }
})

export const fetchAllData = asyncHandler(async (req, res) => {
    try {
        const allData = await DeviceDataModel.find()
        console.log(allData)
        res.status(200).json({success:true ,message:"All Devices Data in the Database Successfully Fetched", allData})
        return allData

    }catch(error) {
        console.error("Errror fetching all device data")
        throw Error(error.message)
    }
})