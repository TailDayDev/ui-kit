"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FAQ = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _ArrowDropDownIcon = require("../../icons/ArrowDropDownIcon.js");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../BaseSkeleton/index.js");
var _jsxRuntime = require("react/jsx-runtime");
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
const createStyles = theme => _reactNative.StyleSheet.create({
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
  const theme = (0, _index2.useTheme)();
  const rotateAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  (0, _react.useEffect)(() => {
    _reactNative.Animated.spring(rotateAnim, {
      toValue: isRotated ? 1 : 0,
      friction: ARROW_SPRING_FRICTION,
      useNativeDriver: true
    }).start();
  }, [isRotated, rotateAnim]);
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
    style: {
      transform: [{
        rotate
      }]
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ArrowDropDownIcon.ArrowDropDownIcon, {
      color: theme.colors.icon.default
    })
  });
};

/** Accordion list of questions; tapping a question shows its answer. */
const FAQ = ({
  faqData,
  loading = false,
  testID
}) => {
  const theme = (0, _index2.useTheme)();
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const [expandedIds, setExpandedIds] = (0, _react.useState)([]);
  const handleAccordionPress = id => {
    _reactNative.LayoutAnimation.configureNext(_reactNative.LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  if (loading) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.container,
      testID: testID ? `${testID}.skeleton` : undefined,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.skeletonTitle,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.BaseSkeleton, {
          height: SKELETON_TITLE_HEIGHT,
          width: SKELETON_TITLE_WIDTH,
          borderRadius: theme.radius.sm
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.skeletonList,
        children: Array.from({
          length: SKELETON_ROW_COUNT
        }, (_, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.BaseSkeleton, {
          height: SKELETON_ROW_HEIGHT,
          borderRadius: theme.radius.md
        }, index))
      })]
    });
  }
  if (!faqData.items.length) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    testID: testID ? `${testID}.loaded` : undefined,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "largeTitle/semibold",
      color: "primary",
      style: styles.title,
      children: faqData.title
    }), faqData.items.map((item, index) => {
      const isExpanded = expandedIds.includes(item.id);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        onPress: () => handleAccordionPress(item.id),
        style: styles.accordionContainer,
        activeOpacity: ROW_PRESSED_OPACITY,
        accessibilityRole: "button",
        accessibilityState: {
          expanded: isExpanded
        },
        testID: testID ? `${testID}.item.${index}` : undefined,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.accordionWrapper,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.accordionHeader,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
              variant: "headline/medium",
              color: "primary",
              style: styles.accordionTitle,
              children: item.title
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.icon,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(RotatingArrow, {
                isRotated: isExpanded
              })
            })]
          }), isExpanded ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.accordionContent,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
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
exports.FAQ = FAQ;
//# sourceMappingURL=FAQ.js.map