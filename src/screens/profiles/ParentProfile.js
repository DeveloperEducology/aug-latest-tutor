import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ParentProfile = ({ navigation }) => {
  // Sample data
  const userData = {
    name: "John Doe",
    phoneNumber: "123-456-7890",
    email: "john.doe@example.com",
    address: "123 Main St, Springfield, USA",
    userType: "student",
  };

  return (
    <View style={styles.container}>
      {/* Profile picture */}
      <View style={styles.profilePicContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.profilePic}
        />
      </View>

      {/* User details */}
      <Text style={styles.name}>{userData?.userName}</Text>
      <Text style={styles.info}>{userData.phoneNumber}</Text>
      <Text style={styles.info}>{userData?.email}</Text>
      <Text style={styles.info}>{userData?.address}</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("My Bookings pressed")}
        >
          <Text style={styles.buttonText}>My Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Applicants pressed")}
        >
          <Text style={styles.buttonText}>Applicants</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Short Listed pressed")}
        >
          <Text style={styles.buttonText}>Short Listed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("BookmarkedJobs")}
        >
          <Text style={styles.buttonText}>SBookmarked Jobs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  profilePicContainer: {
    marginBottom: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  buttonContainer: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  editButton: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4a90e2",
    padding: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default ParentProfile;
