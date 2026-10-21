import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { ActionListRowVariant } from '../ActionListRow';

/** One action of the sheet. */
export interface SourceActionSheetAction {
  /** Stable key. */
  id: string;
  /** Row title. */
  title: string;
  /** Secondary line under the title. */
  description?: string | null;
  /** Row icon (left, or right in trailing variants). */
  icon?: ReactNode;
  /** Trailing slot content. */
  trailing?: ReactNode;
  /** Red destructive title. */
  isDanger?: boolean;
  /** Blocks and dims the row. */
  isDisabled?: boolean;
  /** Test identifier of the row button. */
  testID?: string;
  /** Called on tap, after `onClose` when `closeOnAction` is on. */
  onPress: () => void;
}

/** Content of an action sheet: a list of `ActionListRow`s. Not a modal itself. */
export interface SourceActionSheetProps {
  /** Actions in display order. */
  actions: SourceActionSheetAction[];
  /** Called before an action when `closeOnAction` is on. */
  onClose: () => void;
  /** Close the sheet before running an action. Defaults to `true`. */
  closeOnAction?: boolean;
  /** Row look. Defaults to `'trailing-icon'` (Figma `TaskSheetRow`). */
  variant?: ActionListRowVariant;
  /** Container style, applied last. */
  containerStyle?: StyleProp<ViewStyle>;
  /** Test identifier of the container. */
  testID?: string;
}
