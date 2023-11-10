import DeviceInfo from "react-native-device-info";


export const getDeviceInfo = () => {
    const deviceInfo = {
        deviceId: DeviceInfo.getDeviceId(),
        deviceName: DeviceInfo.getDeviceName()
    }

    return deviceInfo
}

