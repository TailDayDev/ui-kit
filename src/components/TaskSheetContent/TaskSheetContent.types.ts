import type { StyleProp, ViewStyle } from 'react-native';

import type { IconComponent } from '../../primitives/Icon';

/** One action of the task sheet. */
export interface TaskSheetContentRow {
  /** Stable React key (e.g. the action id: `'skip'`, `'delete'`). */
  key: string;
  /** Row text (`TaskSheetRow` `label`). */
  label: string;
  /**
   * Icon on the right (`TaskSheetRow` `icon`). Defaults to `IconCalendarDays`,
   * or `IconTrash2` for a destructive row (Figma "DestructiveRow").
   */
  icon?: IconComponent;
  /** Called on tap. */
  onPress: () => void;
  /**
   * Destructive action ("Удалить"): rendered in the separate block below the
   * actions, red icon. Any destructive row turns on Figma `hasDestructive`.
   */
  isDestructive?: boolean;
  /** Blocks the press and dims the row. */
  disabled?: boolean;
  /** Test identifier of the row. */
  testID?: string;
}

/**
 * Body of the task sheet (Figma `TaskSheetContent`): action rows and an
 * optional destructive row set apart below them.
 *
 * Figma VARIANT `rows` (1 | 2 | 3) is the number of non-destructive items in
 * `rows`; Figma BOOLEAN `hasDestructive` is "some item has `isDestructive`".
 */
export interface TaskSheetContentProps {
  /** Rows in display order; destructive ones go to the bottom block. */
  rows: readonly TaskSheetContentRow[];
  /** Outer layout style, applied last. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier of the container. */
  testID?: string;
}
