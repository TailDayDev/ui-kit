"use strict";

import { Dimensions, StyleSheet, View } from 'react-native';
import { BaseSkeleton } from "../BaseSkeleton/index.js";

/** App `CalendarSkeleton`: month title block (off-scale sizes). */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TITLE_HEIGHT = 22;
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
const DAY_WIDTH = (Dimensions.get('window').width - SCREEN_HORIZONTAL_INSET - (DAYS_PER_WEEK - 1) * DAY_GAP) / DAYS_PER_WEEK;
const DAY_RADIUS = 8;
const styles = StyleSheet.create({
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
export const CalendarModalSkeleton = () => /*#__PURE__*/_jsxs(View, {
  style: styles.container,
  testID: "calendar-modal.skeleton",
  children: [/*#__PURE__*/_jsx(BaseSkeleton, {
    height: TITLE_HEIGHT,
    width: TITLE_WIDTH,
    borderRadius: TITLE_RADIUS,
    style: styles.title
  }), Array.from({
    length: WEEK_COUNT
  }, (_, week) => /*#__PURE__*/_jsx(View, {
    style: styles.week,
    children: Array.from({
      length: DAYS_PER_WEEK
    }, (__, day) => /*#__PURE__*/_jsx(BaseSkeleton, {
      height: DAY_HEIGHT,
      width: DAY_WIDTH,
      borderRadius: DAY_RADIUS
    }, day))
  }, week))]
});
//# sourceMappingURL=CalendarModalSkeleton.js.map