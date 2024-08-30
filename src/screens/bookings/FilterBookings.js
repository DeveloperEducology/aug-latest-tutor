import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ButtonGroup } from 'react-native-elements';
import Header2 from '../../components/Header2';

const FilterBookings = ({onClose}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [selectedTuitionTypeIndex, setSelectedTuitionTypeIndex] = useState([]);

  const tuitionTypes = ['Home', 'Online', 'Group', 'Package'];

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const handleStartConfirm = (date) => {
    setStartDate(date.toISOString().split('T')[0]);
    setStartDatePickerVisibility(false);
  };

  const handleEndConfirm = (date) => {
    setEndDate(date.toISOString().split('T')[0]);
    setEndDatePickerVisibility(false);
  };

  const handleTuitionTypeSelection = (selectedIndexes) => {
    setSelectedTuitionTypeIndex(selectedIndexes);
  };

  return (
    <View style={styles.container}>
    <Header2 title="Filter Bookings" isBackButtonVisible={true} onBackPress={onClose} />
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

      <Text style={styles.label}>Tuition Type</Text>
      <ButtonGroup
        buttons={tuitionTypes}
        selectMultiple
        onPress={handleTuitionTypeSelection}
        selectedIndexes={selectedTuitionTypeIndex}
        containerStyle={styles.buttonGroup}
      />

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Country</Text>
        <Text style={styles.label}>City</Text>
        {/* Replace these with actual dropdowns */}
        <TextInput style={styles.dropdown} placeholder="Select Country" />
        <TextInput style={styles.dropdown} placeholder="Select City" />
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Category</Text>
        <Text style={styles.label}>Class</Text>
        {/* Replace these with actual dropdowns */}
        <TextInput style={styles.dropdown} placeholder="Select your preferable categories" />
        <TextInput style={styles.dropdown} placeholder="Select your preferable classes" />
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Student Gender</Text>
        <Text style={styles.label}>Tutor Gender</Text>
        {/* Replace these with actual dropdowns */}
        <TextInput style={styles.dropdown} placeholder="Select Student Gender" />
        <TextInput style={styles.dropdown} placeholder="Select Tutor Gender" />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffff',
    flex: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePicker: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 5,
  },
  dateInput: {
    borderColor: '#d1d1d1',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  buttonGroup: {
    marginBottom: 20,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdown: {
    flex: 1,
    borderColor: '#d1d1d1',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  applyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FilterBookings;
