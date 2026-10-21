"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StickyTabsContent = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _StickyTabsContext = require("./StickyTabsContext.js");
var _jsxRuntime = require("react/jsx-runtime");
const shouldRenderPanel = ({
  contentMode,
  isActive,
  isVisited,
  keepMounted,
  lazy
}) => {
  if (contentMode === 'keep-mounted-hidden' || contentMode === 'keep-mounted-stacked') {
    if (lazy && !isVisited) {
      return false;
    }
    return keepMounted || isVisited;
  }
  return isActive;
};

/** Renders the panels according to `contentMode`; measures the content width. */
const StickyTabsContent = ({
  containerStyle,
  panelStyle
}) => {
  const {
    contentIndex,
    contentMode,
    handleContentWidthChange,
    isContentSynced,
    lastSyncedContentHeight,
    panelTestIDs,
    panels,
    preserveContentHeightDuringTransition,
    selectedIndex,
    setLastSyncedContentHeight,
    visitedTabIndexes
  } = (0, _StickyTabsContext.useStickyTabsContext)();
  const isStackedContent = contentMode === 'keep-mounted-stacked';
  const isTargetTransitionShellShown = contentMode === 'active-only' && !isContentSynced && panels[selectedIndex]?.transitionShell != null;
  const handleLayout = ({
    nativeEvent
  }) => {
    if (!nativeEvent.layout.width) {
      return;
    }
    handleContentWidthChange(nativeEvent.layout.width);
  };
  const handleContentHeightLayout = ({
    nativeEvent
  }) => {
    if (!isContentSynced) {
      return;
    }
    setLastSyncedContentHeight(nativeEvent.layout.height);
  };
  const containerStyles = (0, _react.useMemo)(() => [styles.container, isStackedContent ? styles.stackedContainer : null, containerStyle, !isContentSynced && preserveContentHeightDuringTransition && lastSyncedContentHeight > 0 ? {
    minHeight: lastSyncedContentHeight
  } : null], [containerStyle, isContentSynced, isStackedContent, lastSyncedContentHeight, preserveContentHeightDuringTransition]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: containerStyles,
    onLayout: handleLayout,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: isStackedContent ? styles.stackedContent : null,
      onLayout: handleContentHeightLayout,
      children: panels.map((panel, index) => {
        const isTargetTransitionShell = isTargetTransitionShellShown && index === selectedIndex;
        const isActive = contentMode === 'keep-mounted-hidden' || contentMode === 'immediate' || isStackedContent ? index === selectedIndex : index === contentIndex;
        const isVisited = visitedTabIndexes.has(index);
        const shouldRender = isTargetTransitionShell || !isTargetTransitionShellShown && shouldRenderPanel({
          contentMode,
          isActive,
          isVisited,
          keepMounted: panel.keepMounted,
          lazy: panel.lazy
        });
        if (!shouldRender) {
          return null;
        }
        const isHidden = contentMode === 'keep-mounted-hidden' && !isActive;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          pointerEvents: isStackedContent && !isActive ? 'none' : 'auto',
          style: [styles.panel, isStackedContent ? styles.stackedPanel : null, panelStyle, isHidden ? styles.hiddenPanel : null, isStackedContent ? isActive ? styles.activeStackedPanel : styles.inactiveStackedPanel : null],
          testID: panelTestIDs[index],
          children: isTargetTransitionShell ? panel.transitionShell : panel.children
        }, panelTestIDs[index]);
      })
    })
  });
};
exports.StickyTabsContent = StickyTabsContent;
const styles = _reactNative.StyleSheet.create({
  container: {
    width: '100%'
  },
  hiddenPanel: {
    display: 'none'
  },
  panel: {
    width: '100%'
  },
  activeStackedPanel: {
    opacity: 1,
    zIndex: 1
  },
  inactiveStackedPanel: {
    opacity: 0,
    zIndex: 0
  },
  stackedContainer: {
    flex: 1
  },
  stackedContent: {
    flex: 1
  },
  stackedPanel: {
    ..._reactNative.StyleSheet.absoluteFillObject
  }
});
//# sourceMappingURL=StickyTabsContent.js.map