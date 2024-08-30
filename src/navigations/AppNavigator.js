import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useSelector } from "react-redux";
import CreateProfile from "../screens/CreateProfile/CreateProfileDummy";
import VerifyProfile from "../screens/VerifyProfile.js/VerifyProfile";
import NotActiveScreen from "../screens/NotActiveScreen.js/NotActiveScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const userData = useSelector((state) => state?.auth?.userData);

  console.log("userData in route", userData);

  const renderScreen = () => {
    if (userData?.token) {
      if (userData.isNewUser && userData.userType === "tutor") {
        return <Stack.Screen name="CreateProfile" component={CreateProfile} />;
      }
      if (!userData.isProfileVerified) {
        return <Stack.Screen name="profile-verify" component={VerifyProfile} />;
      }
      if (!userData?.isActive) {
        return (
          <Stack.Screen name="NotActiveScreen" component={NotActiveScreen} />
        );
      }
      return <Stack.Screen name="MainStack" component={MainStack} />;
    }
    return <Stack.Screen name="AuthStack" component={AuthStack} />;
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {renderScreen()}
    </Stack.Navigator>
  );
};

export default AppNavigator;
