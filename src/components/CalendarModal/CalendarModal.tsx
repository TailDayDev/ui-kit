import { useEffect, useMemo, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from 'react-native-safe-area-context';

import { Text } from '../../primitives';
import { useThemedStyles, type Theme } from '../../theme';
import { Button } from '../Button';
import type { CustomCalendarLocale } from '../CustomCalendar';
import { getTodayKey, toLocalDayKeyOf } from '../CustomCalendar/calendarDates';
import { CustomModal } from '../CustomModal';
import { LoadingWrapper } from '../LoadingWrapper';
import { getYearMonth } from './calendarModalDates';
import type { CalendarModalProps } from './CalendarModal.types';
import { CalendarModalSkeleton } from './CalendarModalSkeleton';
import { CALENDAR_DAY_GRID_THEME } from './calendarStyles';
import { formatCalendarMonthTitle } from './formatCalendarModalMonthTitle';
import { useCalendar } from './useCalendar';

const SCREEN_WIDTH = Dimensions.get('window').width;
/** App: the month list shows a skeleton for this long after opening. */
const CONTENT_LOADING_DELAY_MS = 300;
/** App: month list max height = 90 % of the window minus header and footer. */
const SCROLL_MAX_HEIGHT_RATIO = 0.9;
const SCROLL_RESERVED_HEIGHT = 250;
/** App: space under each month (off-scale). */
const MONTH_MARGIN_BOTTOM = 50;
const DEFAULT_MODAL_KEY = 'Calendar Modal';

/** Registers the locale in `LocaleConfig` and makes it the default (as `CustomCalendar` does). */
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

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    calendar: {
      margin: 0,
      marginBottom: MONTH_MARGIN_BOTTOM,
      padding: 0,
      width: '100%',
    },
    calendarContainer: {
      marginHorizontal: theme.space[6],
      width: SCREEN_WIDTH - 2 * theme.space[6],
    },
    calendarContent: {
      paddingBottom: theme.space[6],
      paddingTop: theme.space[6],
    },
    controlWrapper: {
      borderColor: theme.colors.border.default,
      borderTopWidth: theme.stroke[1],
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: theme.space[6],
      paddingTop: theme.space[4],
      width: '100%',
    },
    monthHeader: {
      alignItems: 'flex-start',
      marginBottom: theme.space[4],
      marginTop: 0,
      width: '100%',
    },
    modalContent: { flex: 1, padding: 0, width: '100%' },
    separator: {
      borderBottomColor: theme.colors.border.default,
      borderBottomWidth: theme.stroke[1],
      width: '100%',
    },
    weekDayText: {
      flex: 1,
      textAlign: 'center',
    },
    weekDays: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal: theme.space[6],
      paddingBottom: theme.space[2],
      paddingTop: theme.space[2],
    },
  });

const getScrollMaxHeight = (insets: EdgeInsets) =>
  Dimensions.get('window').height * SCROLL_MAX_HEIGHT_RATIO -
  SCROLL_RESERVED_HEIGHT +
  insets.top -
  insets.bottom;

/** Bottom-sheet calendar: seven stacked months, booked days struck out, Reset / Save footer. */
export const CalendarModal = ({
  isVisible,
  onClose,
  onDismissed,
  onSave,
  bookedDates,
  initialSelected,
  title,
  selectionMode = 'range',
  resetLabel,
  saveLabel,
  weekDayLabels,
  weekStartsOn = 1,
  locale,
  formatMonthTitle,
  modalKey = DEFAULT_MODAL_KEY,
}: CalendarModalProps) => {
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(createStyles);
  const localeKey = useMemo(() => applyLocale(locale), [locale]);

  const {
    markedDates,
    onDayPress,
    selectedRange,
    setSelectedRange,
    monthsToDisplay,
  } = useCalendar(isVisible, initialSelected, bookedDates, selectionMode);

  const [isContentLoading, setIsContentLoading] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsContentLoading(true);
      const task = setTimeout(() => {
        setIsContentLoading(false);
      }, CONTENT_LOADING_DELAY_MS);
      return () => clearTimeout(task);
    }
    setIsContentLoading(false);
    return undefined;
  }, [isVisible]);

  const renderMonthTitle = (dateString: string) => {
    const { year, monthIndex } = getYearMonth(dateString);
    return formatMonthTitle
      ? formatMonthTitle(year, monthIndex)
      : formatCalendarMonthTitle(year, monthIndex, localeKey);
  };

  const isSaveDisabled =
    selectionMode === 'single'
      ? !selectedRange.startDate
      : !selectedRange.endDate || !selectedRange.startDate;

  const handleSave = () => {
    if (selectionMode === 'single') {
      if (selectedRange.startDate) {
        const day = toLocalDayKeyOf(selectedRange.startDate);
        onSave(day, day);
      }
      return;
    }
    if (selectedRange.startDate && selectedRange.endDate) {
      onSave(
        toLocalDayKeyOf(selectedRange.startDate),
        toLocalDayKeyOf(selectedRange.endDate),
      );
    }
  };

  const minDate = selectionMode === 'single' ? undefined : getTodayKey();

  return (
    <CustomModal
      visible={isVisible}
      modalKey={modalKey}
      onClose={onClose}
      onDismissed={onDismissed}
      divider={false}
      withoutContainerFooter
      scrollEnabled={false}
      title={title}
      footer={
        <View style={styles.controlWrapper}>
          <Button
            onPress={() =>
              setSelectedRange({
                startDate: initialSelected.startDate,
                endDate: initialSelected.endDate,
              })
            }
            style="light"
            title={resetLabel}
          />
          <Button
            onPress={handleSave}
            disabled={isSaveDisabled}
            title={saveLabel}
          />
        </View>
      }
    >
      <View style={styles.modalContent}>
        <View style={styles.weekDays}>
          {weekDayLabels.map((day, index) => (
            <Text
              key={index}
              variant="body/regular"
              color="primary"
              style={styles.weekDayText}
            >
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.separator} />

        <LoadingWrapper
          loading={isContentLoading}
          skeleton={
            <View style={[styles.calendarContent, styles.calendarContainer]}>
              <CalendarModalSkeleton />
            </View>
          }
        >
          <ScrollView
            style={{ maxHeight: getScrollMaxHeight(insets), width: '100%' }}
            contentContainerStyle={styles.calendarContent}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            bounces={false}
            automaticallyAdjustContentInsets={false}
            contentInsetAdjustmentBehavior="never"
          >
            <View style={styles.calendarContainer}>
              {monthsToDisplay.map((month, index) => (
                <Calendar
                  key={index}
                  style={styles.calendar}
                  current={month.dateString}
                  markingType="custom"
                  theme={CALENDAR_DAY_GRID_THEME}
                  markedDates={markedDates}
                  onDayPress={onDayPress}
                  disableAllTouchEventsForDisabledDays
                  minDate={minDate}
                  hideExtraDays
                  firstDay={weekStartsOn}
                  hideDayNames
                  hideArrows
                  disableMonthChange
                  renderHeader={() => (
                    <View style={styles.monthHeader}>
                      <Text variant="headline/bold" color="primary">
                        {renderMonthTitle(month.dateString)}
                      </Text>
                    </View>
                  )}
                />
              ))}
            </View>
          </ScrollView>
        </LoadingWrapper>
      </View>
    </CustomModal>
  );
};
