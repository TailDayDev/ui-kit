"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModalPages = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../ModalLayer/index.js");
const PAGE_SLIDE_DURATION = 260;
const PAGE_SLIDE_EASING = _reactNative.Easing.out(_reactNative.Easing.cubic);
/**
 * Pages of a multi-page modal: the active index, the row offset that slides
 * it into view and the title fade on every page change. Every new opening
 * starts on `defaultScreenIndex`; a reopen while leaving keeps the page.
 */
const useModalPages = ({
  phase,
  defaultScreenIndex,
  pageWidth
}) => {
  const [screenIndex, setScreenIndex] = (0, _react.useState)(defaultScreenIndex);
  const slideAnim = (0, _react.useRef)(new _reactNative.Animated.Value(-defaultScreenIndex * pageWidth)).current;
  const titleOpacity = (0, _react.useRef)(new _reactNative.Animated.Value(1)).current;
  const phaseRef = (0, _react.useRef)(phase);
  phaseRef.current = phase;
  const previousPhaseRef = (0, _react.useRef)(phase);

  // Before paint, so a new opening never shows the page of the last one.
  // Any way out of `closed` is a new opening: with reduced motion `entering`
  // and `open` land in one render, so `closed → open` is all this sees.
  (0, _react.useLayoutEffect)(() => {
    const previousPhase = previousPhaseRef.current;
    previousPhaseRef.current = phase;
    if (previousPhase !== 'closed' || !(0, _index.isModalLayerPhaseActive)(phase)) {
      return;
    }
    setScreenIndex(defaultScreenIndex);
    slideAnim.setValue(-defaultScreenIndex * pageWidth);
  }, [defaultScreenIndex, pageWidth, phase, slideAnim]);
  (0, _react.useEffect)(() => {
    _reactNative.Animated.timing(slideAnim, {
      toValue: -screenIndex * pageWidth,
      duration: PAGE_SLIDE_DURATION,
      easing: PAGE_SLIDE_EASING,
      useNativeDriver: true
    }).start();
  }, [pageWidth, screenIndex, slideAnim]);
  (0, _react.useEffect)(() => {
    titleOpacity.setValue(0);
    _reactNative.Animated.timing(titleOpacity, {
      toValue: 1,
      duration: PAGE_SLIDE_DURATION,
      easing: PAGE_SLIDE_EASING,
      useNativeDriver: true
    }).start();
  }, [screenIndex, titleOpacity]);

  /** `ref.slideTo(index)`: ignored unless the modal is entering or open. */
  const slideTo = (0, _react.useCallback)(index => {
    if ((0, _index.isModalLayerPhaseActive)(phaseRef.current)) {
      setScreenIndex(index);
    }
  }, []);
  return {
    screenIndex,
    slideAnim,
    slideTo,
    titleOpacity
  };
};
exports.useModalPages = useModalPages;
//# sourceMappingURL=useModalPages.js.map