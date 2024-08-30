import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TutorSearchScreen = ({ visible, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const subjects = [
    { id: "1", name: "Mathematics" },
    { id: "2", name: "Physics" },
    { id: "3", name: "Chemistry" },
    { id: "4", name: "Biology" },
    { id: "5", name: "Computer Science" },
    { id: "6", name: "English" },
    { id: "7", name: "History" },
    { id: "8", name: "Geography" },
  ];

  const tutors = [
    { id: "1", name: "John Doe", subject: "Mathematics" },
    { id: "2", name: "Jane Smith", subject: "Physics" },
    { id: "3", name: "Michael Johnson", subject: "Chemistry" },
    { id: "4", name: "Emily Davis", subject: "Biology" },
    { id: "5", name: "Robert Brown", subject: "Computer Science" },
    { id: "6", name: "Alice Wilson", subject: "English" },
    { id: "7", name: "Tom Clark", subject: "History" },
    { id: "8", name: "Lee  fuf", subject: "Geography" },
    { id: "9", name: "John Lee", subject: "Geography" },
    { id: "10", name: "Mary King", subject: "Geography" },
  ];

  const filteredTutors = tutors.filter(
    (tutor) =>
      (!selectedSubject || tutor.subject === selectedSubject) &&
      (!searchQuery ||
        tutor.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelect = (value) => {
    setSelectedSubject(value);
    setSearchQuery(value);
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const clear = () => {
    setSelectedSubject("");
    setSearchQuery("");
  };

  const renderSubject = ({ item }) => (
    <TouchableOpacity
      style={styles.subjectItem}
      onPress={() => handleSelect(item.name)}
    >
      <Text style={styles.subjectText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderTutor = ({ item }) => (
    <View style={styles.tutorItem}>
      <Text style={styles.tutorName}>{item.name}</Text>
      <Text style={styles.tutorSubject}>{item.subject}</Text>
    </View>
  );

  return (
    <Modal visible={visible} animationType="fade">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Search Tutors</Text>
          <Icon
            name="close-outline"
            size={30}
            color="#000"
            onPress={onClose}
          />
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Tutors"
            value={searchQuery}
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
              data={subjects}
              renderItem={renderSubject}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.row}
            />
          </>
        ) : null}

        {selectedSubject && (
          <>
            <Text style={styles.sectionTitle}>
              Tutors for {selectedSubject}
            </Text>
            <FlatList
              data={filteredTutors}
              renderItem={renderTutor}
              keyExtractor={(item) => item.id}
              numColumns={1}
            />
          </>
        )}
      </SafeAreaView>
    </Modal>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3D3D3D",
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
