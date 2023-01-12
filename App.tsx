import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { FirstClass } from "./src/first-class";
import { SecondClass } from "./src/second-class";
import { ThirdClass } from "./src/third-class";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="First"
          screenOptions={{
            sceneContainerStyle: styles.container,
          }}
        >
          <Drawer.Screen
            name="First"
            component={FirstClass}
            options={{
              headerTitle: "Simple Operations",
            }}
          />
          <Drawer.Screen
            name="Second"
            component={SecondClass}
            options={{
              headerTitle: "Pan Gesture",
            }}
          />
          <Drawer.Screen
            name="Third"
            component={ThirdClass}
            options={{
              headerTitle: "Carrousel",
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#fff",
  },
});
