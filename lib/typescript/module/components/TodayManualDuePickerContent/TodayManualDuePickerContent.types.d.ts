import type { StyleProp, ViewStyle } from 'react-native';
import type { WheelPickerHourFormat, WheelPickerTimeValue } from '../WheelPicker/index.js';
/** Figma `TodayManualDuePickerContent` › `mode` options (app `IBookingActionTimingRequest['mode']`). */
export type TodayManualDueMode = 'noTime' | 'dayPart' | 'exactTime';
/** Part of the day (app `dayPart`). */
export type TodayManualDayPart = 'morning' | 'day' | 'evening' | 'night';
/** Texts of the due-time modal body (fixed texts in Figma, translated by the app). */
export interface TodayManualDuePickerLabels {
    /** "Без времени". */
    noTimeTitle: string;
    /** "Задача на весь день, без привязки к точному времени." */
    noTimeDescription: string;
    /** "Часть дня". */
    dayPartTitle: string;
    /** "Утро, день, вечер или ночь." */
    dayPartDescription: string;
    /** "Точное время". */
    exactTimeTitle: string;
    /** "Задача привязана к конкретному времени." */
    exactTimeDescription: string;
    /** "Утро". */
    morning: string;
    /** "День". */
    day: string;
    /** "Вечер". */
    evening: string;
    /** "Ночь". */
    night: string;
}
/**
 * Body of the task due-time modal (Figma `TodayManualDuePickerContent`):
 * mode radios, then the day-part options or the time wheel. Data in,
 * callbacks out; the parent keeps the draft and the modal footer.
 */
export interface TodayManualDuePickerContentProps {
    /** Selected mode. Figma VARIANT `mode`. Defaults to `'noTime'`. */
    mode?: TodayManualDueMode;
    /** Selected part of the day (shown in `dayPart` mode). `null`/omitted selects none. */
    dayPart?: TodayManualDayPart | null;
    /** Selected time (shown in `exactTime` mode). Defaults to 08:00 (app `DEFAULT_EXACT_TIME`). */
    time?: WheelPickerTimeValue;
    /** Hour cycle of the time wheel: `'12h'` adds the am/pm column (Figma). Defaults to `'24h'`. */
    hourFormat?: WheelPickerHourFormat;
    /** Minute step of the time wheel. Defaults to 5 (Figma 50/55/00/05/10). */
    minuteInterval?: number;
    /** Texts. */
    labels: TodayManualDuePickerLabels;
    /** Called with the tapped mode. */
    onModeChange: (mode: TodayManualDueMode) => void;
    /** Called with the tapped part of the day. */
    onDayPartChange: (dayPart: TodayManualDayPart) => void;
    /** Called with the whole new time on every wheel change. */
    onTimeChange: (time: WheelPickerTimeValue) => void;
    /** Outer layout style, applied last. */
    style?: StyleProp<ViewStyle>;
    /**
     * Test identifier of the container. Derived: `.mode.<mode>`,
     * `.dayPart.<dayPart>`, `.time` (the wheel).
     */
    testID?: string;
}
//# sourceMappingURL=TodayManualDuePickerContent.types.d.ts.map