import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import { Searchbar, FAB, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import Header2 from "../../components/Header2";
import moment from "moment";
import { Modalize } from "react-native-modalize";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FilterBookings from "./FilterBookings";
import { API_BASE_URL } from "../../config/urls";

// Booking data converted into an array

const BookingScreen = ({ navigation, setTabBarVisible }) => {
  const user = useSelector((state) => state?.auth?.userData);
  const userId = user?._id;
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  let lastOffsetY = 0;

  const handleScroll = (event) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const scrollingUp = currentOffsetY < lastOffsetY;

    setTabBarVisible(scrollingUp);
    lastOffsetY = currentOffsetY;
  };

  // Memoize the derived data if necessary
  const derivedData = useMemo(() => {
    return formData.map((booking) => ({
      ...booking,
      formattedDate: new Date(booking.date).toLocaleDateString(),
    }));
  }, [formData]);

  useEffect(() => {
    fetchUserData();
  }, [userId, user?.token]); // Re-fetch data if userId or user.token changes
  const modalizeRef = useRef(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [selectedTuitionTypeIndex, setSelectedTuitionTypeIndex] = useState([]);

  console.log("start date", startDate);
  console.log("end date", endDate);
  console.log( API_BASE_URL)

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const handleStartConfirm = (date) => {
    setStartDate(date.toISOString());
    setStartDatePickerVisibility(false);
  };

  const handleEndConfirm = (date) => {
    setEndDate(date.toISOString());
    setEndDatePickerVisibility(false);
  };

  const onClear = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const onOpenModal = () => {
    modalizeRef.current?.open();
  };
  const onCloseModal = () => {
    modalizeRef.current?.close();
  };

  // Example function in a React Native component

  useEffect(() => {
    if (startDate && endDate) {
      fetchBookings(startDate, endDate);
    }
  }, [startDate, endDate]);

  const fetchBookings = async (startDate, endDate) => {
    const apiUrl = `http://192.168.29.101:3000/bookings?startDate=${encodeURIComponent(
      startDate
    )}&endDate=${encodeURIComponent(endDate)}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const bookings = await response.json();
      console.log("Bookings:", bookings);

      // Handle the bookings data as needed
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchUserData = useCallback(async () => {
    const forStudent = `http://192.168.29.101:3000/bookings/${userId}`;
    const forTutor = `http://192.168.29.101:3000/bookings`;

    try {
      setLoading(true);
      const response = await fetch(
        user?.userType === "tutor" ? forTutor : forStudent,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFormData(data.bookings || []);
        console.log("Fetched bookings:", data.bookings);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Bookings fetched successfully",
        });
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [userId, user?.token]); // Dependencies: fetchUserData will update when userId or user.token changes

  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await fetch(
        `http://192.168.29.101:3000/booking/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`, // Assuming you're using JWT
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Booking deleted successfully");
        fetchUserData();
      } else {
        alert(result.message || "Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking");
    }
  };

  const renderItem = useCallback(
    ({ item, mode }) => (
      <Card containerStyle={styles.card}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("BookingDetail", { tutorJob: item })
          }
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center", // Ensure icons align vertically
            }}
          >
            <Text style={styles.headinfo}>
              Need Tuition for {item.course?.name || "N/A"}
            </Text>

            {user?.userType === "student" && item.userId === user._id && (
              <View style={styles.iconContainer}>
                {/* Edit Icon */}
                <Icon
                  name="edit"
                  type="font-awesome"
                  color="#1E90FF"
                  size={24}
                  onPress={() =>
                    navigation.navigate("Create-Booking", {
                      tutorJob: item,
                      tutorJobId: item?._id,
                      mode: "update",
                    })
                  }
                />

                {/* Delete Icon */}
                <Icon
                  name="trash"
                  type="font-awesome"
                  color="red"
                  size={24}
                  onPress={() => handleDeleteBooking(item._id)}
                  containerStyle={{ marginLeft: 15 }} // Add some spacing between the icons
                />
              </View>
            )}
          </View>
          <Card.Divider />
          <Text style={styles.info}>Category: {item.category.name}</Text>
          <Text style={styles.info}>
            Subjects: {item.subjects.map((sub) => sub.name).join(", ")}
          </Text>
          <Text style={styles.info}>City: {item.city.name}</Text>
          <Text style={styles.info}>Tuition Type: {item.tuitionType}</Text>
          <Text style={styles.info}>Student Gender: {item.studentGender}</Text>
          <Text style={styles.info}>Tutor Gender: {item.tutorGender}</Text>
          <Text style={styles.info}>
            Number of Students: {item.numStudents}
          </Text>
          <Text style={styles.info}>
            Other Requirement: {item.otherRequirement}
          </Text>

          {/* Display the actual creation date */}
          <Text style={styles.info}>
            Posted at:{" "}
            {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </Text>

          {/* Display the "time ago" format */}
          <Text style={styles.info}>
            Posted: {moment(item.createdAt).fromNow()}
          </Text>

          <Text style={styles.info}>
            Class Need Days:{" "}
            {item.days.map((sub) => sub?.name).join(", ") || "No specific days"}
          </Text>
        </TouchableOpacity>
      </Card>
    ),
    [navigation] // Dependencies: renderItem will update when navigation changes
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
      <Header2 isBackButtonVisible={false} title="My Bookings" />
      {user?.userType === "tutor" && (
        <View style={styles.headerContainer}>
          <Searchbar
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchBar}
          />
          <TouchableOpacity style={styles.filterButton} onPress={onOpenModal}>
            <Icon name="filter" type="feather" color="#4CAF50" />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={derivedData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />

      <View>
        <Modalize ref={modalizeRef} modalHeight={500}>
          <View style={styles.dateContainer}>
            <View style={styles.datePicker}>
              <Text style={styles.label}>Posted Date From</Text>
              <TouchableOpacity onPress={showStartDatePicker}>
                <TextInput
                  style={styles.dateInput}
                  placeholder="YYYY/MM/DD"
                  value={startDate}
                  editable={false}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isStartDatePickerVisible}
                mode="date"
                onConfirm={handleStartConfirm}
                onCancel={() => setStartDatePickerVisibility(false)}
              />
            </View>
            <View style={styles.datePicker}>
              <Text style={styles.label}>Posted Date To</Text>
              <TouchableOpacity onPress={showEndDatePicker}>
                <TextInput
                  style={styles.dateInput}
                  placeholder="YYYY/MM/DD"
                  value={endDate}
                  editable={false}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="date"
                onConfirm={handleEndConfirm}
                onCancel={() => setEndDatePickerVisibility(false)}
              />
            </View>
          </View>
          <Button onPress={onClear}>Clear</Button>
        </Modalize>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    marginBottom: 5,
  },
  searchBar: {
    flex: 1,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  filterButton: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    elevation: 3,
  },
  list: {
    paddingBottom: 100, // To avoid FAB covering content
  },
  card: {
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    backgroundColor: "#fff",
    borderWidth: 0,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headinfo: {
    fontSize: 18,
    color: "#666",
    fontWeight: "bold",
    fontFamily: "Regular 400",
  },
  info: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Regular 400",
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#4CAF50",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  // date
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datePicker: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: "#007bff",
    marginBottom: 5,
  },
  dateInput: {
    borderColor: "#d1d1d1",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default BookingScreen;
