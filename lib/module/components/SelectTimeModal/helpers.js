"use strict";

// Pure time parsing, copied from the app `select-time-modal/helpers`.

/** Wheel value: two-digit hour and minutes, period in 12h. */

const TIME_PATTERN = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/;
const MAX_HOURS = 23;
const MAX_MINUTES = 59;
const MAX_SECONDS = 59;
const HOURS_IN_HALF_DAY = 12;
const pad2Zero = n => String(n).padStart(2, '0');
const isInRange = (value, max) => Number.isFinite(value) && value >= 0 && value <= max;

// "H:mm" / "HH:mm" / "HH:mm:ss" in 24h notation; anything else is not a time.
const parseTimeParts = timeStr => {
  const match = (timeStr ?? '').trim().match(TIME_PATTERN);
  if (!match) {
    return null;
  }
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const seconds = match[3] != null ? Number(match[3]) : 0;
  if (!isInRange(hours, MAX_HOURS) || !isInRange(minutes, MAX_MINUTES) || !isInRange(seconds, MAX_SECONDS)) {
    return null;
  }
  return {
    hours,
    minutes
  };
};
export const isValidTime = timeStr => parseTimeParts(timeStr) !== null;
const getEmptyTime = (mode, defaultFormat) => mode === '24h' ? {
  hour: '00',
  minutes: '00',
  format: null
} : {
  hour: '12',
  minutes: '00',
  format: defaultFormat ?? 'pm'
};
export const parseDefaultTime = (timeStr, defaultFormat, mode) => {
  const parts = parseTimeParts(timeStr);
  if (!parts) {
    return getEmptyTime(mode, defaultFormat);
  }
  const {
    hours,
    minutes
  } = parts;
  if (mode === '24h') {
    return {
      hour: pad2Zero(hours),
      minutes: pad2Zero(minutes),
      format: null
    };
  }
  if (defaultFormat) {
    if (hours < 1 || hours > HOURS_IN_HALF_DAY) {
      return {
        hour: '12',
        minutes: '00',
        format: defaultFormat
      };
    }
    return {
      hour: pad2Zero(hours),
      minutes: pad2Zero(minutes),
      format: defaultFormat
    };
  }
  const hours12 = (hours + HOURS_IN_HALF_DAY - 1) % HOURS_IN_HALF_DAY + 1;
  const inferred = hours >= HOURS_IN_HALF_DAY ? 'pm' : 'am';
  return {
    hour: pad2Zero(hours12),
    minutes: pad2Zero(minutes),
    format: inferred
  };
};
//# sourceMappingURL=helpers.js.map