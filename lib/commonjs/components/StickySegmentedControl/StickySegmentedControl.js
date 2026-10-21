"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StickySegmentedControl = void 0;
var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));
var _index = require("../SegmentedControl/index.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * `SegmentedControl` inside a Reanimated wrapper positioned at `top`
 * (app `shared/ui/sticky-segmented-control`). Used as the sticky overlay bar
 * of `StickyTabs`.
 */
const StickySegmentedControl = ({
  animatedStyle,
  onChange,
  onLayout,
  options,
  screenWidth,
  selectedIndex,
  style,
  testID,
  testIDs,
  top,
  scrollX,
  syncWithScroll = true
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
  style: [style, {
    top
  }, animatedStyle],
  testID: testID,
  onLayout: onLayout,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.SegmentedControl, {
    options: options,
    selectedIndex: selectedIndex,
    onChange: onChange,
    screenWidth: screenWidth,
    scrollX: scrollX,
    syncWithScroll: syncWithScroll,
    testIDs: testIDs
  })
});
exports.StickySegmentedControl = StickySegmentedControl;
//# sourceMappingURL=StickySegmentedControl.js.map