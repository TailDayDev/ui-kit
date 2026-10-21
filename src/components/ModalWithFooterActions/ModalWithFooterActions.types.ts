import type { ReactNode, Ref } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { ButtonStyle } from '../Button/Button.types';
import type {
  CustomModalHandle,
  CustomModalProps,
} from '../CustomModal/CustomModal.types';

export interface ModalWithFooterActionsProps {
  /** Modal content (wrapped in a `flex: 1` view). */
  children: ReactNode;
  /** Name of the modal (registry, telemetry, tests). */
  modalKey: string;
  /** Close request (X, backdrop, Back): set `visible` false to close. */
  onClose: () => void;
  /** Main (right) action. */
  onPressPrimary: () => void;
  /** Secondary (left, `light`) action, usually Cancel. */
  onPressSecondary: () => void;
  /** Main action label. */
  primaryTitle: string;
  /** Secondary action label. */
  secondaryTitle: string;
  /** Header title. */
  title: string;
  /** Shown while true. */
  visible: boolean;
  /** The sheet grows with its content. Defaults to `false`. */
  autoHeight?: boolean;
  /** Extra style of the content wrapper. */
  contentStyle?: StyleProp<ViewStyle>;
  /** Extra style of the actions row. */
  footerActionsStyle?: StyleProp<ViewStyle>;
  /** Extra style of the footer (border, background). */
  footerStyle?: StyleProp<ViewStyle>;
  /** Shows the back button in the header. */
  handleBackBtn?: () => void;
  /** Disables the main action. */
  isPrimaryDisabled?: boolean;
  /** Spinner on the main action. */
  isPrimaryLoading?: boolean;
  /** Busy: content and close controls are disabled. */
  isLocked?: boolean;
  /** Imperative handle of the underlying CustomModal. */
  modalRef?: Ref<CustomModalHandle>;
  /** Runs once the sheet is gone. */
  onDismissed?: () => void;
  /** Button style of the main action. Defaults to `'default'`. */
  primaryButtonStyle?: ButtonStyle;
  /** Test id of the main action. */
  primaryButtonTestID?: string;
  /** Test id of the secondary action. */
  secondaryButtonTestID?: string;
  /** Whether the page scrolls. Defaults to `false`. */
  scrollEnabled?: boolean;
  /** What hosts the page (see CustomModal). */
  pageHost?: CustomModalProps['pageHost'];
  /** Overlays drawn above the content, inside the modal layer. */
  nestedOverlays?: CustomModalProps['nestedOverlays'];
}
