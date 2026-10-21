"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCalendar = void 0;
var _react = require("react");
var _index = require("../../theme/index.js");
var _calendarDates = require("../CustomCalendar/calendarDates.js");
var _calendarModalDates = require("./calendarModalDates.js");
var _calendarStyles = require("./calendarStyles.js");
/** Months stacked in the modal, starting with the month of the selection. */
const MONTHS_TO_DISPLAY = 7;

/** A month shown in the modal. */

/** Selection state and day marking of the calendar modal. */
const useCalendar = (isVisible, initialSelected, bookedDates, selectionMode = 'range') => {
  const theme = (0, _index.useTheme)();
  const [selectedRange, setSelectedRange] = (0, _react.useState)(initialSelected);
  const [lastPressed, setLastPressed] = (0, _react.useState)(null);
  const initialStartDate = initialSelected.startDate;
  const initialEndDate = initialSelected.endDate;
  (0, _react.useEffect)(() => {
    // Keep the selection while the modal leaves; reset only on (re)open.
    if (!isVisible) return;
    setSelectedRange({
      startDate: initialStartDate,
      endDate: initialEndDate
    });
  }, [isVisible, initialStartDate, initialEndDate]);
  const markedDates = (0, _react.useMemo)(() => {
    const marked = {};
    const todayKey = (0, _calendarDates.getTodayKey)();
    bookedDates.forEach(date => {
      marked[date] = (0, _calendarStyles.getBookedDayStyles)(theme);
    });
    const {
      startDate,
      endDate
    } = selectedRange;
    const startDateStr = startDate ? (0, _calendarDates.toLocalDayKeyOf)(startDate) : '';
    const endDateStr = endDate ? (0, _calendarDates.toLocalDayKeyOf)(endDate) : '';
    if (startDate && endDate && startDate !== endDate) {
      const diff = (0, _calendarModalDates.diffInDays)(startDateStr, endDateStr);

      // App `keepOnlySide` is left out: middle-day styles carry no filler
      // keys, so it returned them unchanged.
      const baseStartInner = (0, _calendarStyles.getMiddleDayStyles)(theme, (0, _calendarModalDates.getIsoWeekday)(startDateStr), (0, _calendarModalDates.getDayOfMonth)(startDateStr) === 1, (0, _calendarModalDates.isLastDayOfMonth)(startDateStr));
      const baseEndInner = (0, _calendarStyles.getMiddleDayStyles)(theme, (0, _calendarModalDates.getIsoWeekday)(endDateStr), (0, _calendarModalDates.getDayOfMonth)(endDateStr) === 1, (0, _calendarModalDates.isLastDayOfMonth)(endDateStr));
      marked[startDateStr] = (0, _calendarStyles.solidify)((0, _calendarStyles.composeDayStyles)(baseStartInner, (0, _calendarStyles.getStartDayStyles)(theme)));
      marked[endDateStr] = (0, _calendarStyles.solidify)((0, _calendarStyles.composeDayStyles)(baseEndInner, (0, _calendarStyles.getEndDayStyles)(theme)));
      for (let i = 1; i < diff; i++) {
        const dateStr = (0, _calendarModalDates.addDays)(startDateStr, i);
        marked[dateStr] = (0, _calendarStyles.getMiddleDayStyles)(theme, (0, _calendarModalDates.getIsoWeekday)(dateStr), (0, _calendarModalDates.getDayOfMonth)(dateStr) === 1, (0, _calendarModalDates.isLastDayOfMonth)(dateStr));
      }
    }
    if (startDate && (!endDate || startDate === endDate)) {
      marked[startDateStr] = (0, _calendarStyles.solidify)((0, _calendarStyles.getSingleDayStyles)(theme));
    }
    const visibleEnd = (0, _calendarModalDates.getShiftedMonthEndKey)(todayKey, _calendarStyles.MONTHS_FUTURE);
    for (let dateStr = (0, _calendarModalDates.getMonthStartKey)(todayKey, -_calendarStyles.MONTHS_PAST); dateStr <= visibleEnd; dateStr = (0, _calendarModalDates.addDays)(dateStr, 1)) {
      if (!marked[dateStr]) {
        marked[dateStr] = (0, _calendarStyles.getDefaultDayStyles)(theme, dateStr < todayKey);
      }
    }
    const lastPressedMarking = lastPressed ? marked[lastPressed] : undefined;
    if (lastPressed && lastPressedMarking) {
      marked[lastPressed] = (0, _calendarStyles.solidify)(lastPressedMarking);
    }
    return marked;
  }, [selectedRange, bookedDates, theme, lastPressed]);
  const getMarkedDates = (0, _react.useCallback)(() => markedDates, [markedDates]);
  const onDayPress = day => {
    const {
      dateString
    } = day;
    setLastPressed(dateString);
    if (selectionMode === 'single') {
      setSelectedRange({
        startDate: dateString,
        endDate: dateString
      });
      return;
    }
    if (!selectedRange.startDate || selectedRange.startDate && selectedRange.endDate) {
      setSelectedRange({
        startDate: dateString,
        endDate: undefined
      });
      return;
    }
    const start = (0, _calendarDates.toLocalDayKeyOf)(selectedRange.startDate);
    const end = (0, _calendarDates.toLocalDayKeyOf)(dateString);
    const rangeStart = start < end ? start : end;
    const rangeEnd = start < end ? end : start;
    if (rangeStart === rangeEnd) {
      setSelectedRange({
        startDate: rangeStart,
        endDate: (0, _calendarModalDates.addDays)(rangeStart, _calendarStyles.ONE_NIGHT_ADD_DAYS)
      });
      return;
    }
    const hasBookedInRange = bookedDates.some(booked => {
      const bookedKey = (0, _calendarDates.toLocalDayKeyOf)(booked);
      return bookedKey > rangeStart && bookedKey < rangeEnd;
    });
    if (hasBookedInRange) {
      return;
    }
    setSelectedRange({
      startDate: rangeStart,
      endDate: rangeEnd
    });
  };
  const monthsToDisplay = (0, _react.useMemo)(() => {
    const firstMonth = (0, _calendarModalDates.getMonthStartKey)(selectedRange.startDate && (0, _calendarDates.toLocalDayKeyOf)(selectedRange.startDate) || (0, _calendarDates.getTodayKey)());
    return Array.from({
      length: MONTHS_TO_DISPLAY
    }, (_, index) => ({
      dateString: (0, _calendarModalDates.getMonthStartKey)(firstMonth, index)
    }));
  }, [selectedRange.startDate]);
  return {
    getMarkedDates,
    markedDates,
    onDayPress,
    selectedRange,
    setSelectedRange,
    monthsToDisplay
  };
};
exports.useCalendar = useCalendar;
//# sourceMappingURL=useCalendar.js.map