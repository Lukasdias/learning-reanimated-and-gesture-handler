import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import { CarrouselPage } from "./components/carrousel-page";
import { CarrouselPageDot } from "./components/carrousel-page-dot";
import { fillArray } from "./utils";

const SIZE = 100;
const { width, height } = Dimensions.get("window");
const pages = fillArray(10);

export function ThirdClass() {
  const progress = useSharedValue(0);
  const current = useDerivedValue(() => {
    const max = width * (pages.length - 1);
    const value = Math.min(Math.floor(progress.value / width), max / width);
    return value;
  }, []);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    progress.value = e.contentOffset.x;
  });

  const scrollRef = useRef<Animated.ScrollView | null>(null);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={[styles.container]}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {pages.map((page, index) => (
          <CarrouselPage
            key={index}
            idx={index}
            title={page}
            progress={progress}
          />
        ))}
      </Animated.ScrollView>
      <CarrouselPageDot current={current} length={pages.length} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
  },
  box: {
    width: SIZE,
    height: SIZE,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "tomato",
  },
});
