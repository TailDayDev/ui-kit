import type { ComponentProps } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import type { Calendar } from 'react-native-calendars';

import type { Theme } from '../../theme';

type CalendarProps = ComponentProps<typeof Calendar>;
type CalendarTheme = NonNullable<CalendarProps['theme']>;
/** `markedDates` of `react-native-calendars`. */
export type CalendarMarkedDates = NonNullable<CalendarProps['markedDates']>;
/** One day's marking in `markedDates`. */
export type CalendarMarkedDate = CalendarMarkedDates[string];

/** App day cell height (off-scale: not in Figma Spacing). */
export const DAY_SIZE = 44;
// Gap between day cells in a week row (= space[0.5]). Cells share the rest of
// the row width equally, so a selected day is as wide as its column and only
// its height is fixed: the grid stays put on any screen width.
export const DAY_GAP = 2;
/** Selected day above its range neighbours. */
export const Z_INDEX_SELECTED = 2;
/** App: pulls the week rows together (off-scale). */
export const MARGIN_BOTTOM_ADJUST = -6;
/** Months before the current one that get the default day look. */
export const MONTHS_PAST = 1;
/** Months after the current one that get the default day look. */
export const MONTHS_FUTURE = 6;
/** Range mode: tapping the start day again picks one night. */
export const ONE_NIGHT_ADD_DAYS = 1;
/** App: vertical margin of a week row (off-scale). */
const WEEK_MARGIN_VERTICAL = 7;
/** App: past days are drawn at half opacity. */
const PAST_DAY_OPACITY = 0.5;
const ISO_MONDAY = 1;
const ISO_SUNDAY = 7;

// `react-native-calendars` theme overrides that lay a week out as equal
// columns separated by DAY_GAP instead of fixed-width days spaced around.
type CalendarDayGridTheme = CalendarTheme & {
  'stylesheet.calendar.main': Record<
    'dayContainer' | 'emptyDayContainer' | 'week',
    ViewStyle
  >;
};

export const CALENDAR_DAY_GRID_THEME: CalendarDayGridTheme = {
  'stylesheet.calendar.main': {
    week: {
      columnGap: DAY_GAP,
      flexDirection: 'row',
      marginVertical: WEEK_MARGIN_VERTICAL,
    },
    dayContainer: {
      flex: 1,
    },
    emptyDayContainer: {
      flex: 1,
    },
  },
};

// `width: 'auto'` overrides the library's fixed 32 px day base so the cell
// stretches to its column; `alignItems: 'stretch'` lets the label fill it.
const STRETCHED_DAY_CELL: ViewStyle = {
  width: 'auto',
  height: DAY_SIZE,
  justifyContent: 'center',
  alignItems: 'stretch',
};

const getDayText = (theme: Theme, color: string): TextStyle => ({
  ...theme.typography.body.regular,
  color,
  textAlign: 'center',
  lineHeight: DAY_SIZE,
  height: DAY_SIZE,
});

const getSelectedDayText = (theme: Theme): TextStyle => ({
  ...theme.typography.body.regular,
  backgroundColor: theme.colors.bg.accent,
  color: theme.colors.text.inverse,
  height: DAY_SIZE,
  borderRadius: theme.radius.sm,
  textAlign: 'center',
  lineHeight: DAY_SIZE,
  overflow: 'hidden',
});

export const getDefaultDayStyles = (
  theme: Theme,
  isPast: boolean,
): CalendarMarkedDate => ({
  customStyles: {
    container: {
      ...STRETCHED_DAY_CELL,
      marginBottom: MARGIN_BOTTOM_ADJUST,
      opacity: isPast ? PAST_DAY_OPACITY : 1,
    },
    text: getDayText(
      theme,
      isPast ? theme.palette.lightGray : theme.colors.text.primary,
    ),
  },
});

export const getBookedDayStyles = (theme: Theme): CalendarMarkedDate => ({
  disabled: true,
  disableTouchEvent: true,
  customStyles: {
    container: {
      ...STRETCHED_DAY_CELL,
      borderRadius: 0,
    },
    text: {
      ...getDayText(theme, theme.palette.lightGray),
      textDecorationLine: 'line-through',
    },
  },
});

export const getStartDayStyles = (theme: Theme): CalendarMarkedDate => ({
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
      marginBottom: MARGIN_BOTTOM_ADJUST,
    },
    text: getSelectedDayText(theme),
  },
});

export const getEndDayStyles = (theme: Theme): CalendarMarkedDate => ({
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
      marginBottom: MARGIN_BOTTOM_ADJUST,
    },
    text: getSelectedDayText(theme),
  },
});

/** A day inside a range; `dayOfWeek` is ISO (Monday 1 … Sunday 7). */
export const getMiddleDayStyles = (
  theme: Theme,
  dayOfWeek: number,
  isFirstDayOfMonth: boolean,
  isLastDayOfMonth: boolean,
): CalendarMarkedDate => {
  // Half a gap on each side, so neighbouring range days fill the gap.
  const containerStyles: ViewStyle = {
    ...STRETCHED_DAY_CELL,
    backgroundColor: theme.colors.bg.accentSoft,
    borderRadius: 0,
    marginHorizontal: -DAY_GAP / 2,
    marginBottom: MARGIN_BOTTOM_ADJUST,
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
      text: getDayText(theme, theme.colors.text.primary),
    },
  };
};

export const getSingleDayStyles = (theme: Theme): CalendarMarkedDate => ({
  customStyles: {
    container: {
      ...STRETCHED_DAY_CELL,
      zIndex: Z_INDEX_SELECTED,
      marginBottom: MARGIN_BOTTOM_ADJUST,
    },
    text: getSelectedDayText(theme),
  },
});

/**
 * Lays `overlay` over `base` (app `calendarUtils.composeDayStyles`): container
 * and text styles merge, the container is fully opaque.
 */
export const composeDayStyles = (
  base: CalendarMarkedDate,
  overlay: CalendarMarkedDate,
): CalendarMarkedDate => ({
  ...base,
  ...overlay,
  customStyles: {
    container: {
      ...base.customStyles?.container,
      ...overlay.customStyles?.container,
      opacity: 1,
    },
    text: { ...base.customStyles?.text, ...overlay.customStyles?.text },
  },
});

/**
 * Drops the library's own selection and makes the day fully opaque
 * (app `calendarUtils.solidify`).
 */
export const solidify = (style: CalendarMarkedDate): CalendarMarkedDate => {
  const rest = { ...style };
  delete rest.selected;
  delete rest.selectedColor;
  delete rest.selectedTextColor;
  return {
    ...rest,
    customStyles: {
      ...rest.customStyles,
      container: { ...rest.customStyles?.container, opacity: 1 },
      text: { ...rest.customStyles?.text, opacity: 1 },
    },
  };
};
