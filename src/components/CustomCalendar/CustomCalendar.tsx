import { useMemo, type ComponentProps } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { Calendar, LocaleConfig, type DateData } from 'react-native-calendars';

import { SimpleArrowIcon } from '../../icons/SimpleArrowIcon';
import { Text } from '../../primitives';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import {
  getNextDayKey,
  getTodayKey,
  isOnOrAfter,
  isOnOrBefore,
  toUtcDayKey,
} from './calendarDates';
import type {
  CustomCalendarLocale,
  CustomCalendarProps,
} from './CustomCalendar.types';

/** App: day cell side from the screen width minus 2×24 padding. */
const SCREEN_HORIZONTAL_INSET = 48;
const DAYS_PER_WEEK = 7;
const DAY_SIZE =
  (Dimensions.get('window').width - SCREEN_HORIZONTAL_INSET) / DAYS_PER_WEEK;
/** App: header + weekday row height inside a fixed-height calendar. */
const CALENDAR_NON_DAY_CONTENT_HEIGHT = 94;
const CALENDAR_WEEK_COUNT = 6;
/** App: smallest day cell in a fixed-height calendar. */
const MIN_DAY_SIZE = 36;
const EMPTY_MARKED_DATES: Record<string, never> = {};

/** Nutrition schedule handoff: cell size, row gap, header sizes (off-scale). */
const NUTRITION_DAY_WIDTH = 48;
const NUTRITION_DAY_HEIGHT = 49;
const NUTRITION_ROW_GAP = 2;
const NUTRITION_HEADER_HEIGHT = 32;
const NUTRITION_WEEKDAY_ROW_HEIGHT = 17;
const NUTRITION_WEEKDAY_LINE_HEIGHT = 17;
const NUTRITION_WEEKDAY_LETTER_SPACING = -0.154;
const NUTRITION_MONTH_LETTER_SPACING = -0.32;
/** App arrow buttons: 36pt round (default), 24pt round (nutrition). */
const ARROW_SIZE = 36;
const NUTRITION_ARROW_SIZE = 24;
/** App: pressed day opacity and dimmed non-editable day. */
const DAY_PRESSED_OPACITY = 0.8;
const DAY_DISABLED_OPACITY = 0.5;
/** App: the cell before the range end bleeds 10pt into its neighbours. */
const BEFORE_END_BLEED = -10;
const BEFORE_END_WIDTH = '110%';

type CalendarTheme = NonNullable<ComponentProps<typeof Calendar>['theme']>;

type NutritionCalendarTheme = CalendarTheme & {
  'stylesheet.calendar.main': {
    container: ViewStyle;
    dayContainer: ViewStyle;
    emptyDayContainer: ViewStyle;
    monthView: ViewStyle;
    week: ViewStyle;
  };
  'stylesheet.calendar.header': {
    arrow: ViewStyle;
    dayHeader: TextStyle;
    header: ViewStyle;
    week: ViewStyle;
  };
};

interface CalendarDayComponentProps {
  date?: DateData;
  state?: string;
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    arrow: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.subtle,
      borderRadius: theme.radius.lg,
      height: ARROW_SIZE,
      justifyContent: 'center',
      width: ARROW_SIZE,
    },
    nutritionArrow: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.subtle,
      borderRadius: theme.radius.md,
      height: NUTRITION_ARROW_SIZE,
      justifyContent: 'center',
      width: NUTRITION_ARROW_SIZE,
    },
    nutritionMonthTitle: {
      letterSpacing: NUTRITION_MONTH_LETTER_SPACING,
    },
    dayContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    dayDimmed: {
      opacity: DAY_DISABLED_OPACITY,
    },
    disabledDayText: {
      color: theme.palette.lightGray,
    },
    inRange: {
      backgroundColor: theme.colors.bg.accentSoft,
    },
    invalidDate: {
      backgroundColor: theme.colors.text.error,
      borderRadius: theme.radius.sm,
    },
    occurrenceDate: {
      backgroundColor: theme.colors.bg.accentSoft,
      borderRadius: theme.radius.sm,
    },
    startDateWithEnd: {
      backgroundColor: theme.colors.bg.accentSoft,
      borderBottomLeftRadius: theme.radius.sm,
      borderTopLeftRadius: theme.radius.sm,
    },
    selectedDate: {
      backgroundColor: theme.colors.bg.accent,
      borderRadius: theme.radius.sm,
    },
    beforeEndDate: {
      marginLeft: BEFORE_END_BLEED,
      marginRight: BEFORE_END_BLEED,
      width: BEFORE_END_WIDTH,
    },
    textAccentBold: {
      ...theme.typography.body.bold,
      color: theme.colors.text.accent,
    },
    textAccentRegular: {
      ...theme.typography.body.regular,
      color: theme.colors.text.accent,
    },
    textInverseBold: {
      ...theme.typography.body.bold,
      color: theme.colors.text.inverse,
    },
    textInverseRegular: {
      ...theme.typography.body.regular,
      color: theme.colors.text.inverse,
    },
  });

const createNutritionTheme = (
  theme: Theme,
  dayHeight: number,
): NutritionCalendarTheme => ({
  'stylesheet.calendar.main': {
    container: {
      backgroundColor: 'transparent',
      paddingHorizontal: theme.space[4],
      paddingTop: theme.space[4],
    },
    dayContainer: {
      alignItems: 'center',
      flexBasis: NUTRITION_DAY_WIDTH,
      flexGrow: 0,
      flexShrink: 0,
      width: NUTRITION_DAY_WIDTH,
    },
    emptyDayContainer: {
      flexBasis: NUTRITION_DAY_WIDTH,
      flexGrow: 0,
      flexShrink: 0,
      width: NUTRITION_DAY_WIDTH,
    },
    monthView: {
      gap: NUTRITION_ROW_GAP,
    },
    week: {
      flexDirection: 'row',
      height: dayHeight,
      justifyContent: 'space-between',
      marginVertical: 0,
    },
  },
  'stylesheet.calendar.header': {
    arrow: {
      padding: 0,
    },
    dayHeader: {
      color: theme.colors.text.secondary,
      fontFamily: theme.typography.body.regular.fontFamily,
      fontSize: theme.typography.body.regular.fontSize,
      fontWeight: theme.typography.body.regular.fontWeight,
      letterSpacing: NUTRITION_WEEKDAY_LETTER_SPACING,
      lineHeight: NUTRITION_WEEKDAY_LINE_HEIGHT,
      marginBottom: 0,
      marginTop: 0,
      textAlign: 'center',
      width: NUTRITION_DAY_WIDTH,
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      height: NUTRITION_HEADER_HEIGHT,
      justifyContent: 'space-between',
      marginTop: 0,
      paddingHorizontal: 0,
    },
    week: {
      flexDirection: 'row',
      height: NUTRITION_WEEKDAY_ROW_HEIGHT,
      justifyContent: 'space-between',
      marginBottom: theme.space[2],
      marginTop: theme.space[2],
    },
  },
  arrowColor: theme.colors.text.secondary,
  calendarBackground: 'transparent',
  dayTextColor: theme.colors.text.primary,
  monthTextColor: theme.colors.text.primary,
  selectedDayBackgroundColor: theme.colors.bg.accent,
  selectedDayTextColor: theme.colors.text.inverse,
  textDayHeaderFontFamily: theme.typography.body.regular.fontFamily,
  textDayHeaderFontSize: theme.typography.body.regular.fontSize,
  textDisabledColor: theme.palette.lightGray,
  textMonthFontFamily: theme.typography.headline.bold.fontFamily,
  textMonthFontSize: theme.typography.headline.bold.fontSize,
  textSectionTitleColor: theme.colors.text.secondary,
  todayTextColor: theme.colors.text.accent,
});

const createDefaultTheme = (theme: Theme): CalendarTheme => ({
  calendarBackground: 'transparent',
  textSectionTitleColor: theme.colors.text.secondary,
  selectedDayBackgroundColor: theme.colors.bg.accent,
  selectedDayTextColor: theme.colors.text.inverse,
  todayTextColor: theme.colors.text.accent,
  dayTextColor: theme.colors.text.primary,
  textDisabledColor: theme.palette.lightGray,
  arrowColor: theme.colors.text.secondary,
  monthTextColor: theme.colors.text.primary,
  textMonthFontWeight: 'bold',
});

/** Registers the locale in `LocaleConfig`, makes it the default and returns its key. */
const applyLocale = (locale?: CustomCalendarLocale): string | undefined => {
  if (!locale) {
    return undefined;
  }
  LocaleConfig.locales[locale.key] = {
    dayNames: locale.dayNames,
    dayNamesShort: locale.dayNamesShort,
    monthNames: locale.monthNames,
    monthNamesShort: locale.monthNamesShort,
    today: locale.today ?? 'Today',
  };
  LocaleConfig.defaultLocale = locale.key;
  return locale.key;
};

/** Single-month calendar with start / end range, multi-date and single-date selection. */
export const CustomCalendar = ({
  startDate,
  endDate,
  onStartDateSelect,
  onEndDateSelect,
  onDateToggle,
  selectedDates = [],
  weekStartsOn = 1,
  canEditStartDate = true,
  canEditEndDate = true,
  minStartDate,
  maxStartDate,
  minEndDate,
  maxEndDate,
  calendarHeight,
  endDateOnlyPresentation = false,
  highlightStartDate = true,
  invalidDate,
  isOccurrenceDate,
  onInvalidEndDateSelect,
  nutritionSchedulePresentation = false,
  isDateSelectable,
  locale,
  formatMonthTitle,
}: CustomCalendarProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const localeKey = useMemo(() => applyLocale(locale), [locale]);

  const start = toUtcDayKey(startDate);
  const end = endDate ? toUtcDayKey(endDate) : undefined;
  const selectedDatesSet = useMemo(
    () => new Set(selectedDates),
    [selectedDates],
  );

  const defaultDaySize = calendarHeight
    ? Math.min(
        DAY_SIZE,
        Math.max(
          (calendarHeight - CALENDAR_NON_DAY_CONTENT_HEIGHT) /
            CALENDAR_WEEK_COUNT,
          MIN_DAY_SIZE,
        ),
      )
    : DAY_SIZE;
  const dayWidth = nutritionSchedulePresentation
    ? NUTRITION_DAY_WIDTH
    : defaultDaySize;
  const dayHeight = nutritionSchedulePresentation
    ? NUTRITION_DAY_HEIGHT
    : defaultDaySize;

  const calendarTheme = useMemo(
    () =>
      nutritionSchedulePresentation
        ? createNutritionTheme(theme, dayHeight)
        : createDefaultTheme(theme),
    [dayHeight, nutritionSchedulePresentation, theme],
  );

  const isWithinStartBounds = (day: string) =>
    isOnOrAfter(day, minStartDate) && isOnOrBefore(day, maxStartDate);
  const isWithinEndBounds = (day: string) =>
    isOnOrAfter(day, minEndDate) && isOnOrBefore(day, maxEndDate);

  const handleDaySelect = (day: DateData) => {
    const selectedDate = day.dateString;

    if (isDateSelectable && !isDateSelectable(selectedDate)) {
      return;
    }
    if (onDateToggle) {
      onDateToggle(day);
      return;
    }
    if (onEndDateSelect && !onStartDateSelect) {
      if (!isOnOrAfter(selectedDate, start)) {
        onInvalidEndDateSelect?.(day);
      } else if (isWithinEndBounds(selectedDate)) {
        onEndDateSelect(day);
      }
      return;
    }
    if (onStartDateSelect && !onEndDateSelect) {
      if (isWithinStartBounds(selectedDate)) {
        onStartDateSelect(day);
      }
      return;
    }
    if (onStartDateSelect && onEndDateSelect) {
      if (!end && selectedDate > start) {
        if (isWithinEndBounds(selectedDate)) {
          onEndDateSelect(day);
        }
      } else if (isWithinStartBounds(selectedDate)) {
        onStartDateSelect(day);
      }
    }
  };

  const getIsEditable = (dateStr: string, isStart: boolean, isEnd: boolean) => {
    const passesCustomPredicate = isDateSelectable?.(dateStr) ?? true;
    if (!passesCustomPredicate) {
      return false;
    }
    if (onDateToggle) {
      return isWithinStartBounds(dateStr);
    }
    if (onEndDateSelect && !onStartDateSelect) {
      return (
        Boolean(onInvalidEndDateSelect) ||
        (isOnOrAfter(dateStr, start) && isWithinEndBounds(dateStr))
      );
    }
    if (onStartDateSelect && !onEndDateSelect) {
      return isWithinStartBounds(dateStr);
    }
    return (
      ((isStart && canEditStartDate) ||
        (isEnd && canEditEndDate) ||
        (!isStart && !isEnd && (canEditStartDate || canEditEndDate))) &&
      isWithinStartBounds(dateStr) &&
      isWithinEndBounds(dateStr)
    );
  };

  const renderDayComponent = ({ date, state }: CalendarDayComponentProps) => {
    if (!date) {
      return null;
    }

    const dateStr = date.dateString;
    const isStart = dateStr === start;
    const isEnd = end ? dateStr === end : false;
    const isMultiSelected = selectedDatesSet.has(dateStr);
    const isInvalidDate = dateStr === invalidDate;
    const isInRange = Boolean(
      !endDateOnlyPresentation && end && dateStr > start && dateStr < end,
    );
    const isSingleDate =
      (highlightStartDate && isStart && !end) ||
      (endDateOnlyPresentation && isStart && !isEnd);
    const isOccurrence = isOccurrenceDate?.(dateStr) ?? false;
    const isToday = dateStr === getTodayKey();
    const isBeforeEnd = Boolean(
      !endDateOnlyPresentation && end && getNextDayKey(dateStr) === end,
    );
    const isEditable = getIsEditable(dateStr, isStart, isEnd);
    const selectedTextStyle = nutritionSchedulePresentation
      ? styles.textInverseRegular
      : styles.textInverseBold;

    return (
      <TouchableOpacity
        key={dateStr}
        activeOpacity={isEditable ? DAY_PRESSED_OPACITY : 1}
        onPress={() => {
          if (isEditable) {
            handleDaySelect(date);
          }
        }}
        style={[
          styles.dayContainer,
          { width: dayWidth, height: dayHeight },
          isInRange && styles.inRange,
          isSingleDate && styles.selectedDate,
          !endDateOnlyPresentation &&
            isStart &&
            Boolean(end) &&
            styles.startDateWithEnd,
          isEnd && styles.selectedDate,
          isMultiSelected && styles.selectedDate,
          isInvalidDate && styles.invalidDate,
          isOccurrence && !isStart && !isEnd && styles.occurrenceDate,
          isBeforeEnd && styles.beforeEndDate,
          !isEditable &&
            !(highlightStartDate && isStart) &&
            !(nutritionSchedulePresentation && isStart) &&
            styles.dayDimmed,
        ]}
        disabled={!isEditable}
        accessibilityRole="button"
        accessibilityState={{
          disabled: !isEditable,
          selected: isSingleDate || isEnd || isMultiSelected,
        }}
      >
        <Text
          style={[
            state === 'disabled' && styles.disabledDayText,
            nutritionSchedulePresentation &&
              (isToday || isStart) &&
              !isSingleDate &&
              !isEnd &&
              styles.textAccentBold,
            isStart && Boolean(end) && styles.textAccentBold,
            isEnd && selectedTextStyle,
            isSingleDate && selectedTextStyle,
            isMultiSelected && styles.textInverseRegular,
            isInvalidDate && styles.textInverseBold,
            isOccurrence && !isStart && !isEnd && styles.textAccentBold,
            isInRange && styles.textAccentRegular,
          ]}
        >
          {date.day}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderMonthTitle = (date: Date) => {
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    if (formatMonthTitle) {
      return formatMonthTitle(year, monthIndex);
    }
    const monthName = locale?.monthNames[monthIndex];
    return monthName
      ? `${monthName} ${year}`
      : new Intl.DateTimeFormat(undefined, {
          month: 'long',
          timeZone: 'UTC',
          year: 'numeric',
        }).format(new Date(Date.UTC(year, monthIndex, 1)));
  };

  return (
    <Calendar
      key={localeKey}
      current={start}
      firstDay={weekStartsOn}
      hideExtraDays
      minDate={onDateToggle ? minStartDate : undefined}
      disableMonthChange
      monthFormat="MMMM yyyy"
      markedDates={EMPTY_MARKED_DATES}
      style={calendarHeight ? { height: calendarHeight } : undefined}
      renderHeader={
        nutritionSchedulePresentation
          ? (date?: Date) =>
              date ? (
                <Text
                  variant="headline/bold"
                  style={styles.nutritionMonthTitle}
                >
                  {renderMonthTitle(date)}
                </Text>
              ) : null
          : undefined
      }
      renderArrow={direction => (
        <View
          style={
            nutritionSchedulePresentation ? styles.nutritionArrow : styles.arrow
          }
        >
          <SimpleArrowIcon
            direction={direction}
            color={theme.colors.text.secondary}
          />
        </View>
      )}
      theme={calendarTheme}
      dayComponent={renderDayComponent}
    />
  );
};
