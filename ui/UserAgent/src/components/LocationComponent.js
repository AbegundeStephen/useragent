import React, {useState,useEffect} from "react";
import { View, Text } from "react-native";
import {DataTable} from 'react-native-paper'
import { getCurrentLocation, fetchLocationChanges } from "../../services/locationService.js";


const LocationComponent = () => {
    const [currentLocation, setCurrentLocation] = useState(null)
    const socket = io("http://localhost:3000")

    useEffect(() => {
        const fetchLocation = () => {
            getCurrentLocation(setCurrentLocation())
            fetchLocationChanges(setCurrentLocation())
           

            // Update MongoDB database
            socket.emit("updateLocation", (updatedLocation) => {
                
            })
        }
        fetchLocation()
    },[currentLocation])
    return (
        <View>
            <Text>Device Location</Text>
            <DataTable>
                <DataTable.Header>
                <DataTable.Title>Latitude</DataTable.Title>
                <DataTable.Title>Longitude</DataTable.Title>
                </DataTable.Header>
                {currentLocation && (
                    <DataTable.Row>
                        <DataTable.Cell>{currentLocation.latitude}</DataTable.Cell>
                        <DataTable.Cell>{currentLocation.longitude}</DataTable.Cell>
                    </DataTable.Row>
                
                )}
            </DataTable>
        </View>
    )
}

export default LocationComponent
