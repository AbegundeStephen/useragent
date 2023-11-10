import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import deviceRoutes from './routes/deviceRoutes.js'
import userRoutes from './routes/userRoutes.js'
import error from './authMiddleware/error.js'
import 'dotenv/config.js'
import { updateNetworkInfo } from './controllers/deviceDataController.js'


const app = express()
const server = http.createServer(app)
const serverIo =  new Server(server)

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:3000"],
    credentials: true,
}))



app.use("/api/devices", deviceRoutes)
 app.use("/api/users", userRoutes)
 
 app.get("/*", (req, res) => {
    res.send("Home Page")
    res.redirect("/useragent/api/v1/devices")
 })


 app.use(error)

 const PORT = process.env.PORT || 5000

 serverIo.on('connection', (socket) => {
    console.log("A user connected")
socket.on("postdevicedata", (devidedata) => {

    console.log(devidedata)
})
    // Handle network information update
    socket.on("updateNetworkInfo",(networkInfo) => {
        // Update Mongodb NetworkData with networkInfo
        const data = {
            deviceId:"34rrfg",
            isConnected: true,
            connectionType:"cellular",
            connectioDetaials: {}
        }
        networkInfo = data
        updateNetworkInfo(networkInfo)
        console.log("updating Mongodb Network Data", networkInfo)
    });

    socket.on("updateLocation", (newLocation) => {
        consolelog("Updating New Location", newLocation)
  });

  socket.on("updateDeviceInfo", (updatedDeviceInfo) => {
    console.log("Updating Device Info", updatedDeviceInfo)
  })

    socket.on("disconnect", () => {
        console.log("A User Disconnected")
    })
 })

 mongoose
 .connect("mongodb://localhost:27017/user-agent", 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error.message)
    })


    export default {serverIo}

