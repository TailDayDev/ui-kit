import { type FC, type ReactElement, type ReactNode } from 'react';
import type { StickyTabsPanelProps } from './StickyTabs.types';
/**
 * Declarative tab definition. Parsed by {@link StickyTabs} and rendered through
 * {@link StickyTabsContent}; this component does not mount on its own.
 */
export declare const StickyTabsPanel: FC<StickyTabsPanelProps>;
export declare const isStickyTabsPanelElement: (child: ReactNode) => child is ReactElement<StickyTabsPanelProps>;
//# sourceMappingURL=StickyTabsPanel.d.ts.map