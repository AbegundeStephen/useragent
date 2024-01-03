import mongoose, { Mongoose } from "mongoose";
import {v4} from "uuid"

const DeviceInfoSchema = mongoose.Schema({
    deviceName: {
        type: String,
        required:true
        
    },
    brand: {
        type: String,
        required:true
        
    },
    osName: {
        type: String,
        required:true
        
    },

    osVersion: {
        type: Number,
        required:true

    },
    androidId: {
        type: String,
        required:true
    },
    androidVersion:{
        type: Number,
        required:true
    },
    totalMemory:{
        type:Number,
        required:true
    },
    uptime:{
        type:String,
        required:true,
        defeault:null
    },
  



    
})
 const BateryDataSchema = mongoose.Schema({
    batteryState:{
        type:String
    },
    batteryLevel:{
        type:String
    }
 })

const LocationDataSchema = mongoose.Schema({
    deviceLocation:{
        type: Object,
        required: true
    },
    deviceAddress: {
        type: String,
        required:true
    }
    })

 const NetworkDataSchema = mongoose.Schema({
    networkState:{
        type: Object,
        required: true,
    },
    ipAddress:{
        type: String,
      
        default:null
    },
    carrier:{
        type: String,
        default:null
      
    }
    
 })


 const DeviceDataModel = mongoose.Schema({
    deviceId :String,
      

    deviceInfo:{
        type: Object,
        required: true
    },
    deviceBattery: {
        type:  BateryDataSchema,
        required:true
    },
    deviceLocation:{
        type: LocationDataSchema,
        required: true
    },
     deviceNetwork: {
        type: NetworkDataSchema,
        required: true
     }
 },{timestamps:true})

//  DeviceDataModel.pre("save", async function(next) {
//     if(!this.deviceId) {
//         this.deviceId = await v4()
//     }
//     next()
//  })

 export default mongoose.model("Devices", DeviceDataModel)

