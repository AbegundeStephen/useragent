import {Router} from 'express'
import { postDeviceData, fetchDeviceData, updateLocation,updateNetworkInfo,updateDeviceInfo } from '../controllers/deviceDataController.js'
import auth from '../authMiddleware/auth.js'

const deviceRoutes = Router()

deviceRoutes.post("/postdevicedata", postDeviceData)
deviceRoutes.get("/getdeviceinfo", auth,fetchDeviceData)
deviceRoutes.patch("/updatelocation", updateLocation)
deviceRoutes.patch("/updatenetinfo", updateNetworkInfo)
deviceRoutes.patch("/updatdeviceinfo", updateDeviceInfo)

export default deviceRoutes