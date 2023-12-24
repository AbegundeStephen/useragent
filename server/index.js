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



const app = express()
const server = http.createServer(app)
const io =  new Server(server)
// console.log(io)

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(cors())



app.use("/api/v1/useragent/devices", deviceRoutes)
app.use("/api/users", userRoutes)
 
 app.get("/*", (req, res) => {
    res.send("Home Page")
    res.redirect("/useragent/api/v1/devices")
 })

app.use((req,res, next) => {
    req.io = io
    next()
})
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Headers","*")
})
app.use(error)



 const PORT = process.env.PORT

 mongoose
 .connect("mongodb://localhost:27017/user-agent", 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error.message)
    })


    io.on('connection', (socket) => {
        console.log("A user connected")
    //     socket.on("postdevicedata", (devidedata) => {
    //     io.emit("postdevicedta",devidedata);
    //         console.log(devidedata)
    // })
        // Handle network information update
        socket.on("updateNetworkInfo",(newNetworkInfo) => {
            // Update Mongodb NetworkData with networkInfo
            console.log("network updted")
            io.emit("updateNetworkInfo", newNetworkInfo)
        });
    
        socket.on("updateLocation", (newLocation) => {
            console.log("Updating New Location", newLocation)
            io.emit("updateLocation", newLocation)
      });
    
      socket.on("updateDeviceInfo", (newDeviceInfo) => {
        console.log("Updating Device Info", newDeviceInfo)
        io.emit("updatedDeviceInfo", newDeviceInfo)
      })
    
        socket.on("disconnect", () => {
            console.log("A User Disconnected")
        })
     })
    

    export {io}

