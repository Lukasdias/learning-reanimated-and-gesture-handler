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

import { FirstClass } from "./src/first-class";
import { SecondClass } from "./src/second-class";
import { ThirdClass } from "./src/third-class";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <FirstClass /> */}
        {/* <SecondClass /> */}
        <ThirdClass />
      </View>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
