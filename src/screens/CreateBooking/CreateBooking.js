import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import Header2 from "../../components/Header2";
import { Modalize } from "react-native-modalize";
import ListComponent from "../../components/ListComponent";
import { useSelector } from "react-redux";
import SectionWithHeader from "../../components/SectionWithHeader";
import Toast from "react-native-toast-message";
import DateTimePickerModal from "react-native-modal-datetime-picker";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Custom hook for handling selections
const useSelection = (initialValue = []) => {
  const [selectedItems, setSelectedItems] = useState(initialValue);

  const handleSelection = (item) => {
    setSelectedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  return [selectedItems, handleSelection, setSelectedItems];
};

const CreateBooking = ({ defaultValues, navigation, route }) => {
  const { mode, tutorJob } = route.params;
  const tutorJobId = tutorJob?._id;
  const userData = useSelector((state) => state?.auth?.userData);
  const [booking, setBooking] = useState();
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
  const formatCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(currentDate.getDate()).padStart(2, "0"); // Add leading zero if needed

    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatCurrentDate();
  console.log(formattedDate); // Output: 2024-08-26 (or the current date)
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
      salery: "",
      postedDate: formattedDate,
    },
  });
  const [isDatePickerVisible, setIsDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(null);

  const modalRefs = useRef([]);
  const [showDays, setShowDays] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const showStartDatePicker = () => {
    setIsDatePickerVisibility(!isDatePickerVisible);
  };

  const handleStartConfirm = (date) => {
    setDate(date.toISOString().split("T")[0]);
    setIsDatePickerVisibility(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.29.101:3000/collections", {
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

  useEffect(() => {
    if (tutorJobId) {
      fetchUserData();
    }
  }, [tutorJobId]);
  console.log(tutorJobId);

  // Filter locations based on selected city
  useEffect(() => {
    if (selectedCity) {
      const filtered = locationsData.filter(
        (loc) => loc.cityId === selectedCity
      );
      setFilteredLocations(filtered);
    }
  }, [selectedCity, locationsData]);

  // Fetch booking data for editing
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `http://192.168.29.101:3000/booking/${tutorJobId}`,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const res = await response.json();
        const data = res?.data;
        console.log("data test", data);
        setBooking(data);

        // Update form fields with booking data
        setValue("tuitionType", data.tuitionType);
        setValue("city", data.city);
        setValue("location", data.location);
        setValue("category", data.category);
        setValue("course", data.course);
        setValue("subjects", data.subjects);
        setSelectedSubjects(data.subjects);
        setValue("studentGender", data.studentGender);
        setValue("tutorGender", data.tutorGender);
        setValue("numStudents", data.numStudents);
        setValue("days", data.days);
        setSelectedDays(data.days);
        setValue("salary", data.salary),
          setValue("otherRequirement", data.otherRequirement);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to fetch booking");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const submitBooking = async (formData) => {
    const token = userData?.token;
    const endpoint =
      mode === "new" ? `create-booking` : `update-booking/${tutorJobId}`;
    const method = mode === "new" ? "POST" : "PUT";
    try {
      const response = await fetch(`http://192.168.29.101:3000/${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert("Success", "Booking created successfully");
        Toast.show({
          type: "success",
          text1: "Success",
          text2:
            mode === "create"
              ? "Booking created successfully"
              : "Booking updated successfully",
        });
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

  const displayDays = showDays ? daysData : [];
  const displaySubjects = showSubjects ? subjectsData : [];

  return (
    <KeyboardAvoidingView>
      <Header2
        title="Create Tutor Request"
        isBackButtonVisible={true}
        isRightButtonVisible={true}
        onRightPress={handleSubmit(onSubmit)}
        onBackPress={() => navigation.goBack()}
        rightTitle={mode === "new" ? "Submit" : "update"}
      />
      <ScrollView>
        <View style={{ padding: 16 }}>
          <Text>{tutorJobId}</Text>
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
              <Text style={styles.viewAllText}>
                {showSubjects ? "Pick" : "View all"}
              </Text>
            </TouchableOpacity>
          </View>

          {showSubjects && (
            <View>
              {displaySubjects?.map((subject) => (
                <CheckBox
                  key={subject._id}
                  title={subject.name}
                  checked={selectedSubjects?.includes(subject._id)}
                  onPress={() => {
                    if (selectedSubjects?.includes(subject._id)) {
                      setSelectedSubjects((prev) =>
                        prev.filter((id) => id !== subject._id)
                      );
                    } else {
                      setSelectedSubjects((prev) => [...prev, subject._id]);
                    }
                    setValue("subjects", selectedSubjects);
                  }}
                />
              ))}
            </View>
          )}

          <Controller
            name="city"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => {
                  onChange(itemValue);
                  setSelectedCity(itemValue); // Update selectedCity state
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
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={{ marginBottom: 10 }}
              >
                <Picker.Item label="Select a Location" value="" />
                {filteredLocations.map((item) => (
                  <Picker.Item
                    key={item._id}
                    label={item.name}
                    value={item._id}
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
                <Picker.Item label="Any" value="any" />
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
                <Picker.Item label="Any" value="any" />
              </Picker>
            )}
          />
          <View style={styles.datePicker}>
            <Text style={styles.label}>Tuition Date</Text>
            <TouchableOpacity onPress={showStartDatePicker}>
              <TextInput
                style={styles.dateInput}
                placeholder="YYYY/MM/DD"
                value={date}
                editable={false}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleStartConfirm}
              onCancel={() => setIsDatePickerVisibility(false)}
            />
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleStartConfirm}
            onCancel={() => setIsDatePickerVisible(false)}
          />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Days</Text>
            <TouchableOpacity onPress={toggleDays}>
              <Text style={styles.viewAllText}>
                {showDays ? "Pick" : "View all"}
              </Text>
            </TouchableOpacity>
          </View>

          {showDays && (
            <View>
              {displayDays?.map((day) => (
                <CheckBox
                  key={day._id}
                  title={day?.name}
                  checked={selectedDays?.includes(day._id)}
                  onPress={() => {
                    if (selectedDays?.includes(day._id)) {
                      setSelectedDays((prev) =>
                        prev.filter((id) => id !== day._id)
                      );
                    } else {
                      setSelectedDays((prev) => [...prev, day._id]);
                    }
                    setValue("days", selectedDays);
                  }}
                />
              ))}
            </View>
          )}

          <TextInput
            placeholder="Other Requirement"
            style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
            onChangeText={(text) => setValue("otherRequirement", text)}
          />
          <TextInput
            placeholder="Salary"
            style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
            onChangeText={(text) => setValue("salary", text)}
          />
        </View>
      </ScrollView>

      {/* Modal components */}
      {modalRefs.current.map((modalRef, index) => (
        <Modalize key={index} ref={modalRef}>
          {/* Modal content */}
        </Modalize>
      ))}
    </KeyboardAvoidingView>
  );
};

export default CreateBooking;

const styles = StyleSheet.create({
  container: { flex: 1 },
  step: { padding: 16 },
  chipsContainer: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    // backgroundColor: "#e0e0e0",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { fontSize: 14, color: "#333" },
  reviewTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3D3D3D",
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6200ea",
  },
});
