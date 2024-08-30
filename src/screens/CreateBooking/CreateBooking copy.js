import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import Header2 from "../../components/Header2";
import Toast from "react-native-toast-message";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSelector } from "react-redux";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CreateBooking = ({ defaultValues, navigation, route }) => {
  const { mode, tutorJob } = route.params;
  const tutorJobId = tutorJob?._id;
  const userData = useSelector((state) => state?.auth?.userData);
  const userId = userData?._id;

  const [categoriesData, setCategoriesData] = useState([]);
  const [classesData, setClassesData] = useState([]);
  const [subjectsData, setSubjectsData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [locationsData, setLocationsData] = useState([]);
  const [daysData, setDaysData] = useState([]);

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: defaultValues || {
      userId: userId,
      tuitionType: "",
      city: "",
      location: "",
      category: "",
      course: "",
      subjects: [],
      studentGender: "",
      tutorGender: "",
      numStudents: "",
      days: [],
      otherRequirement: "",
      salary: "",
      bookingDate: "",
      bookingTime: "",
    },
  });

  const [isDatePickerVisible, setIsDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisibility] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const [showDays, setShowDays] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.204.30:3000/collections", {
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setCategoriesData(data.categories || []);
          setClassesData(data.classes || []);
          setSubjectsData(data.subjects || []);
          setCitiesData(data.cities || []);
          setLocationsData(data.locations || []);
          setDaysData(data.days || []);
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

  const showDatePicker = () => {
    setIsDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate) => {
    setDate(selectedDate.toISOString().split("T")[0]);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setIsTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setIsTimePickerVisibility(false);
  };

  const handleConfirmTime = (selectedTime) => {
    setTime(selectedTime.toTimeString().split(" ")[0]);
    hideTimePicker();
  };

  const submitBooking = async (formData) => {
    const token = userData?.token;
    const endpoint =
      mode === "new" ? `create-booking` : `update-booking/${tutorJobId}`;
    const method = mode === "new" ? "POST" : "PUT";

    // Add date and time to the formData
    formData.tuitionDateTime = `${date} ${time}`;

    try {
      const response = await fetch(`http://192.168.204.30:3000/${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        Toast.show({
          type: "success",
          text1: "Success",
          text2:
            mode === "new"
              ? "Booking created successfully"
              : "Booking updated successfully",
        });
        navigation.goBack();
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to create booking");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred");
    }
  };

  const onSubmit = (data) => {
    const formData = { ...data, userId };
    submitBooking(formData);
  };

  const toggleDays = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowDays(!showDays);
  };

  const toggleSubjects = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowSubjects(!showSubjects);
  };

  const filteredLocations = locationsData.filter(
    (location) => location.cityId === selectedCity
  );

  const displayDays = showDays ? daysData : [];
  const displaySubjects = showSubjects ? subjectsData : [];

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header2
        title="Create Tutor Request"
        isBackButtonVisible={true}
        isRightButtonVisible={true}
        onRightPress={handleSubmit(onSubmit)}
        onBackPress={() => navigation.goBack()}
        rightTitle={mode === "new" ? "Submit" : "Update"}
      />
      <ScrollView>
        <View style={styles.formContainer}>
          <Text>{tutorJobId}</Text>

          {/* Date Picker */}
          <View style={styles.datePicker}>
            <Text style={styles.label}>Tuition Date</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <TextInput
                style={styles.dateInput}
                placeholder="YYYY-MM-DD"
                value={date}
                editable={false}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />
          </View>

          {/* Time Picker */}
          <View style={styles.datePicker}>
            <Text style={styles.label}>Tuition Time</Text>
            <TouchableOpacity onPress={showTimePicker}>
              <TextInput
                style={styles.dateInput}
                placeholder="HH:MM:SS"
                value={time}
                editable={false}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={hideTimePicker}
            />
          </View>

          <Controller
            name="tuitionType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={{ marginBottom: 10 }}
              >
                <Picker.Item label="Select type" value="" />
                <Picker.Item label="Online" value="online" />
                <Picker.Item label="Home" value="home" />
                <Picker.Item label="Group" value="group" />
                <Picker.Item label="Institute" value="institute" />
              </Picker>
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={{ marginBottom: 10 }}
              >
                <Picker.Item label="Select a Category" value="" />
                {categoriesData.map((category) => (
                  <Picker.Item
                    key={category._id}
                    label={category.name}
                    value={category._id}
                  />
                ))}
              </Picker>
            )}
          />

          <Controller
            name="course"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={{ marginBottom: 10 }}
              >
                <Picker.Item label="Select a Course" value="" />
                {classesData.map((course) => (
                  <Picker.Item
                    key={course._id}
                    label={course.name}
                    value={course._id}
                  />
                ))}
              </Picker>
            )}
          />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select subjects</Text>
            <TouchableOpacity onPress={toggleSubjects}>
              <Text style={styles.toggleButton}>
                {showSubjects ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>
          {displaySubjects.map((subject) => (
            <CheckBox
              key={subject._id}
              title={subject.name}
              checked={selectedSubjects.includes(subject._id)}
              onPress={() => {
                const isSelected = selectedSubjects.includes(subject._id);
                if (isSelected) {
                  setSelectedSubjects((prev) =>
                    prev.filter((id) => id !== subject._id)
                  );
                } else {
                  setSelectedSubjects((prev) => [...prev, subject._id]);
                }
              }}
            />
          ))}

          <Controller
            name="city"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => {
                  onChange(itemValue);
                  setSelectedCity(itemValue);
                }}
                style={{ marginBottom: 10 }}
              >
                <Picker.Item label="Select a City" value="" />
                {citiesData.map((city) => (
                  <Picker.Item
                    key={city._id}
                    label={city.name}
                    value={city._id}
                  />
                ))}
              </Picker>
            )}
          />

          <Controller
            name="location"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={{ marginBottom: 10 }}
              >
                <Picker.Item label="Select a Location" value="" />
                {filteredLocations.map((location) => (
                  <Picker.Item
                    key={location._id}
                    label={location.name}
                    value={location._id}
                  />
                ))}
              </Picker>
            )}
          />

          <Controller
            name="studentGender"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={{ marginBottom: 10 }}
              >
                <Picker.Item label="Select Student Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            )}
          />

          <Controller
            name="tutorGender"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={{ marginBottom: 10 }}
              >
                <Picker.Item label="Select Tutor Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            )}
          />

          <Controller
            name="numStudents"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Number of Students"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select days</Text>
            <TouchableOpacity onPress={toggleDays}>
              <Text style={styles.toggleButton}>
                {showDays ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>
          {displayDays.map((day) => (
            <CheckBox
              key={day._id}
              title={day.name}
              checked={selectedDays.includes(day._id)}
              onPress={() => {
                const isSelected = selectedDays.includes(day._id);
                if (isSelected) {
                  setSelectedDays((prev) =>
                    prev.filter((id) => id !== day._id)
                  );
                } else {
                  setSelectedDays((prev) => [...prev, day._id]);
                }
              }}
            />
          ))}

          <Controller
            name="otherRequirement"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Other Requirements"
                multiline={true}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name="salary"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Expected Salary"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  datePicker: {
    marginBottom: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  label: {
    marginBottom: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleButton: {
    color: "blue",
  },
});

export default CreateBooking;
