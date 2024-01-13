// pages/api/data.js
import { connectDB } from '../../../db.js';
import DeviceDataModel from '../../../../server/models/deviceModel.js'
import {Server} from 'socket.io-client'


// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const ioHandler = (req, res) => {
//   if (!res.socket.server.io) {
//     console.log('Setting up socket.io');
//     const io = new Server(res.socket.server);
//     io.on('connection', (socket) => {
//       console.log('Client connected');
//     });
//     res.socket.server.io = io;
//   }

//   return app(req, res);
// };

// const app = async (req, res) => {
//   await db;

//   try {
//     const data = await YourModel.find();
//     res.status(200).json(data);
//     res.socket.server.io.emit('dataUpdate', data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export default ioHandler;

connectDB()

export default async function handler(req,res) {
    try {
        const deviceData = await DeviceDataModel.find()
        res.status(200).json({deviceData})
    }catch(err) {
        console.error('Error fetchind data: ' + err)
        res.status(500).json({error: 'Internal server error'})
    }
}

