// components/Table.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your server URL

const Table = ({ data }) => {
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    socket.on('dataUpdate', (updatedData) => {
      setTableData(updatedData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    // ... (same as before)
  );
};

export default Table;
