import type { ReactNode, Ref, RefObject } from 'react';
import type { ScrollView, StyleProp, ViewStyle } from 'react-native';

/** Imperative API of a CustomModal (`ref`). */
export interface CustomModalHandle {
  /** Asks the owner to close, like the X button (`onClose`). */
  close: () => void;
  /** Hides at once without `onClose`/`onDismissed` (logout teardown). */
  dismissForTeardown: () => void;
  /** Shows page `index` of a multi-page modal. */
  slideTo: (index: number) => void;
}

export interface CustomModalProps {
  /** The only switch: shown while true, hidden (and animated out) when false. */
  visible: boolean;
  /**
   * The user asks to close (X, backdrop, swipe, Android Back, `ref.close()`).
   * Set `visible` to false to close; keep it to refuse (the sheet stays and a
   * swiped sheet goes back), or show a confirmation and close after it.
   */
  onClose: () => void;
  /**
   * The sheet is gone (not called on logout teardown). For work that must
   * wait for it: useModalPresence unmounting, a strict "A gone, then B".
   */
  onDismissed?: () => void;
  /**
   * Busy (e.g. saving): content and close controls are disabled, so no close
   * request is sent. Purely a lock — it never closes or opens the modal.
   */
  isLocked?: boolean;
  /** Content. Every direct child is a page (see `slideTo`). */
  children: ReactNode;
  /** Title of the default header. Fades in on every page change. */
  title?: ReactNode;
  /** Top border above the footer. Defaults to `true`. */
  divider?: boolean;
  /** Replaces the default header; `null` hides the header row. */
  header?: ReactNode | null;
  /** Content of the footer row under the pages. */
  footer?: ReactNode;
  /** Footer padding above the safe area. Defaults to 24. */
  footerBottomPadding?: number;
  /** Padding above the header. Defaults to 8 with a top inset, else 0. */
  contentTopPadding?: number;
  /** Sheet height (capped by the available height). */
  modalHeight?: number;
  /** Distance from the top of the layer area to the sheet. */
  modalTopOffset?: number;
  /** Enter / leave animation length. Defaults to 220 ms. */
  transitionDurationMs?: number;
  /** Enter / leave animation. Defaults to `'slide'`. */
  transitionStyle?: 'fade' | 'slide';
  /** The footer row without its own padding, border and background. */
  withoutContainerFooter?: boolean;
  /** The sheet grows with its content instead of filling the height. */
  autoHeight?: boolean;
  /** Without a backdrop the screen below is still blocked, just not dimmed. */
  withBackdrop?: boolean;
  /** Whether a backdrop tap sends a close request. Defaults to `autoHeight`. */
  closeOnBackdropPress?: boolean;
  /** Whether a swipe down sends a close request. */
  closeOnSwipeDown?: boolean;
  /** Name of the modal for the app (registry, telemetry, tests). */
  modalKey?: string;
  /** Modals and overlays drawn above this modal's content, inside its layer. */
  nestedOverlays?: ReactNode;
  /** Shows the back button in the default header. */
  handleBackBtn?: () => void;
  /** Test id of the close button. Defaults to `'custom-modal-close'`. */
  closeButtonTestID?: string;
  /**
   * Screen-reader text of the close button. Defaults to the provider's
   * `closeAccessibilityLabel` (see CustomModalProvider).
   */
  closeAccessibilityLabel?: string;
  /** Pads the content above the keyboard (no footer) or lifts the footer. */
  avoidKeyboard?: boolean;
  /** Adds keyboard space to the end of the scroll content. */
  adjustScrollContentForKeyboard?: boolean;
  /** Gap between the content and the keyboard. Defaults to 24. */
  keyboardInsetBottomOffset?: number;
  /** What hosts each page. Defaults to `'scroll-view'`. */
  pageHost?: 'scroll-view' | 'view';
  /** Whether the page scroll views scroll. Defaults to `true`. */
  scrollEnabled?: boolean;
  /** Ref of the active page's scroll view. */
  scrollRef?: Ref<ScrollView>;
  /** Page shown on every new opening. Defaults to 0. */
  defaultScreenIndex?: number;
  /** Lifts the footer above the keyboard. */
  liftFooterOnKeyboard?: boolean;
  /** Extra sheet style, applied after the defaults. */
  containerStyles?: StyleProp<ViewStyle>;
  /** Extra header row style, applied after the defaults. */
  headerStyles?: StyleProp<ViewStyle>;
  /**
   * The modal's own alert, drawn above its content while it is the top modal
   * (the app's InlineTopAlert). Positioned by the element itself.
   */
  inlineAlert?: ReactNode;
}

/** A modal that got a layer (entering, open or leaving). */
export interface CustomModalRegistration {
  /** Unique per modal instance. */
  instanceId: string;
  /** `modalKey` prop, when given. */
  modalKey?: string;
  /** The modal's imperative handle (teardown, close by key). */
  handleRef: RefObject<CustomModalHandle | null>;
}

/** Presentation state of a modal that is or was shown. */
export interface CustomModalPresentationState {
  modalKey?: string;
  isVisible: boolean;
  isRendered: boolean;
  isTopModal: boolean;
  isClosing: boolean;
  canInteract: boolean;
  isLocked: boolean;
  pageHost: 'scroll-view' | 'view';
}

/** App wiring shared by every CustomModal below the provider. */
export interface CustomModalProviderProps {
  children: ReactNode;
  /**
   * A modal got a layer. Return a cleanup: it runs when the modal loses its
   * layer, unmounts, or its `modalKey` changes (then this runs again).
   */
  onModalRendered?: (
    registration: CustomModalRegistration,
  ) => (() => void) | undefined;
  /** A shown modal's presentation state changed (telemetry). */
  onPresentationStateChange?: (state: CustomModalPresentationState) => void;
  /**
   * Height drawn above the system keyboard that the OS does not report
   * (e.g. the app's keyboard «Done» bar). Added while a keyboard is up.
   */
  keyboardAccessoryHeight?: number;
  /** Default screen-reader text of the close button. */
  closeAccessibilityLabel?: string;
}

/** Props of FullScreenModal: a CustomModal without divider or scrolling. */
export interface FullScreenModalProps {
  visible: boolean;
  /** Close request: set `visible` false to close, keep it to refuse. */
  onClose: () => void;
  /** Runs once the sheet is gone. */
  onDismissed?: () => void;
  /** Busy: content and close controls are disabled. */
  isLocked?: boolean;
  children: ReactNode;
  title?: ReactNode;
  header?: ReactNode | null;
  footer?: ReactNode;
  /** Overlays drawn above this modal's content, inside its layer. */
  nestedOverlays?: ReactNode;
  modalKey?: string;
  handleBackBtn?: () => void;
  headerStyles?: StyleProp<ViewStyle>;
  /** Screen-reader text of the close button. */
  closeAccessibilityLabel?: string;
}
