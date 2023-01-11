import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

const SIZE = 100;

export function ThirdClass() {
  const progress = useSharedValue(0.5);

  const rStyles = useAnimatedStyle(
    () => ({
      opacity: progress.value,
      transform: [{ scale: progress.value }],
    }),
    []
  );

  useEffect(() => {
    progress.value = withRepeat(withSpring(1), -1, true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, rStyles]}></Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: SIZE,
    height: SIZE,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "tomato",
  },
});
