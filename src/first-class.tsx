import { useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

const SIZE = 100;

const handleRotation = (progress: Animated.SharedValue<number>) => {
  "worklet"; // this is required for worklet to work
  return `${progress.value * 2 * Math.PI}rad`;
};

export const FirstClass = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);
  const [x, y] = [useSharedValue(0), useSharedValue(0)];

  const rStyle = useAnimatedStyle(
    () => ({
      borderRadius: (SIZE * progress.value) / 4,
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { scale: scale.value },
        {
          rotate: handleRotation(progress),
        },
      ],
    }),
    []
  );

  useEffect(() => {
    progress.value = withRepeat(
      withSpring(1, {
        stiffness: 10,
      }),
      -1,
      true
    );
    scale.value = withRepeat(
      withSpring(1, {
        stiffness: 10,
      }),
      -1,
      true
    );
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: SIZE,
          height: SIZE,
          backgroundColor: "#c2c2c2",
        },
        rStyle,
      ]}
    />
  );
};
