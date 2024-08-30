import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const NotActiveScreen = () => {
  const isActive = useSelector((state) => state?.user?.isActive);
  const navigation = useNavigation();

  useEffect(() => {
    if (!isActive) {
      Alert.alert(
        "Account Blocked",
        "Your account has been blocked by the admin. Please contact support for more details."
      );
    }
  }, [isActive]);

  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>NotActiveScreen</Text>
    </View>
  );
};

export default NotActiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F4F7",
  },
  messageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
