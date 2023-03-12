import { FlashList } from "@shopify/flash-list";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import Image1 from "./assets/image1.png";
import Image2 from "./assets/image2.png";
import Image3 from "./assets/image3.png";

import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  interpolate,
  Extrapolate,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  withTiming,
} from "react-native-reanimated";
import { useRef } from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface OnboardingItemProps {
  src: ImageSourcePropType;
  title: string;
  body: string;
  x: Animated.SharedValue<number>;
  index: number;
}

interface OnboardingProps {
  data: Omit<OnboardingItemProps, "x" | "index">[];
}

interface OnboardingPaginationProps {
  data: Omit<OnboardingItemProps, "x" | "index">[];
  x: Animated.SharedValue<number>;
  screenWidth: number;
}

interface OnboardingPaginationButtonProps {
  flatListRef: React.RefObject<Animated.FlatList<OnboardingItemProps>>;
  flatListIndex: Animated.SharedValue<number>;
  dataLength: number;
}

interface OnboardingPaginationDotProps {
  x: Animated.SharedValue<number>;
  index: number;
  screenWidth: number;
}

const LoremTitle = "Lorem ipsum dolor sit amet";
const LoremBody = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec aliquam aliquam, nunc nisl aliquet nunc, eget aliquam nisl nisl sit amet lorem. Sed euismod, nisl nec aliquam aliquam, nunc nisl aliquet nunc, eget.  
`;

const OnboardingItem = ({
  src,
  body,
  title,
  x,
  index,
}: OnboardingItemProps) => {
  const textStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  const imageStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.onBoardingItemContainer]}>
      <Animated.Image
        source={src}
        style={[
          {
            width: SCREEN_WIDTH * 0.8,
            height: SCREEN_WIDTH * 0.8,
          },
          imageStyles,
        ]}
      />
      <Animated.View style={textStyles}>
        <Text style={styles.onboardingItemTitle}>{title}</Text>
        <Text style={styles.onboardingItemBody}>{body}</Text>
      </Animated.View>
    </Animated.View>
  );
};

const AnimatedFlashList = Animated.createAnimatedComponent(
  FlashList<OnboardingItemProps>
);

const Onboarding = ({ data }: OnboardingProps) => {
  const x = useSharedValue(0);
  const flatListRef = useAnimatedRef<Animated.FlatList<OnboardingItemProps>>();
  const flatListIndex = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: any;
  }) => {
    flatListIndex.value = viewableItems[0].index;
  };

  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  return (
    <>
      <Animated.FlatList
        ref={flatListRef}
        viewabilityConfigCallbackPairs={
          viewabilityConfigCallbackPairs.current as any
        }
        onScroll={onScroll}
        data={data as OnboardingItemProps[]}
        renderItem={({ item, index }) => (
          <OnboardingItem
            src={item.src}
            body={item.body}
            title={item.title}
            x={x}
            index={index}
          />
        )}
        keyExtractor={(item) => item.src.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <OnboardingPagination data={data} x={x} screenWidth={SCREEN_WIDTH} />
        <OnboardingPaginationButton
          dataLength={data.length}
          flatListIndex={flatListIndex}
          flatListRef={flatListRef}
        />
      </View>
    </>
  );
};

const OnboardingPaginationDot = ({
  index,
  screenWidth,
  x,
}: OnboardingPaginationDotProps) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * screenWidth,
        index * screenWidth,
        (index + 1) * screenWidth,
      ],
      [10, 20, 10],
      Extrapolate.CLAMP
    );
    const backgroundColorAnimation = interpolateColor(
      x.value,
      [
        (index - 1) * screenWidth,
        index * screenWidth,
        (index + 1) * screenWidth,
      ],
      ["orange", "green", "orange"]
    );
    return {
      width: widthAnimation,
      backgroundColor: backgroundColorAnimation,
    };
  });
  return (
    <Animated.View style={[styles.onboardingPaginationDot, animatedDotStyle]} />
  );
};

const OnboardingPaginationButton = ({
  dataLength,
  flatListIndex,
  flatListRef,
}: OnboardingPaginationButtonProps) => {
  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      justifyContent: "center",
      alignItems: "center",
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 50,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      width: 30,
      height: 30,
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });
  return (
    <TouchableOpacity
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({
            index: flatListIndex.value + 1,
          });
        } else {
          console.log("done");
        }
      }}
    >
      <Animated.View
        style={[
          styles.onboardingPaginationButtonContainer,
          buttonAnimationStyle,
        ]}
      >
        <Animated.Text
          style={[styles.onboardingPaginationButtonText, textAnimationStyle]}
        >
          Get started
        </Animated.Text>
        <Animated.Image
          source={require("./assets/ArrowIcon.png")}
          style={[styles.onboardingArrowIcon, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const OnboardingPagination = ({
  data,
  x,
  screenWidth,
}: OnboardingPaginationProps) => {
  return (
    <View style={styles.onboardingPaginationContainer}>
      {data.map((_, index) => {
        return (
          <OnboardingPaginationDot
            key={index}
            index={index}
            x={x}
            screenWidth={screenWidth}
          />
        );
      })}
    </View>
  );
};

export const SixthClass = () => {
  return (
    <View style={styles.container}>
      <Onboarding
        data={[
          {
            src: Image1,
            title: LoremTitle,
            body: LoremBody,
          },
          {
            src: Image2,
            title: LoremTitle,
            body: LoremBody,
          },
          {
            src: Image3,
            title: LoremTitle,
            body: LoremBody,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: "#F8E9B0",
    justifyContent: "space-between",
  },
  onBoardingItemContainer: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#F8E9B0",
  },
  onboardingItemTitle: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  onboardingItemBody: {
    color: "black",
    textAlign: "center",
    lineHeight: 20,
    marginHorizontal: 35,
  },
  onboardingPaginationContainer: {
    height: 40,
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 20,
    alignItems: "center",
  },
  onboardingPaginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "orange",
    marginHorizontal: 10,
  },
  onboardingPaginationButtonContainer: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginRight: 24,
  },
  onboardingArrowIcon: {
    position: "absolute",
  },
  onboardingPaginationButtonText: {
    color: "white",
    fontSize: 16,
    position: "absolute",
  },
});
