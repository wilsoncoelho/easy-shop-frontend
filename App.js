import React from "react";
import { LogBox, ActivityIndicator, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

//Context API
import Auth from "./Context/store/Auth";

//Navigators
import Main from "./navigators/Main";

// Screens
import Header from "./Shared/Header";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <StatusBar hidden />
        <NavigationContainer>
          <Header />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
