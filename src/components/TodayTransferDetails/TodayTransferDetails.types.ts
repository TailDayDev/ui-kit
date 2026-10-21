import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/** Where a pet moves from and to (Figma `TodayTransferDetails`). */
export interface TodayTransferDetailsProps {
  /** Source placement name (`body/bold`). Figma `fromTitle`. */
  fromTitle: string;
  /** Destination placement name (`body/bold`, right-aligned). Figma `toTitle`. */
  toTitle: string;
  /** 24×24 image of the source placement (server image; the app passes a ready element). */
  fromImage?: ReactNode;
  /** 24×24 image of the destination placement (server image; the app passes a ready element). */
  toImage?: ReactNode;
  /** Outer style. Applied last. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier of the block. */
  testID?: string;
}
