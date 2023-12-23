import {Router} from 'express'
import { postDeviceData, fetchDeviceData, updateLocation,updateNetworkInfo,updateDeviceInfo,updateBatteryLevel,updateBatteryState, fetchAllData } from '../controllers/deviceDataController.js'
import auth from '../authMiddleware/auth.js'

const deviceRoutes = Router()

deviceRoutes.post("/postdevicedata", postDeviceData)
deviceRoutes.get("/getdeviceinfo", fetchDeviceData)
deviceRoutes.get("/alldevices", fetchAllData)
deviceRoutes.patch("/updatelocation", updateLocation)
deviceRoutes.patch("/updatenetinfo", updateNetworkInfo)
deviceRoutes.patch("/updatedeviceinfo", updateDeviceInfo)
deviceRoutes.patch("/updatebatterylevel",updateBatteryLevel)
deviceRoutes.patch("/updatebatterystate",updateBatteryState)

export default deviceRoutes