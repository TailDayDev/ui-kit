"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarModal = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeCalendars = require("react-native-calendars");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../Button/index.js");
var _calendarDates = require("../CustomCalendar/calendarDates.js");
var _index4 = require("../CustomModal/index.js");
var _index5 = require("../LoadingWrapper/index.js");
var _calendarModalDates = require("./calendarModalDates.js");
var _CalendarModalSkeleton = require("./CalendarModalSkeleton.js");
var _calendarStyles = require("./calendarStyles.js");
var _formatCalendarModalMonthTitle = require("./formatCalendarModalMonthTitle.js");
var _useCalendar = require("./useCalendar.js");
var _jsxRuntime = require("react/jsx-runtime");
const SCREEN_WIDTH = _reactNative.Dimensions.get('window').width;
/** App: the month list shows a skeleton for this long after opening. */
const CONTENT_LOADING_DELAY_MS = 300;
/** App: month list max height = 90 % of the window minus header and footer. */
const SCROLL_MAX_HEIGHT_RATIO = 0.9;
const SCROLL_RESERVED_HEIGHT = 250;
/** App: space under each month (off-scale). */
const MONTH_MARGIN_BOTTOM = 50;
const DEFAULT_MODAL_KEY = 'Calendar Modal';

/** Registers the locale in `LocaleConfig` and makes it the default (as `CustomCalendar` does). */
const applyLocale = locale => {
  if (!locale) {
    return undefined;
  }
  _reactNativeCalendars.LocaleConfig.locales[locale.key] = {
    dayNames: locale.dayNames,
    dayNamesShort: locale.dayNamesShort,
    monthNames: locale.monthNames,
    monthNamesShort: locale.monthNamesShort,
    today: locale.today ?? 'Today'
  };
  _reactNativeCalendars.LocaleConfig.defaultLocale = locale.key;
  return locale.key;
};
const createStyles = theme => _reactNative.StyleSheet.create({
  calendar: {
    margin: 0,
    marginBottom: MONTH_MARGIN_BOTTOM,
    padding: 0,
    width: '100%'
  },
  calendarContainer: {
    marginHorizontal: theme.space[6],
    width: SCREEN_WIDTH - 2 * theme.space[6]
  },
  calendarContent: {
    paddingBottom: theme.space[6],
    paddingTop: theme.space[6]
  },
  controlWrapper: {
    borderColor: theme.colors.border.default,
    borderTopWidth: theme.stroke[1],
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.space[6],
    paddingTop: theme.space[4],
    width: '100%'
  },
  monthHeader: {
    alignItems: 'flex-start',
    marginBottom: theme.space[4],
    marginTop: 0,
    width: '100%'
  },
  modalContent: {
    flex: 1,
    padding: 0,
    width: '100%'
  },
  separator: {
    borderBottomColor: theme.colors.border.default,
    borderBottomWidth: theme.stroke[1],
    width: '100%'
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center'
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: theme.space[6],
    paddingBottom: theme.space[2],
    paddingTop: theme.space[2]
  }
});
const getScrollMaxHeight = insets => _reactNative.Dimensions.get('window').height * SCROLL_MAX_HEIGHT_RATIO - SCROLL_RESERVED_HEIGHT + insets.top - insets.bottom;

/** Bottom-sheet calendar: seven stacked months, booked days struck out, Reset / Save footer. */
const CalendarModal = ({
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
  modalKey = DEFAULT_MODAL_KEY
}) => {
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const localeKey = (0, _react.useMemo)(() => applyLocale(locale), [locale]);
  const {
    markedDates,
    onDayPress,
    selectedRange,
    setSelectedRange,
    monthsToDisplay
  } = (0, _useCalendar.useCalendar)(isVisible, initialSelected, bookedDates, selectionMode);
  const [isContentLoading, setIsContentLoading] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
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
  const renderMonthTitle = dateString => {
    const {
      year,
      monthIndex
    } = (0, _calendarModalDates.getYearMonth)(dateString);
    return formatMonthTitle ? formatMonthTitle(year, monthIndex) : (0, _formatCalendarModalMonthTitle.formatCalendarMonthTitle)(year, monthIndex, localeKey);
  };
  const isSaveDisabled = selectionMode === 'single' ? !selectedRange.startDate : !selectedRange.endDate || !selectedRange.startDate;
  const handleSave = () => {
    if (selectionMode === 'single') {
      if (selectedRange.startDate) {
        const day = (0, _calendarDates.toLocalDayKeyOf)(selectedRange.startDate);
        onSave(day, day);
      }
      return;
    }
    if (selectedRange.startDate && selectedRange.endDate) {
      onSave((0, _calendarDates.toLocalDayKeyOf)(selectedRange.startDate), (0, _calendarDates.toLocalDayKeyOf)(selectedRange.endDate));
    }
  };
  const minDate = selectionMode === 'single' ? undefined : (0, _calendarDates.getTodayKey)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.CustomModal, {
    visible: isVisible,
    modalKey: modalKey,
    onClose: onClose,
    onDismissed: onDismissed,
    divider: false,
    withoutContainerFooter: true,
    scrollEnabled: false,
    title: title,
    footer: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.controlWrapper,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Button, {
        onPress: () => setSelectedRange({
          startDate: initialSelected.startDate,
          endDate: initialSelected.endDate
        }),
        style: "light",
        title: resetLabel
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Button, {
        onPress: handleSave,
        disabled: isSaveDisabled,
        title: saveLabel
      })]
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.modalContent,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.weekDays,
        children: weekDayLabels.map((day, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          variant: "body/regular",
          color: "primary",
          style: styles.weekDayText,
          children: day
        }, index))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.separator
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.LoadingWrapper, {
        loading: isContentLoading,
        skeleton: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [styles.calendarContent, styles.calendarContainer],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CalendarModalSkeleton.CalendarModalSkeleton, {})
        }),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
          style: {
            maxHeight: getScrollMaxHeight(insets),
            width: '100%'
          },
          contentContainerStyle: styles.calendarContent,
          showsVerticalScrollIndicator: false,
          overScrollMode: "never",
          bounces: false,
          automaticallyAdjustContentInsets: false,
          contentInsetAdjustmentBehavior: "never",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.calendarContainer,
            children: monthsToDisplay.map((month, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeCalendars.Calendar, {
              style: styles.calendar,
              current: month.dateString,
              markingType: "custom",
              theme: _calendarStyles.CALENDAR_DAY_GRID_THEME,
              markedDates: markedDates,
              onDayPress: onDayPress,
              disableAllTouchEventsForDisabledDays: true,
              minDate: minDate,
              hideExtraDays: true,
              firstDay: weekStartsOn,
              hideDayNames: true,
              hideArrows: true,
              disableMonthChange: true,
              renderHeader: () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.monthHeader,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
                  variant: "headline/bold",
                  color: "primary",
                  children: renderMonthTitle(month.dateString)
                })
              })
            }, index))
          })
        })
      })]
    })
  });
};
exports.CalendarModal = CalendarModal;
//# sourceMappingURL=CalendarModal.js.map