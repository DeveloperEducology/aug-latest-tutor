import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header2 from "../../components/Header2";

const CatWiseTutors = ({ route, navigation }) => {
  const { categoryId } = route.params;
  return (
    <View>
      <Header2
        title="Category wise tutors"
        isBackButtonVisible={true}
        onBackPress={() => navigation.goBack()}
      />
      <Text>CatWiseTutors {categoryId}</Text>
    </View>
  );
};

export default CatWiseTutors;

const styles = StyleSheet.create({});
