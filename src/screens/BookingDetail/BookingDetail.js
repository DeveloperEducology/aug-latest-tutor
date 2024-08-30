import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Icon, Button, Card } from "react-native-elements";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header2 from "../../components/Header2";

const BookingDetail = ({ route, navigation }) => {
  const user = useSelector((state) => state?.auth?.userData);
  const { tutorJob } = route.params;

  // State for modals
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("success"); // 'success' or 'error'
  const [modalMessage, setModalMessage] = useState("");

  // State for bookmarked IDs
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  console.log("bookmarkedIds", bookmarkedIds);

  useEffect(() => {
    // Load bookmarked IDs from AsyncStorage on mount
    const loadBookmarkedIds = async () => {
      try {
        const savedIds = await AsyncStorage.getItem("bookmarkedIds");
        if (savedIds) {
          setBookmarkedIds(JSON.parse(savedIds));
        }
      } catch (error) {
        console.error("Failed to load bookmarked IDs", error);
      }
    };

    loadBookmarkedIds();
  }, []);

  const saveBookmarkedIds = async (ids) => {
    try {
      await AsyncStorage.setItem("bookmarkedIds", JSON.stringify(ids));
    } catch (error) {
      console.error("Failed to save bookmarked IDs", error);
    }
  };

  const toggleBookmark = (id) => {
    let updatedIds;
    if (bookmarkedIds.includes(id)) {
      updatedIds = bookmarkedIds.filter((bookmarkedId) => bookmarkedId !== id);
    } else {
      updatedIds = [...bookmarkedIds, id];
    }
    setBookmarkedIds(updatedIds);
    saveBookmarkedIds(updatedIds);
  };

  const isBookmarked = (id) => bookmarkedIds.includes(id);

  const handleApplyBooking = async () => {
    const userId = user?._id;
    const bookingId = tutorJob?._id;
    const tutorId = tutorId;
    const categoryId = tutorJob?.category?._id;
    const course = tutorJob?.course;

    try {
      const response = await fetch(
        `http://192.168.29.124:3000/apply-booking/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`, // Add the token here
          },
          body: JSON.stringify({
            bookingId,
            tutorId,
            categoryId,
            course,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setModalType("success");
        setModalMessage("ApplyBooking created successfully!");
        setModalVisible(true);
      } else {
        setModalType("error");
        setModalMessage(data.message || "Something went wrong!");
        setModalVisible(true);
      }
    } catch (error) {
      setModalType("error");
      setModalMessage(error.message);
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header2
        title="Tuition Job Details"
        isBackButtonVisible="true"
        isRightButtonVisible="true"
        isFavourite="true"
        isBookmarked={isBookmarked(tutorJob._id)}
        onBackPress={() => navigation.goBack()}
        onFavouritePress={() => toggleBookmark(tutorJob._id)}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Your other code */}
        <Text style={styles.title}>{tutorJob?.course?.name}</Text>
        <Text style={styles.link}>{tutorJob.tuitionType} Tutoring</Text>
        <Text style={styles.jobId}>Job Id : {tutorJob?._id}</Text>
        <Text style={styles.postedDate}>
          Posted Date : [Add Posted Date Here]
        </Text>
        <Card.Divider />
        <View style={styles.row}>
          <Icon name="book" type="font-awesome" style={styles.icon} />
          <Text style={styles.text}>Subjects</Text>
          <Text style={styles.value}>
            {tutorJob.subjects.map((sub) => sub?.name).join(", ")}
          </Text>
        </View>
        <Card.Divider />
        <View style={styles.row}>
          <Icon name="users" type="font-awesome" style={styles.icon} />
          <Text style={styles.text}>Number of Students</Text>
          <Text style={styles.value}>{tutorJob.numStudents}</Text>
        </View>
        <Card.Divider />
        <View style={styles.row}>
          <Icon name="female" type="font-awesome" style={styles.icon} />
          <Text style={styles.text}>Student Gender</Text>
          <Text style={styles.value}>{tutorJob.studentGender}</Text>
        </View>
        <Card.Divider />
        <View style={styles.row}>
          <Icon name="user" type="font-awesome" style={styles.icon} />
          <Text style={styles.text}>Preferred Tutor</Text>
          <Text style={styles.value}>{tutorJob.tutorGender}</Text>
        </View>
        <Card.Divider />
        <View style={styles.row}>
          <Icon name="calendar" type="font-awesome" style={styles.icon} />
          <Text style={styles.text}>Tutoring Days</Text>
          <Text style={styles.value}>
            {tutorJob.days.map((sub) => sub?.name).join(", ") ||
              "No specific days"}
          </Text>
        </View>
        <Card.Divider />
        <View style={styles.row}>
          <Icon name="money" type="font-awesome" style={styles.icon} />
          <Text style={styles.text}>Salary</Text>
          <Text style={styles.value}>[Add Salary Here]</Text>
        </View>
        <Card.Divider />
        <View style={styles.row}>
          <Icon name="clock-o" type="font-awesome" style={styles.icon} />
          <Text style={styles.text}>Tutoring Time</Text>
          <Text style={styles.value}>[Add Tutoring Time Here]</Text>
        </View>
        <Card.Divider />
        <View style={styles.row}>
          <Icon name="map-marker" type="font-awesome" style={styles.icon} />
          <Text style={styles.text}>Location</Text>
          <Text style={styles.value}>{tutorJob.city.name}</Text>
        </View>
        <Card.Divider />
        <View style={styles.row}>
          <Icon name="clipboard" type="font-awesome" style={styles.icon} />
          <Text style={styles.text}>Other Requirements</Text>
          <Text style={styles.value}>
            {tutorJob.otherRequirement || "None"}
          </Text>
        </View>
      </ScrollView>

      {user?.userType === "tutor" && (
        <View style={styles.buttonContainer}>
          <Button title="Location" buttonStyle={styles.button} />
          <Button title="Direction" buttonStyle={styles.button} />
          <Button
            title="Apply"
            buttonStyle={styles.button}
            onPress={handleApplyBooking}
          />
        </View>
      )}

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.iconContainer}>
              <Text
                style={[
                  styles.icon,
                  modalType === "success"
                    ? styles.successIcon
                    : styles.errorIcon,
                ]}
              >
                {modalType === "success" ? "✓" : "✗"}
              </Text>
            </View>
            <Text style={styles.modalTitle}>
              {modalType === "success" ? "Success!" : "Oops!"}
            </Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dddddd",
    overflow: "hidden",
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  link: {
    fontSize: 14,
    color: "#555555",
    textAlign: "center",
  },
  jobId: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333333",
  },
  postedDate: {
    fontSize: 12,
    color: "#777777",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 25,
    textAlign: "center",
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
    textAlign: "right",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#eeeeee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  successIcon: {
    color: "green",
    fontSize: 30,
  },
  errorIcon: {
    color: "red",
    fontSize: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default BookingDetail;
