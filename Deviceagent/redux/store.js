import {configureStore,combineReducers} from "@reduxjs/toolkit"
import locationReducer from "./locationSlice"
import networkReducer from "./networkSlice"
import deviceIdReducer from "./deviceIdSlice"
import batteryReducer from "./batterySlice"
import deviceInfoReducer from "./deviceInfoSlice"
// import storage from "redux-persist/lib/storage"
import AsyncStorage from "@react-native-async-storage/async-storage"

import {persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
     REGISTER
} from "redux-persist"

const persistConfig={
    key: "root",
    version: 1,
    storage:AsyncStorage
    };

const rootReducer = combineReducers({deviceId:
     deviceIdReducer,
    deviceInfo:deviceInfoReducer,
    deviceBattery:batteryReducer,
    deviceNetwork:networkReducer,
    deviceLocation:locationReducer})

const persisitedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
    reducer:persisitedReducer,
    middleware: (getDefaultMiddleware) =>
 getDefaultMiddleware({
    serializableCheck: {
        ignoredActions: [FLUSH,REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
})
})

export let persistor = persistStore(store)