import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { FifthClass } from "./src/fifth-class";
import { FirstClass } from "./src/first-class";
import { ForthClass } from "./src/forth-class";
import { SecondClass } from "./src/second-class";
import { ThirdClass } from "./src/third-class";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Forth"
          screenOptions={{
            sceneContainerStyle: styles.container,
            unmountOnBlur: true,
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
          <Drawer.Screen
            name="Forth"
            component={ForthClass}
            options={{
              headerTitle: "Interpolate Colors",
            }}
          />
          <Drawer.Screen
            name="Fifth"
            component={FifthClass}
            options={{
              headerTitle: "Pinch Gesture",
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
