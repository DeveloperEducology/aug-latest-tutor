import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Keyboard,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Header2 from "../../components/Header2";

let deta = [
  {
    availability: {
      days: [],
      tutoringStyles: [],
      tutoringMethod: [],
    },
    otherInfo: {
      preferredCategories: [
        {
          _id: "66952d628392dcf3b72ed818",
          name: "School",
          value: "school",
        },
        {
          _id: "66ab76e9300f7e23e004b6cd",
          name: "College",
          value: "college",
        },
        {
          _id: "66ba0279300f7e23e004b75b",
          name: "Engineering",
          value: "engineering",
        },
        {
          _id: "66ba02a2300f7e23e004b75d",
          name: "IIT-JEE",
          value: "IIT_JEE",
        },
      ],
      preferredClasses: [
        {
          _id: "66ba06c6300f7e23e004b762",
          name: "Class 1",
          categoryId: "66952d628392dcf3b72ed818",
        },
        {
          _id: "66ba06eb300f7e23e004b763",
          name: "Class 2",
          categoryId: "66952d628392dcf3b72ed818",
        },
        {
          _id: "66ba06f2300f7e23e004b764",
          name: "Class 3",
          categoryId: "66952d628392dcf3b72ed818",
        },
        {
          _id: "66ba06f8300f7e23e004b765",
          name: "Class 4",
          categoryId: "66952d628392dcf3b72ed818",
        },
        {
          _id: "66ba06fc300f7e23e004b766",
          name: "Class 5",
          categoryId: "66952d628392dcf3b72ed818",
        },
        {
          _id: "66ba0700300f7e23e004b767",
          name: "Class 6",
          categoryId: "66952d628392dcf3b72ed818",
        },
        {
          _id: "66ba0704300f7e23e004b768",
          name: "Class 7",
          categoryId: "66952d628392dcf3b72ed818",
        },
        {
          _id: "66ba0916300f7e23e004b770",
          name: "Class 11",
          categoryId: "66ab76e9300f7e23e004b6cd",
        },
        {
          _id: "66ba0a54300f7e23e004b775",
          name: "Class 12",
          categoryId: "66ab76e9300f7e23e004b6cd",
        },
      ],
      preferredSubjects: [
        "66ab9197300f7e23e004b6e0",
        "66ab91c3300f7e23e004b6e2",
        "66ab91e8300f7e23e004b6e5",
      ],
      placeOfTutoring: [],
      preferredLocations: [],
      preferredDays: [],
    },
    _id: "66ba3ff3a24cc7517678bc4f",
    userId: {
      profileImage:
        "https://t3.ftcdn.net/jpg/03/64/62/36/360_F_364623623_ERzQYfO4HHHyawYkJ16tREsizLyvcaeg.jpg",
      userName: "vijay2",
      phoneNumber: "",
      email: "vijay2@test.com",
    },
    profileId: 1723482099668,
    bio: null,
    education: [],
    media: [],
    __v: 0,
  },
  {
    availability: {
      days: [],
      tutoringStyles: [],
      tutoringMethod: [],
    },
    otherInfo: {
      placeOfTutoring: [],
      preferredDays: [],
      preferredCategories: [
        {
          _id: "66952d628392dcf3b72ed818",
          name: "School",
          value: "school",
        },
        {
          _id: "66ab76e9300f7e23e004b6cd",
          name: "College",
          value: "college",
        },
        {
          _id: "66ba0279300f7e23e004b75b",
          name: "Engineering",
          value: "engineering",
        },
        {
          _id: "66ba02a2300f7e23e004b75d",
          name: "IIT-JEE",
          value: "IIT_JEE",
        },
      ],
      preferredClasses: [
        {
          _id: "66ba0743300f7e23e004b76b",
          name: "Class 10",
          categoryId: "66952d628392dcf3b72ed818",
        },
        {
          _id: "66ba0916300f7e23e004b770",
          name: "Class 11",
          categoryId: "66ab76e9300f7e23e004b6cd",
        },
        {
          _id: "66ba0a54300f7e23e004b775",
          name: "Class 12",
          categoryId: "66ab76e9300f7e23e004b6cd",
        },
      ],
      preferredSubjects: [
        "66ab9197300f7e23e004b6e0",
        "66ab91c3300f7e23e004b6e2",
        "66ab91b4300f7e23e004b6e1",
      ],
      preferredLocations: [
        "66ab9801300f7e23e004b6ee",
        "66ab9855300f7e23e004b6ef",
        "66ab9860300f7e23e004b6f0",
      ],
      location: "66ab9801300f7e23e004b6ee",
      city: "66952ca68392dcf3b72ed80f",
    },
    personalInformation: {
      additionalNumber: "",
      gender: "",
      dateOfBirth: null,
      religion: "",
      nationality: "",
      fathersName: "",
      fathersNumber: "",
      mothersName: "",
      mothersNumber: "",
      overview: "",
    },
    emergencyInformation: {
      name: "",
      number: "",
      relation: "",
      address: "",
    },
    _id: "66bce156330d1ee8a4e384c5",
    userId: null,
    profileId: 1723654486311,
    userName: "Vijay marka",
    bio: null,
    education: [],
    media: [],
    __v: 0,
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      _id: "66bce198330d1ee8a4e384d7",
    },
  },
  {
    availability: {
      days: [],
      tutoringStyles: [],
      tutoringMethod: [],
    },
    otherInfo: {
      placeOfTutoring: [],
      preferredDays: [],
      preferredCategories: [
        {
          _id: "66952d628392dcf3b72ed818",
          name: "School",
          value: "school",
        },
        {
          _id: "66ab76e9300f7e23e004b6cd",
          name: "College",
          value: "college",
        },
        {
          _id: "66ab7702300f7e23e004b6ce",
          name: "Pre-School",
          value: "pre school",
        },
        {
          _id: "66ba028a300f7e23e004b75c",
          name: "Medical",
          value: "medical",
        },
      ],
      preferredClasses: [
        {
          _id: "66ba06f8300f7e23e004b765",
          name: "Class 4",
          categoryId: "66952d628392dcf3b72ed818",
        },
        {
          _id: "66ba06c6300f7e23e004b762",
          name: "Class 1",
          categoryId: "66952d628392dcf3b72ed818",
        },
        {
          _id: "66ba0704300f7e23e004b768",
          name: "Class 7",
          categoryId: "66952d628392dcf3b72ed818",
        },
      ],
      preferredSubjects: [
        "66ab9197300f7e23e004b6e0",
        "66ab91c3300f7e23e004b6e2",
      ],
      preferredLocations: [
        "66ab9801300f7e23e004b6ee",
        "66ab9860300f7e23e004b6f0",
      ],
      location: "66ab9801300f7e23e004b6ee",
      city: "66952ca68392dcf3b72ed80f",
    },
    personalInformation: {
      additionalNumber: "",
      gender: "",
      dateOfBirth: null,
      religion: "",
      nationality: "",
      fathersName: "",
      fathersNumber: "",
      mothersName: "",
      mothersNumber: "",
      overview: "",
    },
    emergencyInformation: {
      name: "",
      number: "",
      relation: "",
      address: "",
    },
    _id: "66c757a920bf592d66c2af8e",
    userId: {
      _id: "66c0453604f6bb93f703b09b",
      profileImage:
        "https://t3.ftcdn.net/jpg/03/64/62/36/360_F_364623623_ERzQYfO4HHHyawYkJ16tREsizLyvcaeg.jpg",
      userName: "vijay1",
      phoneNumber: "",
      email: "vijay1@test.com",
      password: "$2b$10$/mFfIPW/IrtPuzxusuXviOAn0smmM0o2sFroFx6aevMk5/d1WmXiu",
      links: [],
      isDeleted: false,
      fcmToken:
        "dvNQ4OkCQ0O1TLwVbCzZXG:APA91bGM0xSWi0UcvHaeujPjhcvV-bO4QQUukWRGoCiLoN92EF-biv9s0G52uFZ-dEU3LH8d2tmEIsINWGFoSFkTett5fyU3r9zseMTftymRv3Un3YvJGt1NLcMrWUiE7JoAUeU0dT-4",
      validOTP: false,
      deviceType: null,
      token: null,
      online: false,
      lastSeen: null,
      hasProfile: false,
      userType: "tutor",
      isEmailVerified: false,
      isNewUser: false,
      isActive: true,
      __v: 0,
      isProfileVerified: true,
    },
    profileId: 1724340137200,
    bio: null,
    education: [],
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      _id: "66c7610220bf592d66c2b0f5",
    },
    media: [],
    __v: 0,
  },
];

const TutorSearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [filteredTutors, setFilteredTutors] = useState([]);

  const [categoriesData, setCategoriesData] = useState([]);
  const [subjectsData, setSubjectsData] = useState([]);

  useEffect(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.29.101:3000/collections", {
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setCategoriesData(data.categories || []);
          setSubjectsData(data.subjects || []);
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

  const fetchTutors = async (subjectId) => {
    try {
      const response = await fetch(
        `http://192.168.29.101:3000/search-profile/${subjectId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFilteredTutors(data.data || []);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to fetch tutors");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleSelect = (subjectId) => {
    setSelectedSubject(subjectId);
    setSearchQuery(subjectId);
    setIsFocused(false);
    Keyboard.dismiss();
    fetchTutors(subjectId._id);
  };

  const clear = () => {
    setSelectedSubject("");
    setSearchQuery("");
    setFilteredTutors([]);
    setIsFocused(true);
  };

  const renderSubject = ({ item }) => (
    <TouchableOpacity
      style={styles.subjectItem}
      onPress={() => handleSelect(item)}
    >
      <Text style={styles.subjectText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderTutor = ({ item }) => (
    <View style={styles.tutorItem}>
      <Image
        style={{
          height: 50,
          width: 50,
          backgroundColor: "gray",
          borderRadius: 100 / 2,
        }}
        source={{ uri: item?.profileImage }}
      />
      <View>
        <Text style={styles.tutorName}>{item.userId?.userName}</Text>
        <Text style={styles.tutorSubject}>
          {item.otherInfo.preferredSubjects?.map((sub) => sub?.name).join(", ")}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header2 isBackButtonVisible={false} title="Search Tutors" />
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Tutors"
          value={searchQuery?.name}
          onChangeText={(text) => setSearchQuery(text)}
          onFocus={() => setIsFocused(true)}
        />
        {selectedSubject ? (
          <Icon name="close-outline" size={20} color="#666" onPress={clear} />
        ) : (
          <Icon name="search-outline" size={20} color="#666" />
        )}
      </View>

      {!selectedSubject && isFocused ? (
        <>
          <Text style={styles.sectionTitle}>Subjects</Text>
          <FlatList
            data={subjectsData}
            renderItem={renderSubject}
            keyExtractor={(item) => item._id}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        </>
      ) : null}

      {(selectedSubject || searchQuery) && (
        <>
          <Text style={styles.sectionTitle}>
            {filteredTutors.length > 0
              ? `Tutors for "${searchQuery?.name || selectedSubject?.name}"`
              : `No tutors found for "${
                  searchQuery?.name || selectedSubject?.name
                }"`}
          </Text>
          <FlatList
            data={filteredTutors}
            renderItem={renderTutor}
            keyExtractor={(item) => item._id}
            numColumns={1}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3D3D3D",
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    justifyContent: "space-between",
  },
  subjectItem: {
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: 10,
    margin: 5,
    flex: 1,
    alignItems: "center",
  },
  subjectText: {
    fontSize: 16,
    color: "#333",
  },
  tutorItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    flexDirection: "row",
    gap: 4,
  },
  tutorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tutorSubject: {
    fontSize: 14,
    color: "#666",
  },
});

export default TutorSearchScreen;
