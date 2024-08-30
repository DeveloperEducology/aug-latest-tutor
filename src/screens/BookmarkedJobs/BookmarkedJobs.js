import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";
import { Card } from "react-native-elements";
import Header2 from "../../components/Header2";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookmarkedJobs = ({ navigation }) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  console.log("bookmarkedIds", bookmarkedIds);

  useEffect(() => {
    // Load bookmarked IDs from AsyncStorage on mount
    setLoading(true);
    const loadBookmarkedIds = async () => {
      try {
        const savedIds = await AsyncStorage.getItem("bookmarkedIds");
        if (savedIds) {
          setBookmarkedIds(JSON.parse(savedIds));
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load bookmarked IDs", error);
      }
    };

    loadBookmarkedIds();
  }, []);

  useEffect(() => {
    const fetchBookmarkedJobs = async () => {
      try {
        const response = await fetch(
          "http://192.168.29.101:3000/fetch-bookmarked-jobs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: bookmarkedIds }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setBookmarkedJobs(data);
        } else {
          console.error("Error fetching bookmarked jobs:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedJobs();
  }, [bookmarkedIds]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Header2
        title="My Bookmarked Jobs"
        isBackButtonVisible="true"
        onBackPress={() => navigation.goBack()}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        bookmarkedJobs.map((item) => (
          <Card containerStyle={styles.card}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.info}>
                Need Tuition for {item.course?.name || "N/A"}
              </Text>

              <Button
                title="View"
                buttonStyle={styles.button}
                onPress={() =>
                  navigation.navigate("BookingDetail", { tutorJob: item })
                }
              />
            </View>
            <Card.Divider />
            <Text style={styles.info}>Category: {item.category.name}</Text>
            <Text style={styles.info}>
              Subjects: {item.subjects.map((sub) => sub.name).join(", ")}
            </Text>
            <Text style={styles.info}>City: {item.city.name}</Text>
            <Text style={styles.info}>Tuition Type: {item.tuitionType}</Text>
            <Text style={styles.info}>
              Student Gender: {item.studentGender}
            </Text>
            <Text style={styles.info}>Tutor Gender: {item.tutorGender}</Text>
            <Text style={styles.info}>
              Number of Students: {item.numStudents}
            </Text>
            <Text style={styles.info}>
              Other Requirement: {item.otherRequirement}
            </Text>
            <Text style={styles.info}>
              Class Need Days:{" "}
              {item.days.map((sub) => sub?.name).join(", ") ||
                "No specific days"}
            </Text>
          </Card>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default BookmarkedJobs;
