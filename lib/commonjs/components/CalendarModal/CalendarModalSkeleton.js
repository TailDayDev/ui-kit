"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarModalSkeleton = void 0;
var _reactNative = require("react-native");
var _index = require("../BaseSkeleton/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App `CalendarSkeleton`: month title block (off-scale sizes). */const TITLE_HEIGHT = 22;
const TITLE_WIDTH = 240;
const TITLE_RADIUS = 6;
const TITLE_MARGIN_BOTTOM = 30;
/** App `CalendarSkeleton`: 5 weeks of 7 day blocks. */
const WEEK_COUNT = 5;
const DAYS_PER_WEEK = 7;
const DAY_HEIGHT = 48;
const DAY_GAP = 8;
/** App: day width from the screen width minus 2×24 padding and 6 gaps. */
const SCREEN_HORIZONTAL_INSET = 48;
const DAY_WIDTH = (_reactNative.Dimensions.get('window').width - SCREEN_HORIZONTAL_INSET - (DAYS_PER_WEEK - 1) * DAY_GAP) / DAYS_PER_WEEK;
const DAY_RADIUS = 8;
const styles = _reactNative.StyleSheet.create({
  container: {
    width: '100%'
  },
  title: {
    marginBottom: TITLE_MARGIN_BOTTOM
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: DAY_GAP,
    width: '100%'
  }
});

/** Placeholder of one month while the calendar modal opens (app `CalendarSkeleton`). */
const CalendarModalSkeleton = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
  style: styles.container,
  testID: "calendar-modal.skeleton",
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.BaseSkeleton, {
    height: TITLE_HEIGHT,
    width: TITLE_WIDTH,
    borderRadius: TITLE_RADIUS,
    style: styles.title
  }), Array.from({
    length: WEEK_COUNT
  }, (_, week) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.week,
    children: Array.from({
      length: DAYS_PER_WEEK
    }, (__, day) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.BaseSkeleton, {
      height: DAY_HEIGHT,
      width: DAY_WIDTH,
      borderRadius: DAY_RADIUS
    }, day))
  }, week))]
});
exports.CalendarModalSkeleton = CalendarModalSkeleton;
//# sourceMappingURL=CalendarModalSkeleton.js.map