import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {};

const SIZE = 100;
const CIRCLE_RADIUS = 150;

type GestureContext = {
  translateX: number;
  translateY: number;
};

export function SecondClass({}: Props) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart: (e, ctx) => {
      ctx.translateX = translateX.value;
      ctx.translateY = translateY.value;
    },
    onActive: (e, ctx) => {
      translateX.value = withSpring(e.translationX + ctx.translateX, {
        damping: 10,
        stiffness: 100,
      });
      translateY.value = withSpring(e.translationY + ctx.translateY, {
        damping: 10,
        stiffness: 100,
      });
    },
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0, {
          damping: 10,
          stiffness: 100,
        });
        translateY.value = withSpring(0, {
          damping: 10,
          stiffness: 100,
        });
      }
    },
  });

  const rStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    }),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.square, rStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "purple",
    borderRadius: SIZE / 4,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "purple",
  },
});
