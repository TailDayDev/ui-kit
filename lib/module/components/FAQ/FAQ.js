"use strict";

import { useEffect, useRef, useState } from 'react';
import { Animated, LayoutAnimation, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ArrowDropDownIcon } from "../../icons/ArrowDropDownIcon.js";
import { Text } from "../../primitives/Text/index.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { BaseSkeleton } from "../BaseSkeleton/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** App arrow frame (12×8 glyph centred in a 24pt box). */
const ARROW_BOX_SIZE = 24;
/** App arrow rotation spring. */
const ARROW_SPRING_FRICTION = 8;
/** App row pressed opacity: no feedback. */
const ROW_PRESSED_OPACITY = 1;
/** App skeleton metrics. */
const SKELETON_TITLE_HEIGHT = 28;
const SKELETON_TITLE_WIDTH = '55%';
const SKELETON_ROW_HEIGHT = 64;
const SKELETON_ROW_COUNT = 3;
const createStyles = theme => StyleSheet.create({
  accordionContainer: {
    backgroundColor: theme.colors.bg.subtle,
    paddingHorizontal: theme.space[6],
    paddingTop: theme.space[6]
  },
  accordionContent: {
    width: '100%'
  },
  accordionHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  accordionTitle: {
    paddingRight: theme.space[8]
  },
  accordionWrapper: {
    borderBottomColor: theme.colors.border.default,
    borderBottomWidth: theme.stroke[1],
    borderStyle: 'solid',
    gap: theme.space[2],
    paddingBottom: theme.space[6]
  },
  container: {
    backgroundColor: theme.colors.bg.subtle,
    flex: 1,
    paddingVertical: theme.space[8]
  },
  icon: {
    alignItems: 'center',
    height: ARROW_BOX_SIZE,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    width: ARROW_BOX_SIZE
  },
  title: {
    paddingHorizontal: theme.space[6]
  },
  skeletonTitle: {
    paddingHorizontal: theme.space[6],
    marginBottom: theme.space[6]
  },
  skeletonList: {
    gap: theme.space[3],
    paddingHorizontal: theme.space[6],
    paddingBottom: theme.space[2]
  }
});

/** Caret that turns 180° when its row is expanded (app `ArrowDropDown`). */
const RotatingArrow = ({
  isRotated
}) => {
  const theme = useTheme();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(rotateAnim, {
      toValue: isRotated ? 1 : 0,
      friction: ARROW_SPRING_FRICTION,
      useNativeDriver: true
    }).start();
  }, [isRotated, rotateAnim]);
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });
  return /*#__PURE__*/_jsx(Animated.View, {
    style: {
      transform: [{
        rotate
      }]
    },
    children: /*#__PURE__*/_jsx(ArrowDropDownIcon, {
      color: theme.colors.icon.default
    })
  });
};

/** Accordion list of questions; tapping a question shows its answer. */
export const FAQ = ({
  faqData,
  loading = false,
  testID
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const [expandedIds, setExpandedIds] = useState([]);
  const handleAccordionPress = id => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  if (loading) {
    return /*#__PURE__*/_jsxs(View, {
      style: styles.container,
      testID: testID ? `${testID}.skeleton` : undefined,
      children: [/*#__PURE__*/_jsx(View, {
        style: styles.skeletonTitle,
        children: /*#__PURE__*/_jsx(BaseSkeleton, {
          height: SKELETON_TITLE_HEIGHT,
          width: SKELETON_TITLE_WIDTH,
          borderRadius: theme.radius.sm
        })
      }), /*#__PURE__*/_jsx(View, {
        style: styles.skeletonList,
        children: Array.from({
          length: SKELETON_ROW_COUNT
        }, (_, index) => /*#__PURE__*/_jsx(BaseSkeleton, {
          height: SKELETON_ROW_HEIGHT,
          borderRadius: theme.radius.md
        }, index))
      })]
    });
  }
  if (!faqData.items.length) {
    return null;
  }
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    testID: testID ? `${testID}.loaded` : undefined,
    children: [/*#__PURE__*/_jsx(Text, {
      variant: "largeTitle/semibold",
      color: "primary",
      style: styles.title,
      children: faqData.title
    }), faqData.items.map((item, index) => {
      const isExpanded = expandedIds.includes(item.id);
      return /*#__PURE__*/_jsx(TouchableOpacity, {
        onPress: () => handleAccordionPress(item.id),
        style: styles.accordionContainer,
        activeOpacity: ROW_PRESSED_OPACITY,
        accessibilityRole: "button",
        accessibilityState: {
          expanded: isExpanded
        },
        testID: testID ? `${testID}.item.${index}` : undefined,
        children: /*#__PURE__*/_jsxs(View, {
          style: styles.accordionWrapper,
          children: [/*#__PURE__*/_jsxs(View, {
            style: styles.accordionHeader,
            children: [/*#__PURE__*/_jsx(Text, {
              variant: "headline/medium",
              color: "primary",
              style: styles.accordionTitle,
              children: item.title
            }), /*#__PURE__*/_jsx(View, {
              style: styles.icon,
              children: /*#__PURE__*/_jsx(RotatingArrow, {
                isRotated: isExpanded
              })
            })]
          }), isExpanded ? /*#__PURE__*/_jsx(View, {
            style: styles.accordionContent,
            children: /*#__PURE__*/_jsx(Text, {
              variant: "body/regular",
              color: "primary",
              children: item.description
            })
          }) : null]
        })
      }, item.id);
    })]
  });
};
//# sourceMappingURL=FAQ.js.map