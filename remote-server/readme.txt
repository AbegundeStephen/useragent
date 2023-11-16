Certainly! To achieve this, we'll use Next.js for the server, MongoDB for data storage, and socket.io for real-time communication between the server and the remote viewer. Additionally, we'll use react-data-table-component for displaying data in a table and CSS for styling.

Step 1: Set up the Next.js server
Create a new Next.js project:

bash
Copy code
npx create-next-app nextjs-remote-server
cd nextjs-remote-server
Install required packages:

bash
Copy code
npm install express mongoose socket.io
Create a server.js file in the root directory:

javascript
Copy code
// server.js
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userAgentDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('*', (req, res) => {
  return nextHandler(req, res);
});

// Socket.io connection
io.on('connection', socket => {
  console.log('A user connected');

  // Fetch data from MongoDB and send to the client
  socket.on('getData', async () => {
    try {
      // Replace 'YourModel' with the actual Mongoose model for your data
      const data = await YourModel.find().lean();
      socket.emit('updateData', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${PORT}`);
});
Replace 'YourModel' with the actual Mongoose model you used to store data.

Update package.json to start the server:

json
Copy code
"scripts": {
  "dev": "node server.js",
  "build": "next build",
  "start": "NODE_ENV=production node server.js"
}
Start the server:

bash
Copy code
npm run dev
This will start the Next.js server with Socket.io support.

Step 2: Create the Remote Viewer with React
Install required packages:

bash
Copy code
npm install react react-dom socket.io-client react-data-table-component
Create a pages/index.js file:

javascript
Copy code
// pages/index.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import DataTable from 'react-data-table-component';

const socket = io('http://localhost:3000');

const columns = [
  {
    name: 'Device ID',
    selector: 'deviceId',
    sortable: true,
  },
  {
    name: 'Model',
    selector: 'model',
    sortable: true,
  },
  // Add more columns based on your data structure
];

const RemoteViewer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch initial data when the component mounts
    socket.emit('getData');

    // Listen for data updates
    socket.on('updateData', newData => {
      setData(newData);
    });

    return () => {
      // Clean up socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Remote Viewer</h1>
      <DataTable title="Device Information" columns={columns} data={data} />
    </div>
  );
};

export default RemoteViewer;
Style the component with CSS:

Create a styles/globals.css file for global styles:

css
Copy code
/* styles/globals.css */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
Import the global styles in pages/_app.js:

javascript
Copy code
// pages/_app.js
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
You can also add more CSS styling as needed.

Start the Next.js app:

bash
Copy code
npm run dev
Visit http://localhost:3000 in your browser to see the remote viewer.

Now, as data changes in the MongoDB database, the server will emit updates to connected clients, and the Remote Viewer will receive and display the updated data in real-time using Socket.io and react-data-table-component. Adjust the code based on your actual data structure and styling preferences.