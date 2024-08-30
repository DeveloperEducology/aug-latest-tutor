import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomHeader from "./CustomHeader"; // Adjust the import path as needed
// import Article from "./Article";
import BookingDetail from "../../screens/BookingDetail/BookingDetail";
import CustomDrawerContent from "./CustomDrawerContent"; // If using custom drawer content
import { useSelector } from "react-redux";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const userData = useSelector((state) => state?.auth?.userData);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route, navigation }) => ({
        header: () => (
          <CustomHeader
            title={route.name}
            showBackButton={route.name !== "MyStacks"}
            onRightButtonPress={() => navigation.navigate("Notifications")}
          />
        ),
      })}
    >
      <Drawer.Screen
        name={`Welcome ${userData?.userName}`}
        component={MyStacks}
      />
      <Drawer.Screen name="Article" component={Article} />
      <Drawer.Screen
        name="BookingDetail"
        component={BookingDetail}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
