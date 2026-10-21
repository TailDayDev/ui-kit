import type { ReactNode } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

/** Controls handed to the `collapsed` / `expanded` render functions. */
export interface AccordionItemControls {
  /** Whether this item is the open one. */
  isOpen: boolean;
  /** Opens this item (closes the other one). */
  open: () => void;
  /** Closes this item. */
  close: () => void;
  /** Opens or closes this item. */
  toggle: () => void;
}

/** One section of an `AccordionGroup`. Only one item of a group is open at a time. */
export interface AccordionItemProps {
  /** Unique id inside the group; compared with the group `openId`. Also builds the testID `accordion.<id>`. */
  id: string;
  /** Red border (validation error). */
  isError?: boolean;
  /** Content of the closed item (summary row). Rendered inside a pressable with 24pt padding. */
  collapsed: (controls: AccordionItemControls) => ReactNode;
  /** Content of the open item. Rendered with 24pt horizontal padding. */
  expanded: (controls: AccordionItemControls) => ReactNode;
  /** Tap on the closed item opens it. Defaults to `true`. */
  pressToToggle?: boolean;
  /** Card style, applied after the base card style. */
  containerStyle?: StyleProp<ViewStyle>;
  /** Style of the closed item's pressable. */
  collapsedPressableStyle?: StyleProp<ViewStyle>;
  /** Touch handling of the card. */
  pointerEvents?: ViewProps['pointerEvents'];
}

/** Controlled group of `AccordionItem`s: the parent owns `openId`. */
export interface AccordionGroupProps {
  /** `AccordionItem`s (may be nested in other views). */
  children: ReactNode;
  /**
   * Not read by the group (the parent owns `openId`). Kept for API
   * compatibility with the app.
   */
  initialOpenId?: string | null;
  /** Id of the open item, or `null` when all are closed. */
  openId: string | null;
  /** Sets the open item. Called with a layout animation already configured. */
  setOpenIdState: (id: string | null) => void;
  /** Not called by the group. Kept for API compatibility with the app. */
  onChange?: (openId: string | null) => void;
  /** Wrapper style. */
  style?: StyleProp<ViewStyle>;
}

/** Closed-item summary: label left, value (or an empty placeholder) right. */
export interface CloseSectionProps {
  /** Left label (`headline/regular`). */
  label: string;
  /** Right value (`headline/bold`, primary text). Empty shows `emptyLabel` in secondary text. */
  value: string;
  /** Placeholder shown when `value` is empty. */
  emptyLabel?: string;
}
