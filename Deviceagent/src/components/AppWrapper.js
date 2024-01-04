import App from "../../App";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import { store,persistor } from "../../redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
            <App/>
            </PersistGate>
         </Provider>
    )
}

export default registerRootComponent(AppWrapper);