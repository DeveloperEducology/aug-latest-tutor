import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const VerifyProfile = () => {
  const isProfileVerified = useSelector((state) => state?.user?.isProfileVerified);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleProceed = () => {
    if (isProfileVerified) {
      navigation.navigate("HomeScreen"); // Replace with your actual screen name
    } else {
      Alert.alert("Profile not verified", "Your profile has not been verified by the admin yet.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.submittedText}>
          Submitted! <Text style={styles.checkMark}>✅</Text>
        </Text>
        <Text style={styles.greetingText}>Dear vijay,</Text>
        <Text style={styles.messageText}>
          Thank you for expressing your interest in joining our community. We are delighted to inform you that your registration form has been successfully submitted.
        </Text>
        <Text style={styles.messageText}>
          Expect a call from us shortly for the interview and verification process. We look forward to the opportunity to further discuss your application.
        </Text>
        <Text style={styles.regardsText}>Best regards,</Text>
        <Text style={styles.companyText}>VSTutors.com LLP</Text>
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F7", // Light green background
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  submittedText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0D3B66", // Navy blue color
    textAlign: "center",
    marginBottom: 10,
  },
  checkMark: {
    fontSize: 24,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D3B66", // Navy blue color
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  regardsText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  companyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6200ea", // Dark red color
    marginBottom: 20,
  },
  proceedButton: {
    backgroundColor: "#6200ea", // Dark red color
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  proceedButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default VerifyProfile;
