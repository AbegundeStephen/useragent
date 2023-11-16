import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import NetworkInfo from './src/components/NetworkInfo.js';
import SafeAreaView from 'react-native-safe-area-view';


export default function App() {
 

  useEffect(() => {

  })
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <NetworkInfo/>
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
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
