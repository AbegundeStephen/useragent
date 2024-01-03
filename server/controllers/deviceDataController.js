import DeviceDataModel from '../models/deviceModel.js'
import asyncHandler from 'express-async-handler'
import {io} from '../index.js'




export const postDeviceData = asyncHandler(async(req,res) => {
        const {deviceId,deviceInfo,deviceBattery,deviceNetwork,deviceLocation} = req.body

        if(!deviceId || !deviceInfo || !deviceBattery || !deviceNetwork || !deviceLocation){
            res.status(400)
            throw new Error("Please provide all required fields")
        }

      try {
         const result = await DeviceDataModel.create({deviceId,deviceInfo,deviceBattery,deviceNetwork,deviceLocation})
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
        const {deviceId,updatedNetwork} = req.body
        console.log(deviceId)
      

        const devicedata = await DeviceDataModel.findOne({deviceId})
    
        if(!devicedata) {
            res.status(404)
            throw Error("No Device Data matches the provided id")

        }

        const newNetInfo = await DeviceDataModel.updateOne({deviceId}, {$set:{deviceNetwork:updatedNetwork}},{new:true, runValidators: true,})
             if (newNetInfo.modifiedCount > 0) {
                res.status(200).json({success:true,message:"Network state updated succesfully"})
        
        
    } else {
        res.status(400).json({success:false,message:'Error Updating Device Network info'})
    }
 
    }catch(error){
        console.error("Error updating network info",error.message)
        res.status(500).json({success:false, message:"Internal server error"})
    

    }
})

export const updateBatteryLevel = asyncHandler(async(req,res) => {
    try{
        const {deviceId,batteryLevel} = req.body
        const deviceData = await DeviceDataModel.findOne({deviceId})

        if(!deviceData) {
            res.status(404)
            throw Error ("No device data matches the provided filter parameter")
        }

        const result = await DeviceDataModel.updateOne({deviceId}, {$set:{"deviceBattery.batteryLevel":batteryLevel}},{new:true, runValidators: true,upsert:true})
        if (result.modifiedCount > 0) {
            // Emit socket event for real-time update
            io.emit('dataUpdate', { deviceId,batteryLevel});
            res.status(200).json({ success: true, message: 'Battery level updated successfully' });
          } else {
            res.status(404).json({ success: false, message: 'Device not found' });
          }
      
    }catch(error){
        console.log(error)
    }
})

export const updateBatteryState = asyncHandler(async(req,res) => {
    try{
        const {deviceId,batteryState} = req.body
        const deviceData = await DeviceDataModel.findOne({deviceId})

        if(!deviceData) {
            res.status(404)
            throw Error ("No device data matches the provided filter parameter")
        }

        const result = await DeviceDataModel.updateOne({deviceId}, {$set:{"deviceBattery.batteryState":batteryState}},{new:true, runValidators: true,upsert:true})
        if (result.modifiedCount > 0) {
            // Emit socket event for real-time update
            io.emit('dataUpdate', { deviceId,batteryState });
            res.status(200).json({ success: true, message: 'Battery state updated successfully' });
          } else {
            res.status(404).json({ success: false, message: 'Device not found' });
          }
      
    }catch(error){
        console.log(error)
    }
})


export const updateDeviceInfo = asyncHandler(async (req, res) => {
    try {
        const {deviceId,updatedDeviceInfo} = req.body
    
        const devicedata = await DeviceDataModel.findOne({deviceId})
        if(!devicedata) {
            res.status(404)
            throw Error("No Device Data matches the provided identifier")

        }

        const newDeviceInfo = await DeviceDataModel.updateOne({deviceId}, {$set:{deviceInfo:updatedDeviceInfo}},{new:true, runValidators: true,upsert:true})
        if (newDeviceInfo) {
            io.emit("updateLocation", {deviceId,newDeviceInfo}, () => {
            })
             res.status(200).json({newDeviceInfo})
        
        
    } else {
        res.status(400).json({success:false,message:'Error Updating Device info'})
    }
 
    }catch(error){
        console.log("Error updating network info",error.message)
        res.status(500).json({success:false, message:"Internal server error"})

    }
})


export const updateLocation = asyncHandler(async (req,res) => {
    try {
        const {deviceId,updatedLocation} = req.body
      

        const devicedata = await DeviceDataModel.findOne({deviceId})
        if(!devicedata) {
            res.status(404)
            throw Error("No Device Data matches the provided identifier")

        }

        const newLocation = await DeviceDataModel.updateOne({deviceId}, {$set:{"deviceLocation.deviceLocation":updatedLocation.deviceLocation, "deviceLocation.address":updatedLocation.address}},{new:true, runValidators: true})
        if (newLocation.modifiedCount) {
            io.emit("dataUpdate", {deviceId,updatedLocation})
            res.status(200).json({success:true,message:"Location updated successfully"})
        
        
    } else {
        res.status(400).json({success:false,message:'Error Updating Device Location info'})
    }
 
    }catch(error){
        console.log("Error updating network info",error.message)
        res.status(500).json({success:false, message:"Internal server error"})

    }
})

export const fetchDeviceData = asyncHandler( async (req, res) => {

    try {
        const deviceId = req.body
        const deviceData = await DeviceDataModel.findOne(deviceId)
        res.status(200).json({success:true,message:"Device data fetched successfully"})
        return deviceData
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