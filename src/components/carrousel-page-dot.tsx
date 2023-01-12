import React, { memo, useEffect, useMemo, useRef } from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { fillArray, random } from "../utils";

// import { Container } from './styles';

interface DotProps {
  index: number;
  current: Readonly<SharedValue<number>>;
}

const Dot: React.FC<DotProps> = ({ current, index }) => {
  const scale = useDerivedValue(() =>
    current.value === index
      ? withSpring(1, {
          damping: 20,
        })
      : withSpring(0, {
          damping: 20,
        })
  );
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }],
    }),
    [current, index]
  );

  return (
    <View
      style={{
        width: 16,
        height: 16,
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: 4,
      }}
    >
      <Animated.View
        style={[
          {
            flex: 1,
            borderRadius: 10,
            backgroundColor: "white",
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

interface CarrouselPageDotProps {
  length: number;
  current: Readonly<Animated.SharedValue<number>>;
}

function getIfIsActive(
  index: number,
  current: Readonly<Animated.SharedValue<number>>
) {
  "worklet";
  return index === current.value;
}

export const CarrouselPageDot: React.FC<CarrouselPageDotProps> = ({
  current,
  length,
}) => {
  const dots = fillArray(length).map((_, index) => ({
    active: getIfIsActive(index, current),
  }));

  const translateY = useSharedValue(100);
  const scale = useSharedValue(0.3);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateY: translateY.value },
        {
          scale: scale.value,
        },
      ],
    }),
    []
  );

  useEffect(() => {
    translateY.value = withDelay(250, withSpring(0, { stiffness: 100 }));
    scale.value = withDelay(250, withSpring(0.5, { stiffness: 100 }));
  }, []);

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: 24,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: Dimensions.get("window").width,
        },
        animatedStyle,
      ]}
    >
      {dots?.map((d, index) => (
        <Dot key={index} index={index} current={current} />
      ))}
    </Animated.View>
  );
};
