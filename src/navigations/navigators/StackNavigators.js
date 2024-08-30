import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CatWiseTutors from "../../screens/CatWiseTutors/CatWiseTutors";
import MyTabs from "./TabNavigator";

const MyStack = createNativeStackNavigator();
const MyStacks = () => {
  return (
    <>
      <MyStack.Navigator
        initialRouteName="MyTabs"
        screenOptions={{ headerShown: false }}
      >
        <MyStack.Screen name="MyTabs" component={MyTabs} />
        <MyStack.Screen
          name="CatWiseTutors"
          component={CatWiseTutors}
          options={{ headerShown: true }}
        />
      </MyStack.Navigator>
      // <Toast position="bottom" />
    </>
  );
};

export default MyStackNavigator;
