import {
  isValidElement,
  type FC,
  type ReactElement,
  type ReactNode,
} from 'react';

import { STICKY_TABS_PANEL_DISPLAY_NAME } from './constants';
import type { StickyTabsPanelProps } from './StickyTabs.types';

/**
 * Declarative tab definition. Parsed by {@link StickyTabs} and rendered through
 * {@link StickyTabsContent}; this component does not mount on its own.
 */
export const StickyTabsPanel: FC<StickyTabsPanelProps> = () => null;

StickyTabsPanel.displayName = STICKY_TABS_PANEL_DISPLAY_NAME;

export const isStickyTabsPanelElement = (
  child: ReactNode,
): child is ReactElement<StickyTabsPanelProps> =>
  isValidElement(child) &&
  (child.type as { displayName?: string }).displayName ===
    STICKY_TABS_PANEL_DISPLAY_NAME;
