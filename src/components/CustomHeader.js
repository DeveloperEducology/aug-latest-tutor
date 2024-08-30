import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const CustomHeader = ({
  title,
  showBackButton = false,
  showRightButton = true,
  rightButtonIcon = "notifications-outline",
  onRightButtonPress,
}) => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state?.auth?.userData);

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          {showBackButton ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-outline" size={28} color="#333" />
            </TouchableOpacity>
          ) : (
            <Image
              source={{
                uri: "https://th.bing.com/th?id=ORMS.a6fa6f41d61a315b1c24ca273534926b&pid=Wdp&w=268&h=140&qlt=90&c=1&rs=1&dpr=1&p=0",
              }}
              style={styles.profilePic}
            />
          )}
          <Text style={styles.welcomeText}>
            {title || `Welcome, ${userData?.userName}`}
          </Text>
        </View>
        {showRightButton && (
          <View style={styles.headerIcons}>
            <Icon
              name={rightButtonIcon}
              size={28}
              color="#333"
              onPress={onRightButtonPress || (() => navigation.navigate("Notifications"))}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

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
  headerIcons: {
    flexDirection: "row",
  },
});
