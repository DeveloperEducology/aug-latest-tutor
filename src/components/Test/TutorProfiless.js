import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const TutorProfile = ({ profile }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: profile.profilePicture }} style={styles.profileImage} />
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.info}>Contact: {profile.contactInfo}</Text>
      <Text style={styles.info}>Subjects: {profile.subjects.join(', ')}</Text>
      <Text style={styles.sectionTitle}>Education</Text>
      <Text style={styles.info}>{profile.education}</Text>
      <Text style={styles.sectionTitle}>Experience</Text>
      <Text style={styles.info}>{profile.experience}</Text>
      <Text style={styles.sectionTitle}>Skills</Text>
      <Text style={styles.info}>{profile.skills.join(', ')}</Text>
      <Text style={styles.sectionTitle}>Certifications</Text>
      <Text style={styles.info}>{profile.certifications.join(', ')}</Text>
      <Text style={styles.sectionTitle}>Languages Spoken</Text>
      <Text style={styles.info}>{profile.languages.join(', ')}</Text>
      <Text style={styles.sectionTitle}>Availability</Text>
      <Text style={styles.info}>{profile.availability}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
});

export default TutorProfile;
