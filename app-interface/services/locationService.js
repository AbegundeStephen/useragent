import * as Location from 'expo-location';

class LocationService {
  constructor() {
    this.location = null;
    this.subscription = null;
  }

  // Initialize the location service
  init = async () => {
    // Check and request location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Location permission not granted');
      return;
    }

    // Subscribe to location changes
    this.subscription = Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
      this.updateLocation
    );

    // Get the initial location
    this.updateLocation();
  };

  // Update the local state with the latest location
  updateLocation = async () => {
    const currentLocation = await Location.getCurrentPositionAsync({});
    this.location = currentLocation.coords;
    // You can update the React component's state or trigger any other actions here
  };

  // Clean up the subscription when the component unmounts
  unsubscribe = () => {
    if (this.subscription) {
      this.subscription.remove();
    }
  };
}

const locationService = new LocationService();
export default locationService;
