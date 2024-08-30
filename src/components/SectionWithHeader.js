// SectionWithHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // or the icon library you're using

const SectionWithHeader = ({ title, onEditPress, children, selectedItems }) => {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <TouchableOpacity onPress={onEditPress}>
          <Icon name="caret-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 15, // Shadow on Android
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D4E89',
  },
});

export default SectionWithHeader;
