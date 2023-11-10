import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NetworkInfo from './src/components/NetworkInfo.js';
import { getLocation } from './services/locationService';
import { getDeviceInfo } from './services/deviceInfoService';
import LocationComponent from './src/components/LocationComponent.js';

export default function App() {
  return (
    <View style={styles.container}>
      <NetworkInfo/>
      {/* <LocationComponent/> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
