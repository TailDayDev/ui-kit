import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Props of `ServiceHeaderTrigger` (Figma `ServiceHeaderTrigger`): the hotel
 * selector in the service header.
 */
export interface ServiceHeaderTriggerProps {
  /** Name of the selected hotel. Figma TEXT `titleSelected`. */
  titleSelected: string;
  /**
   * New bookings in other hotels, already formatted by the caller.
   * Figma TEXT `notifications`. No badge when omitted.
   */
  notifications?: string;
  /** Shows the notifications badge at the chevron. Figma BOOLEAN `hasNotificationsBadge`. Defaults to `true`. */
  hasNotificationsBadge?: boolean;
  /**
   * Hotel photo, drawn inside the 40pt circle (app: `DinamicImage`). The kit
   * never loads images. Without it the soft-gray circle stays empty.
   */
  image?: ReactNode;
  /** Opens the hotel selector. Without it the trigger is static. */
  onPress?: () => void;
  /** Screen-reader text. Defaults to `titleSelected`. */
  accessibilityLabel?: string;
  /** Outer style. Applied last. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier. The badge gets `${testID}.badge`. */
  testID?: string;
}
