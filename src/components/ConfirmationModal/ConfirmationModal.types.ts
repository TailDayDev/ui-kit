import type { ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';

export interface ConfirmationModalProps {
  /**
   * Image above the title (the app passes its `DinamicImage`, 100 pt). Drawn
   * in an 8 pt rounded, clipped frame.
   */
  icon?: ReactNode;
  /** Content above the icon. */
  prevChildren?: ReactNode;
  /** Title (Figma `ConfirmationModalContent` title). */
  title?: string;
  /** Text under the title. */
  description?: string;
  /** Cancel (`light`) button label. */
  closeText: string;
  /** Confirm button label. */
  confirmText: string;
  /** Text shown when `onConfirm` / `onCancel` throws. */
  errorText: string;
  /** Shown while true. Defaults to `false`. */
  isVisible?: boolean;
  /**
   * Confirm button container style, on top of the default fill. Without it
   * the confirm button is the destructive red one (`Button style="danger"`).
   */
  confirmStyles?: ViewStyle;
  /** Confirm button label style. */
  confirmTextStyles?: TextStyle;
  /** Cancel button style, applied to both container and label. */
  closeStyles?: ViewStyle & TextStyle;
  /** Content between the title and the description. */
  children?: ReactNode;
  /**
   * Close request: X, backdrop, Back, and after confirm/cancel unless they
   * return false. Set `isVisible` false to close; keep it to refuse.
   */
  onClose: () => void;
  /** Runs once the sheet is gone. */
  onDismissed?: () => void;
  /** Cancel action. Returning `false` keeps the modal open. */
  // Same union as the app API, so every existing handler type-checks.
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  onCancel?: () => Promise<boolean | void> | boolean | void;
  /** Confirm action. Returning `false` keeps the modal open; throwing shows `errorText`. */
  // Same union as the app API, so every existing handler type-checks.
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  onConfirm: () => Promise<boolean | void | null> | boolean | void | null;
  /** Suffix of the modal key (`ConfirmationModal<modalKey>`). */
  modalKey?: string;
  /** Test id of the content. */
  testID?: string;
  /** Test id of the confirm button. */
  confirmTestID?: string;
  /** Test id of the cancel button. */
  cancelTestID?: string;
  /** Whether a swipe down sends a close request. Defaults to `false`. */
  closeOnSwipeDown?: boolean;
}
