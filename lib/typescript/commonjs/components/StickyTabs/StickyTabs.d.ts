import type { StickyTabsProps } from './StickyTabs.types';
export declare const StickyTabs: (({ barMode, barStyle, children, contentMode, contentTransitionMs, contentWidth, defaultSelectedIndex, onBarLayout, onBeforeTabChange, onContentWidthChange, onSelectedIndexChange, preserveContentHeightDuringTransition, scrollX, selectedIndex, stickyBar, testID, }: StickyTabsProps) => import("react").JSX.Element) & {
    Bar: import("react").MemoExoticComponent<({ animatedStyle, style, syncWithScroll, top, }: import("./StickyTabs.types").StickyTabsBarProps) => import("react").JSX.Element>;
    Content: ({ containerStyle, panelStyle, }: import("./StickyTabs.types").StickyTabsContentProps) => import("react").JSX.Element;
    Panel: import("react").FC<import("./StickyTabs.types").StickyTabsPanelProps>;
    Spacer: () => import("react").JSX.Element;
};
//# sourceMappingURL=StickyTabs.d.ts.map