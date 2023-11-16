import mongoose, { Mongoose } from "mongoose";
import {v4} from "uuid"






// const DeviceDataModel = mongoose.Schema({
//     // deviceId :{
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     // required:true,
//     //     // unique:true,
//     // },
//     deviceInfo:{
//         type: Object,
//         required:true,
        
//     },
//     deviceNetwork: {
//         type:Object
//     },
//     deviceLocation:{
//         type:Object,
//         required:true,
//     }
// },{timestamps:true})

// // DeviceDataModel.pre('save', function(next) {
// //     if (!this.deviceId) {
// //         this.deviceId = DeviceInfo.getUniqueId();
// //     }
// //     next()
// // })

// export default mongoose.model("Devices", DeviceDataModel)





const DeviceInfoSchema = mongoose.Schema({
    deviceId:{
        type: String,
        required: true
    },

    deviceName: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },

    batteryLevel: {
        type: Number,

    },
    batteryStatus: {
        type: String,
    },

    isCharging: {
        type: Boolean,
    },
    isBatterySaverMode: {
        type: Boolean,
        required: true
    },

    isLowPowerMode: {
        type: Boolean,
        required: true
    },

    systemName:{
        type: String,
        required: true
    },
    systemVersion:{
        type: String,
        required: true
    }


})


const LocationDataSchema = mongoose.Schema({
    latitude: {
        type: Number,
        required:  true,
    },

    longitude:{
        type: Number,
        required: true,
    },

    accuracy: {
        type: Number,
    },

    timestamps: {
        type: Date,
        default:Date.now,
    },

    })

 const NetworkDataSchema = mongoose.Schema({
    isConnected:{
        type: Boolean,
        required: true,
    },

    connectionType:{
        type:String,
        required:true
    },
    

    cellularSignalStrength:{
        type: Number
    },

    wifiSignalStrength: {
        type: Number
    },

    connectiondetails: {
        type: Object,
        required:true
    }
    
 })


 const DeviceDataModel = mongoose.Schema({
    deviceId :{
        type: String,
        // unique:true,
        default:v4()
        
    },
    deviceInfo:{
        type: DeviceInfoSchema,
        required: true
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

 DeviceDataModel.pre("save", async function(next) {
    if(!this.deviceId) {
        this.deviceId = await v4()
    }
    next()
 })

 export default mongoose.model("Devices", DeviceDataModel)






// const DeviceDataModel = mongoose.Schema({
//     deviceInfo: {
//         deviceId: String,
//         deviceName: String,
//         manufacturer: String,
//         model: String,
//         systemName: String,
//         systemVersion: String
//     },

//     deviceLocation: {
//         latitude: Number,
//         longitude: Number,
//         accuracy: Number,
//         timestamp: Number
//     },

//     deviceNetwork: {
//         isConnected: Boolean,
//         connectionType: String,
//         cellularSignalStrength: Number,
//        wifiSignalStrength: Number
//   },

// }, {timestamp:true})

// export default mongoose.model("Devices", DeviceDataModel)