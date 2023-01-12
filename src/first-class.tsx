import { useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import { Header } from "./components/header";
import { random } from "./utils";

const SIZE = 100;

const handleRotation = (progress: Animated.SharedValue<number>) => {
  "worklet"; // this is required for worklet to work
  return `${progress.value * 2 * Math.PI}rad`;
};

export const FirstClass = () => {
  const progress = useSharedValue(0.1);

  const rStyle = useAnimatedStyle(
    () => ({
      opacity: progress.value,
      transform: [{ rotate: handleRotation(progress) }],
      width: SIZE * progress.value,
      height: SIZE * progress.value,
      borderRadius: (progress.value * SIZE) / 4,
      backgroundColor: `hsl(${random(0, 320)}, ${random(0, 99)}%, 50%))`,
    }),
    []
  );

  useEffect(() => {
    progress.value = withRepeat(
      withSpring(2, {
        damping: 10,
        restSpeedThreshold: 0.01,
      }),
      -1,
      true
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header>First Class - Simple Operations</Header>
      <Animated.View
        style={[
          {
            width: SIZE,
            height: SIZE,
          },
          rStyle,
        ]}
      />
    </View>
  );
};
