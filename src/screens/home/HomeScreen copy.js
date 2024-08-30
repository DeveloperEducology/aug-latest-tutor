import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Carousel from "react-native-reanimated-carousel";
import Header from "../../components/Header";

const { width } = Dimensions.get("window");

const categories = [
  { _id: "1", name: "School", value: "school", icon: "school-outline" },
  { _id: "2", name: "College", value: "college", icon: "business-outline" },
  {
    _id: "3",
    name: "Pre-School",
    value: "pre-school",
    icon: "color-filter-outline",
  },
  { _id: "4", name: "Art", value: "art", icon: "musical-notes-outline" },
  {
    _id: "5",
    name: "Engineering",
    value: "engineering",
    icon: "build-outline",
  },
  { _id: "6", name: "Medical", value: "medical", icon: "fitness-outline" },
  { _id: "7", name: "IIT-JEE", value: "IIT_JEE", icon: "newspaper-outline" },
  { _id: "8", name: "NEET", value: "neet", icon: "nutrition-outline" },
];

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeScreen = ({ navigation }) => {
  const [showAllCategories, setShowAllCategories] = useState(false);

  const toggleCategories = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowAllCategories(!showAllCategories);
  };

  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, 2);

  return (
    <ScrollView style={styles.container}>
      <Header />
      {/* Carousel */}
      <View style={styles.imageContainer}>
        <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay={true}
          data={[
            "https://th.bing.com/th/id/OIP.NqY3rNMnx2NXYo3KJfg43gHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7",
            "https://th.bing.com/th/id/OIP.0yi26fO0azz9oRCE5I59zgHaE8?w=285&h=190&c=7&r=0&o=5&pid=1.7",
            "https://th.bing.com/th/id/OIP.hCfHyL8u8XAbreXuaiTMQgHaHZ?w=166&h=196&c=7&r=0&o=5&pid=1.7",
          ]}
          scrollAnimationDuration={2000}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image style={styles.carouselImage} source={{ uri: item }} />
            </View>
          )}
        />
      </View>
      {/* Categories */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity onPress={toggleCategories}>
          <Text style={styles.viewAllText}>
            {showAllCategories ? "Show Less" : "View All"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoriesContainer}>
        {displayedCategories.map((category) => (
          <TouchableOpacity
            key={category._id}
            style={styles.categoryButton}
            onPress={() =>
              navigation.navigate("TutorsCategories", {
                categoryId: category._id,
              })
            }
          >
            <Icon name={category.icon} size={30} color="#fff" />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Testtimonial Carousel */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Testimonials</Text>
        <TouchableOpacity onPress={toggleCategories}>
          <Text style={styles.viewAllText}>
            {showAllCategories ? "Show Less" : "View All"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay={true}
          data={[
            "https://th.bing.com/th/id/OIP.NqY3rNMnx2NXYo3KJfg43gHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7",
            "https://th.bing.com/th/id/OIP.0yi26fO0azz9oRCE5I59zgHaE8?w=285&h=190&c=7&r=0&o=5&pid=1.7",
            "https://th.bing.com/th/id/OIP.hCfHyL8u8XAbreXuaiTMQgHaHZ?w=166&h=196&c=7&r=0&o=5&pid=1.7",
          ]}
          scrollAnimationDuration={10000}
          renderItem={({ item }) => (
            <View style={styles.TestcarouselItem}>
              <View style={{width: "20%"}}>
                <Image
                  style={styles.TestcarouselImage}
                  source={{ uri: item }}
                />
                <Text>Mr. Luther</Text>
              </View>
              <View style={{width: "80%"}}>
                <Text>
                  I had the pleasure of being tutored by Mr. John Doe for my
                  high school math courses, and I can confidently say that he is
                  one of the best teachers I've ever had. Before I started with
                  him, I struggled to understand complex math concepts and often
                  felt overwhelmed. But Mr. Doe's patient and methodical
                  approach made all the difference.
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3D3D3D",
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6200ea",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  categoryButton: {
    width: "48%",
    alignItems: "center",
    backgroundColor: "#6200ea",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  imageContainer: {
    marginVertical: 20,
  },
  carouselItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  TestcarouselItem: {
    justifyContent: "center",
    alignItems: "center",
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  TestcarouselImage: {
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
  },
});
