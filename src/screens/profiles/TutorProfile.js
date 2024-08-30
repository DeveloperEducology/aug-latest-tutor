// ProfileScreen.js
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";

const TutorProfile = ({ navigation }) => {
  const userData = useSelector((state) => state?.auth?.userData);
  const [profile, setProfile] = useState();
  const profileId = userData?._id;
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    fetchUserData();
  }, [profileId]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `http://192.168.29.101:3000/profile/${profileId}`,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("profile data in tutor profile screen", data);
        setProfile((prevUser) => ({
          ...prevUser,
          ...data,
        }));
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to fetch profile");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          style={styles.profileImage}
          source={{ uri: "https://via.placeholder.com/100" }}
        />
        <Text style={styles.name}>Vijay Marka</Text>
        <Text style={styles.rating}>0 / 5.0</Text>
        <Text style={styles.id}>ID: 296396</Text>
        <Text style={styles.phone}>01870720115</Text>
        <Text style={styles.profileCompletion}>
          Profile Completed: <Text style={styles.percent}>13%</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate("ProfileEdit", { profile: profile })
        }
      >
        <Text style={styles.editButtonText}>Edit Information</Text>
      </TouchableOpacity>
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Educational Information</Text>
        <Text style={styles.infoText}>
          You didn’t input any educational information yet
        </Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Tuition Related Information</Text>
        {renderInfo("Tutoring Method")}
        {renderInfo("Available Days")}
        {renderInfo("Time")}
        {renderInfo("City")}
        {renderInfo("Location")}
        {renderInfo("Expected Salary")}
        {renderInfo("Tutoring Styles")}
        {renderInfo("Preferred Categories")}
        {renderInfo("Preferred Classes")}
        {renderInfo("Preferred Subjects")}
        {renderInfo("Place of Tutoring")}
        {renderInfo("Total Experience")}
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        {renderInfo("Name")}
        {renderInfo("Additional Number")}
        {renderInfo("Gender")}
        {renderInfo("Date of Birth")}
        {renderInfo("Religion")}
        {renderInfo("Nationality")}
        {renderInfo("Father's Name")}
        {renderInfo("Father's Number")}
        {renderInfo("Mother's Name")}
        {renderInfo("Mother's Number")}
        {renderInfo("Overview")}
      </View>
        <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Emergency Information</Text>
        {renderInfo("Name")}
        {renderInfo("Relation")}
        {renderInfo(" Number")}
        {renderInfo("Address")}
       </View>
        <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Address Information</Text>
        {renderInfo("Street")}
        {renderInfo("City")}
        {renderInfo("State")}
        {renderInfo("Pin code")}
       </View>
        <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Educational Information</Text>
        {renderInfo("School Name")}
        {renderInfo("Year")}
        {renderInfo("Grade")}
        
       </View>
    </ScrollView>
  );
};

const renderInfo = (label) => (
  <Text style={styles.infoText}>
    {label} : <Text style={styles.infoNotGiven}>Not Given</Text>
  </Text>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 1,
    backgroundColor: "#f2f2f2",
  },
  profileHeader: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rating: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  id: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  profileCompletion: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  percent: {
    color: "#0066cc",
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoSection: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  infoNotGiven: {
    color: "#ff0000",
  },
});

export default TutorProfile;
