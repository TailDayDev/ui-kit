import { type ReactElement, type ReactNode } from 'react';
import type { StickyTabsContextValue, StickyTabsPanelConfig, StickyTabsProps } from './StickyTabs.types.js';
interface UseStickyTabsStateParams extends Pick<StickyTabsProps, 'barMode' | 'barStyle' | 'contentMode' | 'contentTransitionMs' | 'contentWidth' | 'defaultSelectedIndex' | 'onBarLayout' | 'onBeforeTabChange' | 'onContentWidthChange' | 'onSelectedIndexChange' | 'preserveContentHeightDuringTransition' | 'scrollX' | 'selectedIndex' | 'stickyBar' | 'testID'> {
    panels: StickyTabsPanelConfig[];
}
export declare const useStickyTabsState: ({ barMode, barStyle, contentMode, contentTransitionMs, contentWidth: controlledContentWidth, defaultSelectedIndex, onBarLayout, onBeforeTabChange, onContentWidthChange, onSelectedIndexChange, panels, preserveContentHeightDuringTransition, scrollX: controlledScrollX, selectedIndex: controlledSelectedIndex, stickyBar, testID, }: UseStickyTabsStateParams) => StickyTabsContextValue;
export declare const collectStickyTabsPanels: (children: ReactNode, isPanelElement: (child: ReactNode) => child is ReactElement<StickyTabsPanelConfig>) => {
    layoutChildren: ReactNode[];
    panels: StickyTabsPanelConfig[];
};
export {};
//# sourceMappingURL=useStickyTabsState.d.ts.map