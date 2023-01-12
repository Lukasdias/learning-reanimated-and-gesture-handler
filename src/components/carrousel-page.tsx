import React, { memo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { random } from "../utils";

interface Props {
  idx: number;
  title: string;
  progress: Animated.SharedValue<number>;
}

const { width, height } = Dimensions.get("window");
const BOX_SIZE = width * 0.7;

export const CarrouselPage: React.FC<Props> = ({ idx, title, progress }) => {
  const iRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      iRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      progress.value,
      iRange,
      [0, BOX_SIZE / 2, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
      borderRadius,
    };
  }, []);

  const rTextStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      progress.value,
      iRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      progress.value,
      iRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }],
    };
  }, []);

  return (
    <View
      style={[
        styles.container,
        ,
        {
          backgroundColor: `hsl(${random(0, 358)}, 78%, 65%))`,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.box,
          {
            backgroundColor: `hsl(${random(0, 358)}, 78%, 65%))`,
          },
          animatedStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            position: "absolute",
          },
          rTextStyles,
        ]}
      >
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tomato",
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
  },
  text: {
    fontSize: 70,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
