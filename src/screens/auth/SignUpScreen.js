import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import validator from "../../utils/validations";
import { showError } from "../../utils/helperFunctions";
import { userSignup } from "../../redux/actions/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const SignUpScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("vijay");
  const [fullName, setFullName] = useState("vijay");
  const [email, setEmail] = useState("vijay@test.com");
  const [password, setPassword] = useState("vijay123");
  const [confirmPassword, setConfirmPassword] = useState("vijay123");
  const [userType, setUserType] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [citiesData, setCitiesData] = useState([]);
  const [locationsData, setLocationsData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [media, setMedia] = useState([]);
  const [selectedType, setSelectedType] = useState(""); // State for Picker

  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.204.30:3000/collections", {
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();

          setCitiesData(data.cities || []);
          setLocationsData(data.locations || []);
        } else {
          const errorData = await response.json();
          Alert.alert(
            "Error",
            errorData.message || "Failed to fetch collections"
          );
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };

    fetchData();
  }, []);

  function handleUserChange(type) {
    setUserType(type);
  }

  // Filter locations based on selected city
  const [filteredLocations, setFilteredLocations] = useState([]);
  useEffect(() => {
    if (city) {
      const filtered = locationsData.filter((loc) => loc.cityId === city);
      setFilteredLocations(filtered);
    }
  }, [city, locationsData]);

  const isValidData = () => {
    const error = validator({
      userName,
      email,
      password,
      userType,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onPressSignup = async () => {
    const checkValid = isValidData();

    if (checkValid) {
      setLoading(true);
      let fcmToken = await AsyncStorage.getItem("fcm_token");
      let data = {
        userName,
        phoneNumber,
        email,
        password,
        userType,
        fcmToken,
        city,
        location,
      };
      try {
        console.log("sign up data", data);
        let res = await userSignup(data);
        console.log("res", res);
        setLoading(false);
        navigation.navigate("login");
      } catch (error) {
        console.log("error raised", error);
        showError(error?.error || error?.message);
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.form}>
        <Text style={styles.header}>Sign up</Text>
        <Text style={styles.subHeader}>Create your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={userName}
          onChangeText={setUserName}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Select Type:</Text>
        <Picker
          selectedValue={city} // Connect Picker to selectedType state
          onValueChange={(itemValue) => setCity(itemValue)} // Update selectedType state
          style={{ marginBottom: 10 }}
        >
          <Picker.Item label="Select City" value="" />
          {citiesData.map((city) => (
            <Picker.Item key={city._id} label={city.name} value={city._id} />
          ))}
        </Picker>

        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
          style={{ marginBottom: 10 }}
        >
          <Picker.Item label="Select a Location" value="" />
          {filteredLocations.map((item) => (
            <Picker.Item key={item._id} label={item.name} value={item._id} />
          ))}
        </Picker>

        <Text style={styles.label}>Select User Type:</Text>
        <RadioButton.Group onValueChange={handleUserChange} value={userType}>
          <View style={styles.radioButtonContainer}>
            <RadioButton.Item label="Tutor" value="tutor" />
            <RadioButton.Item label="Student" value="student" />
          </View>
        </RadioButton.Group>

        <TouchableOpacity style={styles.button} onPress={onPressSignup}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7d1e0",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f3e1f6",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#a050d0",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginVertical: 15,
    fontSize: 16,
  },
  googleButton: {
    borderColor: "#a050d0",
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  googleButtonText: {
    color: "#a050d0",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#6f42c1",
  },
});

export default SignUpScreen;
