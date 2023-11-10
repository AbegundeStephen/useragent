import DeviceDataModel from '../models/deviceModel.js'
import asyncHandler from 'express-async-handler'
import serverIo from '../index.js'



export const postDeviceData = asyncHandler(async(req,res) => {
        const {deviceInfo, deviceNetwork, deviceLocation} = req.body

        if(!deviceInfo || !deviceNetwork || !deviceLocation){
            res.status(400)
            throw new Error("Please provide all required fields")
        }

      try {
         const result = await DeviceDataModel.create({deviceInfo,deviceNetwork,deviceLocation})
         res.status(200).json({success: true, message:"Device Data Has Been Posted to the Database",result})
         serverIo.emit("postdevicedata", {result})
         console.log("Data saved successfully",result)
         return result
      }catch(error) {
         console.error("Error storing device information data", error.message)
         throw error
      }
    }
) 


export const fetchDeviceData = asyncHandler( async () => {

    try {
        const result = await DeviceDataModel.find()
        console.log("Retrieved Data", deviceInfo)
        return result
    }catch(error) {
        console.error("Error retrieving device info", error.message)
        throw error
    }
})

export const updateNetworkInfo = asyncHandler(async (req, res) => {
    try {
        const {deviceId,updatedNetworkInfo} = data
        const result = await DeviceDataModel.updateOne({deviceId},{$set: {updatedNetworkInfo}}, {upsert:true})
        console.log("NetworkInfo successfully updated", updatedNetworkInfo)
         if (result.nModified > 0) {
            serverIo.emit("updateNetworkInfo", {deviceId,updatedNetworkInfo})
            res.status(200).json({success:true, message:"Network Info Successfully Updated"})
         }else {
            res.status(400).json({success: false, message: "Network info not updated"})
         }
    }catch(error){
        console.error("Error updating network info",error.message)
        res.status(500).json({success:false, message:"Internal server error"})

    }
})


export const updateDeviceInfo = asyncHandler(async (req, res) => {
    try{
        const {deviceId, updatedDeviceInfo} = req.body
        const result = DeviceDataModel.updateOne({_id:deviceId}, {$set:{deviceInfo : updatedDeviceInfo}})
        if (result.nModified > 0) {
            serverIo.emit("updateDeviceInfo",{deviceId,updatedDeviceInfo})
            res.status(200).json({success:true,message:"Device info successfully updated"})
        }else {
            res.status(400).json({success: false, message: "Device Info Not Updated"})
        }


    }catch(error){
     console.error(error.message)
     res.status(500).json({ success: false, message: 'Internal Server Error' });

    }
})


export const updateLocation = asyncHandler(async (req,res) => {
    try{
        const {deviceId,updatedLocation} = req.body
        const result = await DeviceDataModel.findOne({_id:deviceId},{$set:{deviceLocation:updatedLocation}},{upset:true})
        console.log("Location Information Successfully updated", updatedLocation)
        if (result.nModified > 0) {
            
            res.status(200).json({success:true, message:"Location info successfully updated"})
        }else{
            res.status(400).json({success:false, message:"Location Info Not Updated"})
        }
    }catch(error){
        console.error(error.message)
        res.status(500).json({success: false, message:"Internal server Error"})
    }
})