"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoStep = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Window height taken by the screen around the step (header, pager and buttons
 * of the app intro screen). App value; the image gets what is left.
 */
const SCREEN_CHROME_HEIGHT = 310;
const createStyles = theme => _reactNative.StyleSheet.create({
  bottomContainer: {
    gap: theme.space[2],
    marginBottom: theme.space[8],
    marginTop: theme.space[6]
  },
  centerWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.space[6]
  },
  descriptionWrapper: {
    flex: 1
  }
});

/** Intro step: a square image sized to the free space, then stage, title and description. */
const InfoStep = ({
  stage,
  title,
  description,
  renderImage
}) => {
  const theme = (0, _index2.useTheme)();
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const window = (0, _reactNative.useWindowDimensions)();
  const [bottomHeight, setBottomHeight] = (0, _react.useState)(0);

  // Same formula as the app: free height = window − screen chrome − texts − top margin.
  const availableHeight = window.height - SCREEN_CHROME_HEIGHT - bottomHeight - theme.space[6];
  const maxSize = Math.min(availableHeight, window.width - 2 * theme.space[6]);
  const handleBottomLayout = event => {
    setBottomHeight(event.nativeEvent.layout.height);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.contentContainer,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.centerWrapper, {
        height: availableHeight
      }],
      children: renderImage(maxSize)
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.bottomContainer,
      onLayout: handleBottomLayout,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "body/bold",
        children: stage
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "largeTitle/semibold",
        children: title
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.descriptionWrapper,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          variant: "caption/regular",
          color: "secondary",
          children: description
        })
      })]
    })]
  });
};
exports.InfoStep = InfoStep;
//# sourceMappingURL=InfoStep.js.map