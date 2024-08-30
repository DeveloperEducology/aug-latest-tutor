import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { logout } from "../redux/actions/auth";

const Header = ({ navigation }) => {
  const userData = useSelector((state) => state?.auth?.userData);
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          <Image
            source={{
              uri: "https://th.bing.com/th?id=ORMS.a6fa6f41d61a315b1c24ca273534926b&pid=Wdp&w=268&h=140&qlt=90&c=1&rs=1&dpr=1&p=0",
            }} // Replace with your profile pic URL
            style={styles.profilePic}
          />
          <Text style={styles.welcomeText}>Welcome, {userData?.userName}</Text>
        </View>
        <View style={styles.headerIcons}>
          <Icon name="notifications-outline" size={28} color="#333" />
          <Icon
            name="log-out-outline"
            size={28}
            color="#333"
            onPress={logout}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff", // Change color as needed
    elevation: 4, // For shadow effect
  },
  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  rightContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
});
