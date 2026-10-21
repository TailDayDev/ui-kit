import type { ReactElement } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/** Screen top bar: title, optional back button, left / right blocks and content below. */
export interface ScreenNavProps {
  /** Title (`title/bold`, one line). Also the back button's screen-reader label. */
  title?: string;
  /** Content under the bar (search, tabs…), separated by 16pt. */
  children?: ReactElement;
  /** Shows the round back button. Needs `goBack` too. Defaults to `false`. */
  hasBackButton?: boolean;
  /** Called by the back button. The app passes its navigation `goBack`. */
  goBack?: () => void;
  /** Element at the right edge of the bar. */
  rightBlock?: ReactElement;
  /** Element before the back button / title. */
  leftBlock?: ReactElement;
  /** Bottom divider. Defaults to `true`. (Spelling kept for API compatibility with the app.) */
  isDevider?: boolean;
  /** Container style, applied last. */
  restStyle?: StyleProp<ViewStyle>;
  /** Hides the bar row and renders only `children`. Defaults to `false`. */
  isOnlyChildren?: boolean;
  /** Centers the title over the whole bar. Defaults to `false`. */
  centeredTitle?: boolean;
}
