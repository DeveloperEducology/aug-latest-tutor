import React, { useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

const ListComponent = ({
  title,
  items,
  selectedItems,
  handleSelection,
  searchQuery,
  setSearchQuery,
  onClose,
}) => {
  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>{title}</Text>
        <TouchableOpacity onPress={onClose}>
          <Feather name="x" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView>
        {filteredItems.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => handleSelection(item._id)}
            style={[
              styles.itemContainer,
              selectedItems.includes(item._id) && styles.selectedItem,
            ]}
          >
            <Text style={styles.itemText}>{item.name}</Text>
            {selectedItems.includes(item._id) && (
              <Feather name="check" size={20} color="#007bff" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchInput: {
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  itemContainer: {
    padding: 12,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedItem: {
    backgroundColor: "#f0f8ff",
  },
  itemText: {
    fontSize: 18,
  },
});

export default ListComponent;
