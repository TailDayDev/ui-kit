"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.solidify = exports.getStartDayStyles = exports.getSingleDayStyles = exports.getMiddleDayStyles = exports.getEndDayStyles = exports.getDefaultDayStyles = exports.getBookedDayStyles = exports.composeDayStyles = exports.Z_INDEX_SELECTED = exports.ONE_NIGHT_ADD_DAYS = exports.MONTHS_PAST = exports.MONTHS_FUTURE = exports.MARGIN_BOTTOM_ADJUST = exports.DAY_SIZE = exports.DAY_GAP = exports.CALENDAR_DAY_GRID_THEME = void 0;
/** `markedDates` of `react-native-calendars`. */

/** One day's marking in `markedDates`. */

/** App day cell height (off-scale: not in Figma Spacing). */
const DAY_SIZE = exports.DAY_SIZE = 44;
// Gap between day cells in a week row (= space[0.5]). Cells share the rest of
// the row width equally, so a selected day is as wide as its column and only
// its height is fixed: the grid stays put on any screen width.
const DAY_GAP = exports.DAY_GAP = 2;
/** Selected day above its range neighbours. */
const Z_INDEX_SELECTED = exports.Z_INDEX_SELECTED = 2;
/** App: pulls the week rows together (off-scale). */
const MARGIN_BOTTOM_ADJUST = exports.MARGIN_BOTTOM_ADJUST = -6;
/** Months before the current one that get the default day look. */
const MONTHS_PAST = exports.MONTHS_PAST = 1;
/** Months after the current one that get the default day look. */
const MONTHS_FUTURE = exports.MONTHS_FUTURE = 6;
/** Range mode: tapping the start day again picks one night. */
const ONE_NIGHT_ADD_DAYS = exports.ONE_NIGHT_ADD_DAYS = 1;
/** App: vertical margin of a week row (off-scale). */
const WEEK_MARGIN_VERTICAL = 7;
/** App: past days are drawn at half opacity. */
const PAST_DAY_OPACITY = 0.5;
const ISO_MONDAY = 1;
const ISO_SUNDAY = 7;

// `react-native-calendars` theme overrides that lay a week out as equal
// columns separated by DAY_GAP instead of fixed-width days spaced around.

const CALENDAR_DAY_GRID_THEME = exports.CALENDAR_DAY_GRID_THEME = {
  'stylesheet.calendar.main': {
    week: {
      columnGap: DAY_GAP,
      flexDirection: 'row',
      marginVertical: WEEK_MARGIN_VERTICAL
    },
    dayContainer: {
      flex: 1
    },
    emptyDayContainer: {
      flex: 1
    }
  }
};

// `width: 'auto'` overrides the library's fixed 32 px day base so the cell
// stretches to its column; `alignItems: 'stretch'` lets the label fill it.
const STRETCHED_DAY_CELL = {
  width: 'auto',
  height: DAY_SIZE,
  justifyContent: 'center',
  alignItems: 'stretch'
};
const getDayText = (theme, color) => ({
  ...theme.typography.body.regular,
  color,
  textAlign: 'center',
  lineHeight: DAY_SIZE,
  height: DAY_SIZE
});
const getSelectedDayText = theme => ({
  ...theme.typography.body.regular,
  backgroundColor: theme.colors.bg.accent,
  color: theme.colors.text.inverse,
  height: DAY_SIZE,
  borderRadius: theme.radius.sm,
  textAlign: 'center',
  lineHeight: DAY_SIZE,
  overflow: 'hidden'
});
const getDefaultDayStyles = (theme, isPast) => ({
  customStyles: {
    container: {
      ...STRETCHED_DAY_CELL,
      marginBottom: MARGIN_BOTTOM_ADJUST,
      opacity: isPast ? PAST_DAY_OPACITY : 1
    },
    text: getDayText(theme, isPast ? theme.palette.lightGray : theme.colors.text.primary)
  }
});
exports.getDefaultDayStyles = getDefaultDayStyles;
const getBookedDayStyles = theme => ({
  disabled: true,
  disableTouchEvent: true,
  customStyles: {
    container: {
      ...STRETCHED_DAY_CELL,
      borderRadius: 0
    },
    text: {
      ...getDayText(theme, theme.palette.lightGray),
      textDecorationLine: 'line-through'
    }
  }
});
exports.getBookedDayStyles = getBookedDayStyles;
const getStartDayStyles = theme => ({
  customStyles: {
    // Reaches over the gap to the next day; the padding keeps the square at
    // the column width and shows the range fill in the gap.
    container: {
      ...STRETCHED_DAY_CELL,
      backgroundColor: theme.colors.bg.accentSoft,
      marginLeft: 0,
      marginRight: -DAY_GAP,
      paddingRight: DAY_GAP,
      borderTopLeftRadius: theme.radius.sm,
      borderBottomLeftRadius: theme.radius.sm,
      zIndex: Z_INDEX_SELECTED,
      marginBottom: MARGIN_BOTTOM_ADJUST
    },
    text: getSelectedDayText(theme)
  }
});
exports.getStartDayStyles = getStartDayStyles;
const getEndDayStyles = theme => ({
  customStyles: {
    // Mirror of the start day: reaches over the gap to the previous day.
    container: {
      ...STRETCHED_DAY_CELL,
      backgroundColor: theme.colors.bg.accentSoft,
      marginLeft: -DAY_GAP,
      marginRight: 0,
      paddingLeft: DAY_GAP,
      borderTopRightRadius: theme.radius.sm,
      borderBottomRightRadius: theme.radius.sm,
      zIndex: Z_INDEX_SELECTED,
      marginBottom: MARGIN_BOTTOM_ADJUST
    },
    text: getSelectedDayText(theme)
  }
});

/** A day inside a range; `dayOfWeek` is ISO (Monday 1 … Sunday 7). */
exports.getEndDayStyles = getEndDayStyles;
const getMiddleDayStyles = (theme, dayOfWeek, isFirstDayOfMonth, isLastDayOfMonth) => {
  // Half a gap on each side, so neighbouring range days fill the gap.
  const containerStyles = {
    ...STRETCHED_DAY_CELL,
    backgroundColor: theme.colors.bg.accentSoft,
    borderRadius: 0,
    marginHorizontal: -DAY_GAP / 2,
    marginBottom: MARGIN_BOTTOM_ADJUST
  };
  if (dayOfWeek === ISO_MONDAY) {
    containerStyles.borderTopLeftRadius = theme.radius.sm;
    containerStyles.borderBottomLeftRadius = theme.radius.sm;
  }
  if (dayOfWeek === ISO_SUNDAY) {
    containerStyles.borderTopRightRadius = theme.radius.sm;
    containerStyles.borderBottomRightRadius = theme.radius.sm;
  }
  if (isFirstDayOfMonth && dayOfWeek !== ISO_MONDAY) {
    containerStyles.borderTopLeftRadius = theme.radius.sm;
    containerStyles.borderBottomLeftRadius = theme.radius.sm;
  }
  if (isLastDayOfMonth && dayOfWeek !== ISO_SUNDAY) {
    containerStyles.borderTopRightRadius = theme.radius.sm;
    containerStyles.borderBottomRightRadius = theme.radius.sm;
  }
  return {
    customStyles: {
      container: containerStyles,
      text: getDayText(theme, theme.colors.text.primary)
    }
  };
};
exports.getMiddleDayStyles = getMiddleDayStyles;
const getSingleDayStyles = theme => ({
  customStyles: {
    container: {
      ...STRETCHED_DAY_CELL,
      zIndex: Z_INDEX_SELECTED,
      marginBottom: MARGIN_BOTTOM_ADJUST
    },
    text: getSelectedDayText(theme)
  }
});

/**
 * Lays `overlay` over `base` (app `calendarUtils.composeDayStyles`): container
 * and text styles merge, the container is fully opaque.
 */
exports.getSingleDayStyles = getSingleDayStyles;
const composeDayStyles = (base, overlay) => ({
  ...base,
  ...overlay,
  customStyles: {
    container: {
      ...base.customStyles?.container,
      ...overlay.customStyles?.container,
      opacity: 1
    },
    text: {
      ...base.customStyles?.text,
      ...overlay.customStyles?.text
    }
  }
});

/**
 * Drops the library's own selection and makes the day fully opaque
 * (app `calendarUtils.solidify`).
 */
exports.composeDayStyles = composeDayStyles;
const solidify = style => {
  const rest = {
    ...style
  };
  delete rest.selected;
  delete rest.selectedColor;
  delete rest.selectedTextColor;
  return {
    ...rest,
    customStyles: {
      ...rest.customStyles,
      container: {
        ...rest.customStyles?.container,
        opacity: 1
      },
      text: {
        ...rest.customStyles?.text,
        opacity: 1
      }
    }
  };
};
exports.solidify = solidify;
//# sourceMappingURL=calendarStyles.js.map