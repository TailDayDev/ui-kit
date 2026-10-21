import type { StyleProp, ViewStyle } from 'react-native';

import type { StaffPickerRowProps } from '../StaffPickerRow';

/** One staff member of the list (a `StaffPickerRow`). */
export interface TodayManualStaffPickerMember extends Pick<
  StaffPickerRowProps,
  'name' | 'position' | 'imageUrl' | 'renderImage'
> {
  /** Stable staff member id, reported by `onSelect`. */
  id: string;
  /** Test identifier of the staff row. */
  testID?: string;
}

/**
 * Body of the "choose staff" modal (Figma `TodayManualStaffPickerContent`):
 * the "no staff" row and the staff as `StaffPickerRow`s. Data in, `onSelect` out.
 */
export interface TodayManualStaffPickerContentProps {
  /** Staff members in display order. */
  staff: readonly TodayManualStaffPickerMember[];
  /** Id of the selected staff member; `null` selects the "no staff" row. */
  selectedId: string | null;
  /** Called with the tapped staff member id, or `null` for the "no staff" row. */
  onSelect: (id: string | null) => void;
  /** Text of the "no staff" row, e.g. "Без сотрудника" (fixed text in Figma). */
  noneLabel: string;
  /** Screen-reader label of the list (radiogroup), e.g. the modal title "Выберите сотрудника". */
  accessibilityLabel?: string;
  /** Test identifier of the "no staff" row. */
  noneTestID?: string;
  /** Outer layout style, applied last. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier of the container. */
  testID?: string;
}
