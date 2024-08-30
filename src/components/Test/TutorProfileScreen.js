import React, { useState } from 'react';
import { View } from 'react-native';
import TutorProfile from './TutorProfiless';
import TutorProfilePDFButton from './TutorProfilePDFButton';
import TutorProfileShareButton from './TutorProfileShareButton';

const profile = {
    profilePicture: 'https://example.com/profile.jpg',
    name: 'John Doe',
    contactInfo: 'johndoe@example.com | +1234567890',
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    education: 'M.Sc. in Physics, ABC University',
    experience: '5 years of experience teaching high school and college students.',
    skills: ['Critical Thinking', 'Problem Solving', 'Effective Communication'],
    certifications: ['Certified Physics Teacher', 'Advanced Mathematics Certificate'],
    languages: ['English', 'Spanish'],
    availability: 'Monday to Friday, 9 AM - 5 PM',
  };

const TutorProfileScreen = ({ profile }) => {
  const [pdfPath, setPdfPath] = useState(null);

  const handlePDFGeneration = async () => {
    const file = await generatePDF(profile);
    setPdfPath(file.filePath);
  };

  return (
    <View style={{ flex: 1 }}>
      <TutorProfile profile={profile} />
      <TutorProfilePDFButton profile={profile} onPDFGenerated={handlePDFGeneration} />
      {pdfPath && <TutorProfileShareButton filePath={pdfPath} />}
    </View>
  );
};

export default TutorProfileScreen;
