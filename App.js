import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainStack from "./src/navigations/MainStack";
import AppNavigator from "./src/navigations/AppNavigator";
import { Provider } from "react-redux";
import { saveUserData } from "./src/redux/reducers/auth";
import store from "./src/redux/store";

const { dispatch } = store;
const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
