import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/** "No results" placeholder for lists: an image above a grey message. */
export interface EmptyListProps {
  /** Message (`headline/medium`, secondary). The app wrapper passes the translated `no_results_found` by default. */
  message: string;
  /**
   * Image above the message, rendered as is. The app wrapper passes its
   * `magicSearchIcon` image (80pt, tinted `#ccc`).
   */
  illustration?: ReactNode;
  /** Container style, applied over the default 150pt top margin. */
  style?: StyleProp<ViewStyle>;
  /** Extra message style. */
  textStyle?: StyleProp<TextStyle>;
  /** Test identifier of the container. */
  testID?: string;
}
