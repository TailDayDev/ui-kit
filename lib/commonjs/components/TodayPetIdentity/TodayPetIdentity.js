"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodayPetIdentity = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../PetOwnerAvatar/index.js");
var _index4 = require("../TodayPlacementList/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// off-scale: the app pet block presses to 0.65, not the kit `opacity.pressed` (0.85).
const PRESSED_OPACITY = 0.65;
const IDLE_OPACITY = 1;
const createStyles = theme => _reactNative.StyleSheet.create({
  block: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[3],
    paddingBottom: 0,
    paddingLeft: theme.space[4],
    paddingRight: theme.space[4],
    paddingTop: theme.space[4]
  },
  text: {
    alignSelf: 'stretch',
    flex: 1,
    gap: theme.space[0.5],
    justifyContent: 'center',
    minWidth: 0
  }
});

/** Pet photo, name, breed and placement in a Today task card (Figma `TodayPetIdentity`). */
const TodayPetIdentity = ({
  name,
  meta,
  hasPlacements = true,
  avatar,
  placements,
  onPress,
  accessibilityLabel,
  style,
  testID
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const isInteractive = Boolean(onPress);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Pressable, {
    testID: testID,
    onPress: onPress,
    disabled: !isInteractive,
    accessible: isInteractive,
    accessibilityRole: isInteractive ? 'button' : undefined,
    accessibilityLabel: isInteractive ? accessibilityLabel ?? name : undefined,
    style: ({
      pressed
    }) => [styles.block, {
      opacity: isInteractive && pressed ? PRESSED_OPACITY : IDLE_OPACITY
    }, style],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.PetOwnerAvatar, {
      size: 64,
      ...avatar,
      testID: avatar.testID ?? (testID ? `${testID}.avatar` : undefined)
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.text,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "headline/bold",
        numberOfLines: 1,
        children: name
      }), meta ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "caption/regular",
        color: "secondary",
        numberOfLines: 1,
        children: meta
      }) : null, hasPlacements && placements ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.TodayPlacementList, {
        ...placements
      }) : null]
    })]
  });
};
exports.TodayPetIdentity = TodayPetIdentity;
//# sourceMappingURL=TodayPetIdentity.js.map