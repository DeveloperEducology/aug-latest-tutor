import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { Provider, useSelector } from "react-redux";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";


import CatWiseTutors from "../screens/CatWiseTutors/CatWiseTutors";
import MyTabs from "./navigators/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
// import CreateProfile from "../screens/CreateProfile/CreateProfile";
import BookingDetail from "../screens/BookingDetail/BookingDetail";
import CreateProfile from "../screens/CreateProfile/CreateProfileDummy";
import ProfileEditScreen from "../screens/ProfileEdit/ProfileEditScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../components/CustomDrawerContent";
import CustomHeader from "../components/CustomHeader";
import CreateBooking from "../screens/CreateBooking/CreateBooking";
import ChapterBooking from "../screens/CreateBooking/ChapterBooking";
import BookmarkedJobs from "../screens/BookmarkedJobs/BookmarkedJobs";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
function Article() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const MyStacks = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="MyTabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen
          name="CatWiseTutors"
          component={CatWiseTutors}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateProfile"
          component={CreateProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileEditScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create-Booking"
          component={CreateBooking}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create-Chapter-Booking"
          component={ChapterBooking}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookingDetail"
          component={BookingDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookmarkedJobs"
          component={BookmarkedJobs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Toast position="bottom" />
    </>
  );
};

function MyDrawer() {
  const userData = useSelector((state) => state?.auth?.userData);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        header: () => (
          <CustomHeader title={route.name} routeName={route.name} />
        ),
      })}
    >
      <Drawer.Screen
        name={`Welcome ${userData?.userName}`}
        component={MyStacks}
      />
      <Drawer.Screen name="Article" component={Article} />
      
    </Drawer.Navigator>
  );
}
export default function MainStack() {
  return <MyStacks />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
