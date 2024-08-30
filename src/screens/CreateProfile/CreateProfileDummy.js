import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { ProgressStep, ProgressSteps } from "../../components/ProgressSteps";
import { Feather } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { Modalize } from "react-native-modalize";
import ListComponent from "../../components/ListComponent";
import Header2 from "../../components/Header2";
import SectionWithHeader from "../../components/SectionWithHeader";

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

// Custom hook for handling editable fields
const useEditableField = () => {
  const [editableField, setEditableField] = useState(null);

  const handleEdit = (field) => {
    setEditableField(field === editableField ? null : field);
  };

  return [editableField, handleEdit];
};

// Editable field component
const EditableField = ({ label, value, onChange, editable, toggleEdit }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, editable && styles.inputEditable]}
      placeholder={label}
      value={value}
      onChangeText={onChange}
      editable={editable}
    />
    <TouchableOpacity onPress={toggleEdit} style={styles.icon}>
      <Feather name="edit-2" size={20} color={editable ? "#007bff" : "#777"} />
    </TouchableOpacity>
  </View>
);

// Profile Information Section Component
const ProfileInfoSection = ({
  title,
  information,
  handleChange,
  editableField,
  handleEdit,
}) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {Object.keys(information).map((field, index) => (
      <EditableField
        key={index}
        label={field.charAt(0).toUpperCase() + field.slice(1)}
        value={information[field]}
        onChange={(text) => handleChange(field, text)}
        editable={editableField === field}
        toggleEdit={() => handleEdit(field)}
      />
    ))}
  </View>
);

const CreateProfile = ({ navigation }) => {
  const userData = useSelector((state) => state?.auth?.userData);
  const profileId = userData?._id;
  const token = userData?.token;

  // Selection Hooks
  const [selectedCategories, handleCategorySelection, setSelectedCategories] =
    useSelection();
  const [selectedClasses, handleClassSelection, setSelectedClasses] =
    useSelection();
  const [selectedSubjects, handleSubjectSelection, setSelectedSubjects] =
    useSelection();
  const [preferredLocations, handleLocationSelection, setPreferredLocations] =
    useSelection();

  // Editable Field Hooks
  const [addressEditableField, handleAddressEdit] = useEditableField();
  const [personalEditableField, handlePersonalEdit] = useEditableField();
  const [emergencyEditableField, handleEmergencyEdit] = useEditableField();

  // State for form steps
  const [activeStep, setActiveStep] = useState(0);

  // Data Fetching States
  const [categoriesData, setCategoriesData] = useState([]);
  const [classesData, setClassesData] = useState([]);
  const [subjectsData, setSubjectsData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [locationsData, setLocationsData] = useState([]);

  // Other States
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedYourLocation, setSelectedYourLocation] = useState(null);
  const [filteredLocations, setFilteredLocations] = useState([]);

  // Address Information
  const [address, setAddress] = useState({
    street: "road nno 4",
    city: "Hyderabad",
    state: "Telagnana",
    postalCode: "500063",
    country: "India",
  });

  // Personal Information
  const [personalInformation, setPersonalInformation] = useState({
    name: "vijay",
    additionalNumber: "54554",
    gender: "male",
    dateOfBirth: "12-12-12",
    religion: "hind",
    nationality: "indian",
    fathersName: "san",
    fathersNumber: "55454654",
    mothersName: "pad",
    mothersNumber: "5545",
    overview: "fdfdsfd",
  });

  // Emergency Information
  const [emergencyInformation, setEmergencyInformation] = useState({
    name: "shiva",
    number: "0000",
    relation: "god",
    address: "kailasam",
  });

  // Modal Refs
  const modalRefs = useRef([]);

  // Search Query State
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch initial data
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

  // Filter locations based on selected city
  useEffect(() => {
    if (selectedCity) {
      const filtered = locationsData.filter(
        (loc) => loc.cityId === selectedCity
      );
      setFilteredLocations(filtered);
    }
  }, [selectedCity, locationsData]);

  // Handlers for information changes
  const handleAddressChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInformation((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmergencyInfoChange = (field, value) => {
    setEmergencyInformation((prev) => ({ ...prev, [field]: value }));
  };

  // Validation before proceeding to next step
  const validateStep = () => {
    switch (activeStep) {
      case 0:
        if (selectedCategories.length === 0)
          return "Please select at least one preferred category.";
        if (selectedClasses.length === 0)
          return "Please select at least one preferred class.";
        if (selectedSubjects.length === 0)
          return "Please select at least one preferred subject.";
        if (!selectedCity) return "Please select your city.";
        if (!selectedYourLocation) return "Please select your location.";
        if (preferredLocations.length === 0)
          return "Please select at least one preferred location.";
        return null;
      case 1:
        if (
          !address.street ||
          !address.city ||
          !address.state ||
          !address.postalCode ||
          !address.country
        )
          return "Please fill all address fields.";
        return null;
      case 2:
        if (
          !personalInformation.name ||
          !personalInformation.gender ||
          !personalInformation.dateOfBirth ||
          !personalInformation.nationality
        )
          return "Please fill all personal information fields.";
        if (
          !emergencyInformation.name ||
          !emergencyInformation.number ||
          !emergencyInformation.relation ||
          !emergencyInformation.address
        )
          return "Please fill all emergency information fields.";
        return null;
      default:
        return null;
    }
  };

  // Handlers for step navigation
  const handleNextStep = () => {
    const error = validateStep();
    if (error) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: error,
      });
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  // Submit handler
  const handleSubmit = async () => {
    const profileData = {
      userId: profileId,
      otherInfo: {
        preferredCategories: selectedCategories,
        preferredClasses: selectedClasses,
        preferredSubjects: selectedSubjects,
        preferredLocations: preferredLocations,
        location: selectedYourLocation,
        city: selectedCity,
      },
      address,
      personalInformation,
      emergencyInformation,
    };

    try {
      const response = await fetch(
        `http://192.168.29.101:3000/create-profile`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Profile created successfully",
        });
        navigation.navigate("profile-verify"); // Replace "Home" with your desired screen
      } else {
        Alert.alert("Error", data.message || `Failed to create profile`);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // Modal open and close handlers
  const openModal = (index) => {
    modalRefs.current[index]?.open();
  };

  const closeModal = (index) => {
    modalRefs.current[index]?.close();
  };

  console.log("selectedCategories", selectedCategories);

  return (
    <View style={styles.container}>
      <Header2
        title="Create Profile"
      
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://via.placeholder.com/100", // Replace with actual image URL or local asset
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>
            {userData?.name || "User Name"}
          </Text>
        </View>

        <ProgressSteps activeStep={activeStep}>
          {/* Step 1: Basic Information */}
          <ProgressStep
            label="Basic Info"
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            nextBtnText="Next"
            previousBtnText="Back"
            removeBtnRow={false}
          >
            <View style={styles.step}>
              <SectionWithHeader
                title="Preferred Categories"
                onEditPress={() => openModal(0)}
              >
                <View style={styles.chipsContainer}>
                  {selectedCategories.map((id, index) => {
                    const category = categoriesData.find(
                      (item) => item._id === id
                    );
                    return (
                      <View key={index} style={styles.chip}>
                        <Text style={styles.chipText}>{category?.name}</Text>
                      </View>
                    );
                  })}
                </View>
              </SectionWithHeader>

              <SectionWithHeader
                title="Preferred Classes"
                onEditPress={() => openModal(1)}
              >
                <View style={styles.chipsContainer}>
                  {selectedClasses.map((id) => {
                    const classItem = classesData.find(
                      (item) => item._id === id
                    );
                    return (
                      <View key={id} style={styles.chip}>
                        <Text style={styles.chipText}>{classItem?.name}</Text>
                      </View>
                    );
                  })}
                </View>
              </SectionWithHeader>

              <SectionWithHeader
                title="Preferred Subjects"
                onEditPress={() => openModal(2)}
              >
                <View style={styles.chipsContainer}>
                  {selectedSubjects.map((id) => {
                    const subject = subjectsData.find(
                      (item) => item._id === id
                    );
                    return (
                      <View key={id} style={styles.chip}>
                        <Text style={styles.chipText}>{subject?.name}</Text>
                      </View>
                    );
                  })}
                </View>
              </SectionWithHeader>

              <SectionWithHeader
                title="Your City"
                onEditPress={() => openModal(3)}
              >
                <View style={styles.chipsContainer}>
                  {selectedCity && (
                    <View style={styles.chip}>
                      <Text style={styles.chipText}>
                        {
                          citiesData.find((city) => city._id === selectedCity)
                            ?.name
                        }
                      </Text>
                    </View>
                  )}
                </View>
              </SectionWithHeader>

              <SectionWithHeader
                title="Your Location"
                onEditPress={() => openModal(4)}
              >
                <View style={styles.chipsContainer}>
                  {selectedYourLocation && (
                    <View style={styles.chip}>
                      <Text style={styles.chipText}>
                        {
                          locationsData.find(
                            (loc) => loc._id === selectedYourLocation
                          )?.name
                        }
                      </Text>
                    </View>
                  )}
                </View>
              </SectionWithHeader>

              <SectionWithHeader
                title="Preferred Locations"
                onEditPress={() => openModal(5)}
              >
                <View style={styles.chipsContainer}>
                  {preferredLocations.map((id) => {
                    const location = locationsData.find(
                      (item) => item._id === id
                    );
                    return (
                      <View key={id} style={styles.chip}>
                        <Text style={styles.chipText}>{location?.name}</Text>
                      </View>
                    );
                  })}
                </View>
              </SectionWithHeader>
            </View>
          </ProgressStep>

          {/* Step 2: Address Information */}
          <ProgressStep
            label="Address"
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            nextBtnText="Next"
            previousBtnText="Back"
            removeBtnRow={false}
          >
            <View style={styles.step}>
              <ProfileInfoSection
                title="Address Information"
                information={address}
                handleChange={handleAddressChange}
                editableField={addressEditableField}
                handleEdit={handleAddressEdit}
              />
            </View>
          </ProgressStep>

          {/* Step 3: Personal & Emergency Information */}
          <ProgressStep
            label="Personal Info"
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            nextBtnText="Next"
            previousBtnText="Back"
            removeBtnRow={false}
          >
            <View style={styles.step}>
              <ProfileInfoSection
                title="Personal Information"
                information={personalInformation}
                handleChange={handlePersonalInfoChange}
                editableField={personalEditableField}
                handleEdit={handlePersonalEdit}
              />

              <ProfileInfoSection
                title="Emergency Information"
                information={emergencyInformation}
                handleChange={handleEmergencyInfoChange}
                editableField={emergencyEditableField}
                handleEdit={handleEmergencyEdit}
              />
            </View>
          </ProgressStep>

          {/* Step 4: Review and Submit */}
          <ProgressStep
            label="Review"
            onPrevious={handlePreviousStep}
            finishBtnText="Submit"
            onSubmit={handleSubmit}
            previousBtnText="Back"
            removeBtnRow={false}
          >
            <View style={styles.step}>
              <Text style={styles.reviewTitle}>Review Your Information</Text>
              {/* Display summary of all information here */}
              <Button onPress={handleSubmit}>submitButton</Button>
              {/* You can create a separate component to display all info in a structured manner */}
            </View>
          </ProgressStep>
        </ProgressSteps>
      </ScrollView>

      {/* Modals for selections */}
      {/* Modal for Categories */}
      <Modalize
        ref={(el) => (modalRefs.current[0] = el)}
        modalHeight={500}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <ListComponent
          title="Select Categories"
          items={categoriesData}
          selectedItems={selectedCategories}
          handleSelection={handleCategorySelection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => closeModal(0)}
        />
      </Modalize>

      {/* Modal for Classes */}
      <Modalize
        ref={(el) => (modalRefs.current[1] = el)}
        modalHeight={500}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <ListComponent
          title="Select Classes"
          items={classesData}
          selectedItems={selectedClasses}
          handleSelection={handleClassSelection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => closeModal(1)}
        />
      </Modalize>

      {/* Modal for Subjects */}
      <Modalize
        ref={(el) => (modalRefs.current[2] = el)}
        modalHeight={500}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <ListComponent
          title="Select Subjects"
          items={subjectsData}
          selectedItems={selectedSubjects}
          handleSelection={handleSubjectSelection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => closeModal(2)}
        />
      </Modalize>

      {/* Modal for Cities */}
      <Modalize
        ref={(el) => (modalRefs.current[3] = el)}
        modalHeight={500}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <ListComponent
          title="Select City"
          items={citiesData}
          selectedItems={selectedCity ? [selectedCity] : []}
          handleSelection={(item) => setSelectedCity(item)}
          isSingleSelect={true}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => closeModal(3)}
        />
      </Modalize>

      {/* Modal for Your Location */}
      <Modalize
        ref={(el) => (modalRefs.current[4] = el)}
        modalHeight={500}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <ListComponent
          title="Select Your Location"
          items={filteredLocations}
          selectedItems={selectedYourLocation ? [selectedYourLocation] : []}
          handleSelection={(item) => setSelectedYourLocation(item)}
          isSingleSelect={true}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => closeModal(4)}
        />
      </Modalize>

      {/* Modal for Preferred Locations */}
      <Modalize
        ref={(el) => (modalRefs.current[5] = el)}
        modalHeight={500}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <ListComponent
          title="Select Preferred Locations"
          items={filteredLocations}
          selectedItems={preferredLocations}
          handleSelection={handleLocationSelection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => closeModal(5)}
        />
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollView: { padding: 6 },
  profileHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: { height: 100, width: 100, borderRadius: 50 },
  profileName: { fontSize: 24, fontWeight: "bold", marginTop: 10 },
  sectionContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  label: { flex: 1, fontSize: 16, color: "#333" },
  input: { flex: 2, fontSize: 16, color: "#333" },
  inputEditable: { borderBottomWidth: 1, borderBottomColor: "#007bff" },
  icon: { marginLeft: 10 },
  step: { padding: 16 },
  chipsContainer: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { fontSize: 14, color: "#333" },
  reviewTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});

export default CreateProfile;
