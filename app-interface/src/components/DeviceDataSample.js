import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DataTable from 'react-native-data-table';


const DeviceDataTable = ({ deviceInfoData, locationData, networkData }) => {
  const deviceInfoColumns = [
    { name: 'Device ID', selector: 'deviceId' },
    { name: 'Device Name', selector: 'deviceName' },
    // Add more columns based on your device information data structure
  ];

  const locationColumns = [
    { name: 'Latitude', selector: 'latitude' },
    { name: 'Longitude', selector: 'longitude' },
    // Add more columns based on your location data structure
  ];

  const networkColumns = [
    { name: 'Is Connected', selector: 'isConnected' },
    { name: 'Connection Type', selector: 'connectionType' },
    // Add more columns based on your network data structure
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Device Information</Text>
      <DataTable
        columns={deviceInfoColumns}
        data={deviceInfoData}
      />

      <Text style={styles.header}>Location Data</Text>
      <DataTable
        columns={locationColumns}
        data={locationData}
      />

      <Text style={styles.header}>Network Data</Text>
      <DataTable
        columns={networkColumns}
        data={networkData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
});

export default DeviceDataTable;


