import React from 'react';
import { Button } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const generatePDF = async (profile) => {
  let options = {
    html: `
      <h1 style="text-align: center;">${profile.name}</h1>
      <img src="${profile.profilePicture}" style="width: 100px; height: 100px; border-radius: 50%; display: block; margin: 0 auto;" />
      <h2>Contact Information</h2>
      <p>${profile.contactInfo}</p>
      <h2>Subjects</h2>
      <p>${profile.subjects.join(', ')}</p>
      <h2>Education</h2>
      <p>${profile.education}</p>
      <h2>Experience</h2>
      <p>${profile.experience}</p>
      <h2>Skills</h2>
      <p>${profile.skills.join(', ')}</p>
      <h2>Certifications</h2>
      <p>${profile.certifications.join(', ')}</p>
      <h2>Languages Spoken</h2>
      <p>${profile.languages.join(', ')}</p>
      <h2>Availability</h2>
      <p>${profile.availability}</p>
    `,
    fileName: 'TutorProfile',
    directory: 'Documents',
  };

  let file = await RNHTMLtoPDF.convert(options);
  console.log(file.filePath);
  alert(`PDF created at: ${file.filePath}`);
};

const TutorProfilePDFButton = ({ profile }) => {
  return (
    <Button title="Generate PDF" onPress={() => generatePDF(profile)} />
  );
};

export default TutorProfilePDFButton;
