import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { TodayTaskFooterProps } from '../TodayTaskFooter';
import type { TodayTaskHeaderProps } from '../TodayTaskHeader';

/**
 * Task card of the Today feed (Figma `TodayTaskCard`): type and time, pet,
 * what to do and the action footer on a white rounded card.
 */
export interface TodayTaskCardProps {
  /** Shows the type/time header. Figma BOOLEAN `hasHeader`. Defaults to `true`. */
  hasHeader?: boolean;
  /**
   * Props of the header (Figma instance `Шапка карточки` › `TodayTaskHeader`).
   * Shown when `hasHeader`. Omit to hide the header (e.g. inside a details modal
   * that draws one shared header).
   */
  header?: TodayTaskHeaderProps;
  /** Shows the pet block. Figma BOOLEAN `hasPet`. Defaults to `true`. */
  hasPet?: boolean;
  /**
   * Pet block (Figma INSTANCE_SWAP `pet`, default `TodayPetIdentity`; swap
   * `TodayMultiPetSummary` for several pets). Shown when `hasPet`.
   */
  pet?: ReactNode;
  /** Shows the details block. Figma BOOLEAN `hasDetails`. Defaults to `true`. */
  hasDetails?: boolean;
  /**
   * What to do (Figma INSTANCE_SWAP `details`, default `TodayTaskDetails`;
   * swap `TodayDoorDetails` / `TodayTransferDetails`). Shown when `hasDetails`.
   */
  details?: ReactNode;
  /** Props of the footer (Figma instance `Футер` › `TodayTaskFooter`). */
  footer: TodayTaskFooterProps;
  /**
   * Task is done or skipped: a 60% white veil covers the whole card, footer
   * included, and a tap anywhere opens the «⋮» menu (`footer.onMenuPress`).
   * Figma VARIANT `isFinished` (`false` | `true`). Defaults to `false`.
   */
  isFinished?: boolean;
  /** Shows the skip reason under the footer, above the veil. Figma BOOLEAN `hasSkipReason`. Defaults to `false`. */
  hasSkipReason?: boolean;
  /** Why the task was skipped (`caption/regular`, secondary). Figma TEXT `skipReason`. */
  skipReason?: string;
  /** Screen-reader label of the card content. */
  accessibilityLabel?: string;
  /** Outer style. The card fills its parent's width. Applied last. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier of the card; the finished veil gets `${testID}.veil`. */
  testID?: string;
}
