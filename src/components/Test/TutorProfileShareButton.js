import React from 'react';
import Share from 'react-native-share';

const sharePDF = (filePath) => {
  const shareOptions = {
    title: 'Share PDF',
    url: `file://${filePath}`,
    type: 'application/pdf',
  };

  Share.open(shareOptions)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const TutorProfileShareButton = ({ filePath }) => {
  return (
    <Button title="Share PDF" onPress={() => sharePDF(filePath)} />
  );
};

export default TutorProfileShareButton;
