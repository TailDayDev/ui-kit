import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/** Which Today screen state to show. Figma VARIANT `kind`. */
export type TodayScreenStateKind =
  'no-auth' | 'no-hotel' | 'empty' | 'no-results' | 'offline';

/**
 * Today screen state (Figma `TodayScreenState`): a centered picture, title,
 * explanation and action button, or (`kind="offline"`) a "no network" band.
 */
export interface TodayScreenStateProps {
  /** Figma VARIANT `kind`. Defaults to `'no-auth'`. */
  kind?: TodayScreenStateKind;
  /** Text of the offline band (`caption/regular`, secondary). Figma TEXT `label`. Used only for `kind="offline"`. */
  label?: string;
  /** State title (`title/medium`, centered). Not used for `kind="offline"`. */
  title?: string;
  /** Explanation under the title (`body/regular`, secondary, centered). Not used for `kind="offline"`. */
  description?: string;
  /**
   * Ready 120×120 picture element (Figma `Картинка`, e.g. the app's
   * `TodayTasksSignInRequiredIcon`). The kit never loads images. Not used for
   * `kind="offline"`.
   */
  illustration?: ReactNode;
  /**
   * Text of the action button (kit `Button`, style=default). Figma shows the
   * button for `no-auth`, `no-hotel` and `no-results`, never for `empty`.
   */
  actionLabel?: string;
  /** Called when the action button is tapped. The button is shown only with both `actionLabel` and `onAction`. */
  onAction?: () => void;
  /** Test identifier of the action button. */
  actionTestID?: string;
  /** Outer style, applied last. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier of the container. */
  testID?: string;
}
