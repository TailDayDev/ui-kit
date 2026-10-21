import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/** Load-error message shown inside a pull-to-refresh list: image, title, hint. */
export interface PullToRefreshErrorStateProps {
  /** Title (`title/medium`). The app wrapper passes the translated `failed_to_load`. */
  title: string;
  /** Hint under the title (`body/regular`, secondary). The app wrapper passes the translated `check_connection_pull_to_refresh`. */
  description: string;
  /** Image above the texts, rendered as is. The app passes its `networkIssues` image (120pt). */
  illustration?: ReactNode;
  /** Container style. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier of the container. */
  testID?: string;
}
