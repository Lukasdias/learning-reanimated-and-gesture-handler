import React, { FC, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

export const Header: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const y = useSharedValue(Dimensions.get("window").height / 2);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.35);

  const rStyle = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
      transform: [{ translateY: y.value }, { scale: scale.value }],
    }),
    []
  );

  useEffect(() => {
    y.value = withDelay(
      150,
      withSpring(0, {
        damping: 10,
        stiffness: 100,
      })
    );
    opacity.value = withDelay(
      150,
      withSpring(1, {
        damping: 10,
        stiffness: 100,
      })
    );
    scale.value = withDelay(
      150,
      withSpring(1, {
        damping: 10,
        stiffness: 100,
      })
    );
  }, []);

  return (
    <Animated.Text style={[styles.text, rStyle]}>{children}</Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
