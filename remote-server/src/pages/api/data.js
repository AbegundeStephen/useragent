import mongoose from 'mongoose'

mongoose
.connect("mongodb://localhost:27017/user-agent", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

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
        type: String,
    },

    cellularSignalStrength:{
        type: Number
    },

    wifiSignalStrength: {
        type: Number
    }
 })


 const DeviceDataModel = mongoose.Schema({
    deviceId :{
        type: mongoose.Schema.Types.ObjectId
        
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


 const DataModel = mongoose.model("Devices", DeviceDataModel)


 export default async (req, res) => {
    try {
        const deviceData = await DataModel.find({});
        res.status(200).json({deviceData});
    }catch(error) {
        console.log("Error Fetching data"), error
        res.status(500).json({messsage:"Internal Server Error"})
    }
 }
