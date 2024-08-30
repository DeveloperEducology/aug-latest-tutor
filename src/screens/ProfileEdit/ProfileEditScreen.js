import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import SectionWithHeader from "../../components/SectionWithHeader";
import { ProgressStep, ProgressSteps } from "../../components/ProgressSteps";
import { Feather } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons
import { Button } from "react-native-paper";
import { Modalize } from "react-native-modalize";
import {
  categories,
  classes,
  cities,
  subjectss,
  days,
  locations,
} from "../../Data/Data";
import ListComponent from "../../components/ListComponent";
import Header2 from "../../components/Header2";

const ProfileEditScreen = ({ route, navigation }) => {
  const userData = useSelector((state) => state?.auth?.userData);
  const { profile } = route.params;
  const id = profile?._id;
  console.log("profile route", profile);
  const profileId = userData?._id;
  // Create an array of refs for the modals
  const modalRefs = Array.from({ length: 10 }, () => useRef(null));

  // Create an array of functions to open the modals
  const onOpen = modalRefs.map((ref, index) => () => {
    ref.current?.open();
  });

  // Create an array of functions to close the modals
  const onClose = modalRefs.map((ref, index) => () => {
    ref.current?.close();
  });

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [cats, setCats] = useState([]);
  const [cls, setCls] = useState([]);
  const [subs, setSubs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [citys, setCitys] = useState([]);
  const [days, setDays] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState(
    profile?.otherInfo?.preferredCategories || []
  );
  const [selectedClasses, setSelectedClasses] = useState(
    profile?.otherInfo?.preferredClasses || []
  );
  const [selectedSubjects, setSelectedSubjects] = useState(
    profile?.otherInfo?.preferredSubjects || []
  );
  const [selectedDays, setSelectedDays] = useState(
    profile?.otherInfo?.preferredSubjects || []
  );

  const [preferredLocations, setPreferredLocations] = useState(
    profile?.otherInfo?.preferredLocations || []
  );

  const [address, setAddress] = useState({
    street: profile?.address?.street || "",
    city: profile?.address?.city || "",
    state: profile?.address?.state || "",
    postalCode: profile?.address?.postalCode || "",
    country: profile?.address?.country || "",
  });

  const [personalInformation, setPersonalInformation] = useState({
    name: profile?.personalInformation?.name || userData?.userName,
    additionalNumber: profile?.personalInformation?.additionalNumber || "",
    gender: profile?.personalInformation?.gender || "",
    dateOfBirth: profile?.personalInformation?.dateOfBirth || "",
    religion: profile?.personalInformation?.religion || "",
    nationality: profile?.personalInformation?.nationality || "",
    fathersName: profile?.personalInformation?.fathersName || "",
    fathersNumber: profile?.personalInformation?.fathersNumber || "",
    mothersName: profile?.personalInformation?.mothersName || "",
    mothersNumber: profile?.personalInformation?.mothersNumber || "",
    overview: profile?.personalInformation?.overview || "",
  });

  const [emergencyInformation, setEmergencyInformation] = useState({
    name: profile?.emergencyInformation?.name || "",
    number: profile?.emergencyInformation?.number || "",
    relation: profile?.emergencyInformation?.relation || "",
    address: profile?.emergencyInformation?.address || "",
  });
  const [selectedCity, setSelectedCity] = useState(
    profile?.otherInfo?.city || null
  );
  const [selectedYLocation, setSelectedYLocation] = useState(
    profile?.otherInfo?.location || null
  );

  const [filtLocs, setFiltLocs] = useState([]);

  const handleAddressChange = (field, value) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [field]: value,
    }));
  };

  const [editableField, setEditableField] = useState(null);

  const handleEdit = (field) => {
    setEditableField(field === editableField ? null : field);
  };

  const handleEmergencyInfoChange = (field, value) => {
    setEmergencyInformation((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInformation((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const FilteredList = ({ items, query }) => {
    const filterItems = useMemo(() => {
      return items.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
    }, [items, query]);

    return (
      <View>
        {filterItems.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
      </View>
    );
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const items = [
    "Apple",
    "Banana",
    "Orange",
    "Grapes",
    "Mango",
    "PineApple",
    "BlueBerry",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.29.101:3000/collections", {
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          setCats(data.categories);
          setCls(data.classes);
          setSubs(data.subjects);
          setCitys(data.cities);
          setLocations(data.locations);
          setDays(data.days);
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
    const filterLocations = () => {
      setFiltLocs(locations.filter((loc) => loc.cityId === selectedCity));
    };

    filterLocations();
  }, [selectedCity, locations]);

  const filteredLocations = locations.filter((loc) =>
    preferredLocations.includes(loc._id)
  );

  const handleSelection = (setter) => (item) => {
    setter((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleArraySelection = (item, selectedItems, setSelectedItems) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item._id)) {
        return prevSelectedItems.filter((id) => id !== item._id);
      } else {
        return [...prevSelectedItems, item._id];
      }
    });
  };

  const handleSingleSelection = (item, setSelected) => {
    setSelected(item._id);
  };

  const nextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
    // handleSubmit();
  };

  const previousStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const submit = () => {
    console.log("selectedCategories", selectedCategories);
    console.log("selectedClasses", selectedClasses);
  };

  const handleSubmit = async () => {
    const token = userData?.token;
    const endpoint = `update-profile/${id}`;
    const method = "PUT";

    try {
      setLoading(true);
      const response = await fetch(`http://192.168.25.60:3000/${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...profile,
          userId: profileId,
          otherInfo: {
            preferredCategories: selectedCategories,
            preferredClasses: selectedClasses,
            preferredSubjects: selectedSubjects,
            preferredLocations: preferredLocations,
            location: selectedYLocation,
            city: selectedCity,
          },
          address,
          personalInformation,
          emergencyInformation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Profile updated successfully",
        });
        setLoading(false);
      } else {
        Alert.alert("Error", data.message || `Failed to create profile`);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header2
        title="Profile"
        isBackButtonVisible={true}
        onBackPress={() => navigation.goBack()}
      />
      {loading ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://th.bing.com/th/id/OIP.NqY3rNMnx2NXYo3KJfg43gHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7",
              }}
              style={{ height: 100, width: 100 }}
            />
            <Text>"Vijay</Text>
          </View>
          <ProgressSteps activeStep={activeStep}>
            <ProgressStep
              onNext={nextStep}
              onPrevious={previousStep}
              isFirstStep={activeStep === 0}
              label="Basic Info"
            >
              <SectionWithHeader
                title="Preferrable Categories"
                onEditPress={onOpen[0]}
              >
                <View>
                  {cats
                    .filter((cl) => selectedCategories?.includes(cl._id))
                    .map((cl) => (
                      <TouchableOpacity
                        key={cl._id}
                        onPress={() =>
                          handleSelection(setSelectedCategories)(cl._id)
                        }
                      >
                        <Text>{cl.name}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </SectionWithHeader>
              <SectionWithHeader
                title="Preferrable Classes"
                onEditPress={onOpen[1]}
              >
                <View>
                  {cls
                    .filter((cl) => selectedClasses.includes(cl._id))
                    .map((cl) => (
                      <TouchableOpacity
                        key={cl._id}
                        onPress={() =>
                          handleSelection(setSelectedClasses)(cl._id)
                        }
                      >
                        <Text>{cl.name}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </SectionWithHeader>
              <SectionWithHeader
                title="Preferrable Subjects"
                onEditPress={onOpen[2]}
              >
                <View>
                  {subs
                    .filter((cl) => selectedSubjects.includes(cl._id))
                    .map((cl) => (
                      <TouchableOpacity
                        key={cl._id}
                        onPress={() =>
                          handleSelection(setSelectedSubjects)(cl._id)
                        }
                      >
                        <Text>{cl.name}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </SectionWithHeader>
              <SectionWithHeader title="Your City" onEditPress={onOpen[3]}>
                <View>
                  <Text>
                    {citys.find((cl) => selectedCity === cl?._id)?.name}
                  </Text>
                </View>
              </SectionWithHeader>
              <SectionWithHeader title="Your Location" onEditPress={onOpen[4]}>
                <View>
                  <Text>
                    {
                      locations?.find((cl) => cl?._id == selectedYLocation)
                        ?.name
                    }
                  </Text>
                </View>
              </SectionWithHeader>
              <SectionWithHeader
                title="Preferrable Locations"
                onEditPress={onOpen[5]}
              >
                <View>
                  {locations
                    .filter((cl) => preferredLocations.includes(cl._id))
                    .map((cl) => (
                      <TouchableOpacity
                        key={cl._id}
                        onPress={() =>
                          handleSelection(setPreferredLocations)(cl._id)
                        }
                      >
                        <Text>{cl.name}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </SectionWithHeader>
              <SectionWithHeader title="Test" onEditPress={onOpen[6]}>
                <View></View>
              </SectionWithHeader>
            </ProgressStep>
            <ProgressStep
              onNext={nextStep}
              onPrevious={previousStep}
              label="address"
            >
              <View style={styles.step}>
                {Object.keys(address).map((field, index) => (
                  <View>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </Text>
                    </View>

                    <View key={index} style={styles.inputContainer}>
                      <TextInput
                        style={[
                          styles.input,
                          editableField === field && styles.inputEditable,
                        ]}
                        placeholder={
                          field.charAt(0).toUpperCase() + field.slice(1)
                        }
                        value={address[field]}
                        onChangeText={(text) =>
                          handleAddressChange(field, text)
                        }
                        editable={editableField === field}
                      />
                      <TouchableOpacity
                        style={styles.icon}
                        onPress={() => handleEdit(field)}
                      >
                        <Feather
                          name="edit-2"
                          size={20}
                          color={editableField === field ? "#007bff" : "#777"}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </ProgressStep>
            <ProgressStep
              onNext={nextStep}
              onPrevious={previousStep}
              label="Personal Info"
            >
              <View>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  Personal Information
                </Text>
                <View style={styles.step}>
                  {Object.keys(personalInformation).map((field, index) => (
                    <View>
                      <View style={styles.labelContainer}>
                        <Text style={styles.label}>
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </Text>
                      </View>

                      <View key={index} style={styles.inputContainer}>
                        <TextInput
                          style={[
                            styles.input,
                            editableField === field && styles.inputEditable,
                          ]}
                          placeholder={
                            field.charAt(0).toUpperCase() + field.slice(1)
                          }
                          value={personalInformation[field]}
                          onChangeText={(text) =>
                            handlePersonalInfoChange(field, text)
                          }
                          editable={editableField === field}
                        />
                        <TouchableOpacity
                          style={styles.icon}
                          onPress={() => handleEdit(field)}
                        >
                          <Feather
                            name="edit-2"
                            size={20}
                            color={editableField === field ? "#007bff" : "#777"}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              <View>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  Emergency Information
                </Text>
                <View style={styles.step}>
                  {Object.keys(emergencyInformation).map((field, index) => (
                    <View>
                      <View style={styles.labelContainer}>
                        <Text style={styles.label}>
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </Text>
                      </View>

                      <View key={index} style={styles.inputContainer}>
                        <TextInput
                          style={[
                            styles.input,
                            editableField === field && styles.inputEditable,
                          ]}
                          placeholder={
                            field.charAt(0).toUpperCase() + field.slice(1)
                          }
                          value={emergencyInformation[field]}
                          onChangeText={(text) =>
                            handleEmergencyInfoChange(field, text)
                          }
                          editable={editableField === field}
                        />
                        <TouchableOpacity
                          style={styles.icon}
                          onPress={() => handleEdit(field)}
                        >
                          <Feather
                            name="edit-2"
                            size={20}
                            color={editableField === field ? "#007bff" : "#777"}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </ProgressStep>

            <ProgressStep
              onNext={nextStep}
              onPrevious={previousStep}
              isLastStep={activeStep === 3}
              label="Emergency Info"
            >
              <View style={styles.step}>
                <Button onPress={handleSubmit}>Submit</Button>
              </View>
            </ProgressStep>
          </ProgressSteps>
        </ScrollView>
      )}

      <Modalize
        ref={modalRefs[0]}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          stickyHeaderIndices: [0],
        }}
      >
        <ListComponent
          title="categories"
          items={cats}
          selectedItems={selectedCategories}
          setSelectedItems={setSelectedCategories}
          handleSelection={(item) =>
            handleArraySelection(
              item,
              selectedCategories,
              setSelectedCategories
            )
          }
          value={searchQuery} // Assuming you have a state for the search query
          onChangeText={setSearchQuery} // Assuming you have a function to update the search query
          onClose={onClose[0]}
        />
      </Modalize>
      <Modalize
        ref={modalRefs[1]}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          stickyHeaderIndices: [0],
        }}
      >
        <ListComponent
          title="Classes"
          items={cls}
          selectedItems={selectedClasses}
          setSelectedItems={setSelectedClasses}
          handleSelection={(item) =>
            handleArraySelection(item, selectedClasses, setSelectedClasses)
          }
          value={searchQuery} // Assuming you have a state for the search query
          onChangeText={setSearchQuery} // Assuming you have a function to update the search query
          onClose={onClose[1]}
        />
      </Modalize>
      <Modalize
        ref={modalRefs[2]}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          stickyHeaderIndices: [0],
        }}
      >
        <ListComponent
          title="Subjects"
          items={subs}
          selectedItems={selectedSubjects}
          setSelectedItems={setSelectedSubjects}
          handleSelection={(item) =>
            handleArraySelection(item, selectedSubjects, setSelectedSubjects)
          }
          value={searchQuery} // Assuming you have a state for the search query
          onChangeText={setSearchQuery} // Assuming you have a function to update the search query
          onClose={onClose[2]}
        />
      </Modalize>
      <Modalize
        ref={modalRefs[3]}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          stickyHeaderIndices: [0],
        }}
      >
        <ListComponent
          title="Select City"
          items={citys}
          selectedItems={selectedCity ? selectedCity : ""} // Wrap single selection in an array
          handleSelection={(item) =>
            handleSingleSelection(item, setSelectedCity)
          }
          value={searchQuery} // Assuming you have a state for the search query
          onChangeText={setSearchQuery} // Assuming you have a function to update the search query
          onClose={onClose[3]}
        />
      </Modalize>
      <Modalize
        ref={modalRefs[4]}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          stickyHeaderIndices: [0],
        }}
      >
        <ListComponent
          title="Select Your Location"
          items={filtLocs}
          selectedItems={selectedYLocation ? [selectedYLocation] : []} // Ensure selectedItems is always an array
          handleSelection={(item) =>
            handleSingleSelection(item, setSelectedYLocation)
          }
          onClose={onClose[4]}
          value={searchQuery} // Assuming you have a state for the search query
          onChangeText={setSearchQuery} // Assuming you have a function to update the search query
        />
      </Modalize>
      <Modalize
        ref={modalRefs[5]}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          stickyHeaderIndices: [0],
        }}
      >
        <ListComponent
          title="Preferred Locations"
          items={filtLocs}
          selectedItems={preferredLocations}
          setSelectedItems={setPreferredLocations}
          handleSelection={(item) =>
            handleArraySelection(
              item,
              preferredLocations,
              setPreferredLocations
            )
          }
          value={searchQuery} // Assuming you have a state for the search query
          onChangeText={setSearchQuery} // Assuming you have a function to update the search query
          onClose={onClose[5]}
        />
      </Modalize>
      <Modalize
        ref={modalRefs[6]}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          stickyHeaderIndices: [0],
        }}
      >
        <View style={{ padding: 20, marigin: 15 }}>
          <View style={{ backgroundColor: "gray" }}>
            <TextInput
              type="text"
              value={query}
              placeholder="Search"
              onChangeText={setQuery}
              style={{ height: 30, borderColor: "black" }}
            />
          </View>
          <FilteredList items={items} query={query} />
        </View>
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollView: { padding: 6 },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  itemContainer: { padding: 10 },
  itemText: { fontSize: 16 },
  selectedItemText: { fontSize: 16, fontWeight: "bold", color: "blue" },
  rowWrapper: { justifyContent: "space-between" },
  flatListContainer: { paddingBottom: 10 },
  closeButton: { marginTop: 10, alignItems: "center" },
  closeButtonText: { fontSize: 16, color: "blue" },
  submitButton: { padding: 16, backgroundColor: "blue", alignItems: "center" },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  step: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  inputEditable: {
    borderColor: "#007bff",
    backgroundColor: "#eef6ff",
  },
  icon: {
    padding: 8,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ProfileEditScreen;
