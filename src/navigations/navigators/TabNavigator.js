import React, { useRef } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "../../screens/home/HomeScreen";
import TutorSearchScreen from "../../screens/TutorSearch/TutorSearchScreen ";
import ParentProfile from "../../screens/profiles/ParentProfile";
import Bookings from "../../screens/bookings/Bookings";
import TutorProfile from "../../screens/profiles/TutorProfile";
import { useSelector } from "react-redux";
import { Modalize } from "react-native-modalize";
import { useNavigation } from "@react-navigation/native";
import BookmarkedJobs from "../../screens/BookmarkedJobs/BookmarkedJobs";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const userData = useSelector((state) => state?.auth?.userData);
  const modalizeRef = useRef(null);
  const navigation = useNavigation();

  const onOpenModal = () => {
    modalizeRef.current?.open();
  };

  const handleCreateTutorRequest = (mode) => {
    modalizeRef.current?.close();
    navigation.navigate("Create-Booking", { mode: "new" });
  };

  const handleCreateChapterExpert = (mode) => {
    modalizeRef.current?.close();
    navigation.navigate("Create-Chapter-Booking", { mode: "new" });
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "CreateBooking") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Bookings") {
              iconName = focused ? "book" : "book-outline";
            } else if (route.name === "Bookmark") {
              iconName = focused ? "bookmark" : "bookmark-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            height: 60,
            minHeight: 60,
            paddingBottom: 5,
            paddingTop: 5,
            backgroundColor: "#f8f8f8",
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarLabel: "", headerShown: false }}
        />
        {userData.userType === "student" && (
          <>
            <Tab.Screen
              name="Search"
              component={TutorSearchScreen}
              options={{ tabBarLabel: "", headerShown: false }}
            />
            <Tab.Screen
              name="CreateBooking"
              component={View} // Empty component because we are handling the click
              options={{
                tabBarLabel: "",
                headerShown: false,
                tabBarButton: (props) => (
                  <TouchableOpacity
                    {...props}
                    onPress={onOpenModal}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: 60,
                      height: 60,
                      top: -10, // Adjust this to align the icon properly
                    }}
                  >
                    <Icon
                      name="add-circle-outline"
                      size={28}
                      color={
                        props.accessibilityState.selected ? "blue" : "gray"
                      }
                    />
                  </TouchableOpacity>
                ),
              }}
            />
          </>
        )}
        <Tab.Screen
          name="Bookings"
          component={Bookings}
          options={{ tabBarLabel: "", headerShown: false }}
        />
        {userData.userType === "tutor" && (
          <Tab.Screen
            name="Bookmark"
            component={BookmarkedJobs}
            options={{ tabBarLabel: "", headerShown: false }}
          />
        )}
        <Tab.Screen
          name="Profile"
          component={
            userData.userType === "student" ? ParentProfile : TutorProfile
          }
          options={{ tabBarLabel: "", headerShown: false }}
        />
      </Tab.Navigator>

      <Modalize ref={modalizeRef} adjustToContentHeight>
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            onPress={handleCreateTutorRequest}
            style={{ padding: 10 }}
          >
            <Text style={{ fontSize: 18 }}>Create Tutor Request</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCreateChapterExpert}
            style={{ padding: 10, marginTop: 10 }}
          >
            <Text style={{ fontSize: 18 }}>Create Chapter Expert</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </>
  );
};

export default MyTabs;
