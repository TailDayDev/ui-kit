"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomModal = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _index = require("../../theme/index.js");
var _index2 = require("../ModalLayer/index.js");
var _CustomModalConstants = require("./CustomModal.constants.js");
var _CustomModalStyles = require("./CustomModal.styles.js");
var _CustomModalProvider = require("./CustomModalProvider.js");
var _ModalParentVisibilityContext = require("./internal/ModalParentVisibilityContext.js");
var _resolveModalLayout = require("./internal/resolveModalLayout.js");
var _useModalKeyboardHeight = require("./internal/useModalKeyboardHeight.js");
var _useModalLayerLifecycle = require("./internal/useModalLayerLifecycle.js");
var _useModalPages = require("./internal/useModalPages.js");
var _useModalRegistration = require("./internal/useModalRegistration.js");
var _useModalRenderConfig = require("./internal/useModalRenderConfig.js");
var _useSwipeDownToClose = require("./internal/useSwipeDownToClose.js");
var _ModalHeader = require("./ModalHeader.js");
var _ModalPages = require("./ModalPages.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Content padding above the header when the device has a top inset (app value: space[2]). */const CONTENT_TOP_PADDING_WITH_INSET = 8;

/**
 * A bottom sheet drawn in the root modal layer host (`ModalLayerRoot`).
 * Fully controlled: it is shown while `visible` is true; X, backdrop, swipe
 * and Android Back only ask the owner to close through `onClose`.
 *
 * A modal opened from inside an open CustomModal must be declared inside it
 * (`children`, `header`, `footer` or `nestedOverlays`), never as a sibling:
 * it then closes together with its parent.
 */
const CustomModal = exports.CustomModal = /*#__PURE__*/(0, _react.forwardRef)(({
  visible,
  onClose,
  onDismissed,
  isLocked = false,
  title,
  header,
  footer,
  footerBottomPadding,
  contentTopPadding,
  modalHeight,
  modalTopOffset,
  transitionDurationMs,
  transitionStyle = 'slide',
  children,
  divider = true,
  autoHeight = false,
  withBackdrop = true,
  closeOnBackdropPress = autoHeight,
  closeOnSwipeDown = false,
  withoutContainerFooter = false,
  modalKey,
  nestedOverlays,
  handleBackBtn,
  closeButtonTestID = _CustomModalConstants.CUSTOM_MODAL_CLOSE_TEST_ID,
  closeAccessibilityLabel,
  avoidKeyboard = false,
  adjustScrollContentForKeyboard = false,
  keyboardInsetBottomOffset = _CustomModalConstants.DEFAULT_KEYBOARD_INSET_BOTTOM_OFFSET,
  pageHost = 'scroll-view',
  scrollEnabled = true,
  scrollRef,
  defaultScreenIndex = 0,
  containerStyles,
  headerStyles,
  liftFooterOnKeyboard = false,
  inlineAlert
}, ref) => {
  const styles = (0, _index.useThemedStyles)(_CustomModalStyles.createStyles);
  const environment = (0, _react.useContext)(_CustomModalProvider.CustomModalEnvironmentContext);
  const isParentVisible = (0, _react.useContext)(_ModalParentVisibilityContext.ModalParentVisibilityContext);
  // A leaving parent freezes its content, nested modals included, so they
  // keep the `visible` of its last shown render: hide them with the parent.
  const isVisible = visible && isParentVisible;
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  // The host's area, not the window: on Android the root view the layers
  // live in can exclude the system bars.
  const {
    width: screenWidth,
    height: screenHeight
  } = (0, _index2.useModalLayerFrame)();
  const instanceId = `custom-modal${(0, _react.useId)()}`;
  const sheetRef = (0, _react.useRef)(null);
  const {
    animateDetachedExit,
    backdropOpacity,
    dismissForTeardown,
    forceClose,
    getPhase,
    handleClose,
    handleModalLayout,
    isClosing,
    isRendered,
    phase,
    reattach,
    translateY
  } = (0, _useModalLayerLifecycle.useModalLayerLifecycle)({
    onClose,
    onDismissed,
    screenHeight,
    transitionDurationMs,
    transitionStyle,
    visible: isVisible
  });
  const {
    screenIndex,
    slideAnim,
    slideTo,
    titleOpacity
  } = (0, _useModalPages.useModalPages)({
    phase,
    defaultScreenIndex,
    pageWidth: screenWidth
  });
  const handle = (0, _react.useMemo)(() => ({
    close: handleClose,
    dismissForTeardown,
    slideTo
  }), [dismissForTeardown, handleClose, slideTo]);
  const handleRef = (0, _react.useRef)(handle);
  handleRef.current = handle;
  (0, _react.useImperativeHandle)(ref, () => handle, [handle]);

  // Everything the sheet shows, frozen while it animates out.
  const config = (0, _useModalRenderConfig.useModalRenderConfig)(isVisible, {
    adjustScrollContentForKeyboard,
    autoHeight,
    avoidKeyboard,
    children,
    closeAccessibilityLabel: closeAccessibilityLabel ?? environment.closeAccessibilityLabel ?? '',
    closeButtonTestID,
    closeOnBackdropPress,
    closeOnSwipeDown,
    containerStyles,
    contentTopPadding,
    divider,
    footer,
    footerBottomPadding,
    handleBackBtn,
    header,
    headerStyles,
    inlineAlert,
    isLocked,
    keyboardInsetBottomOffset,
    liftFooterOnKeyboard,
    modalHeight,
    modalTopOffset,
    nestedOverlays,
    pageHost,
    scrollEnabled,
    title,
    transitionStyle,
    withBackdrop,
    withoutContainerFooter
  });
  const pages = (0, _react.useMemo)(() => (0, _ModalPages.toModalPages)(config.children), [config.children]);
  const layerPosition = (0, _index2.useModalLayerPosition)(instanceId, isRendered);
  const isTopModal = layerPosition.isTop;
  const canInteract = isTopModal && isVisible && !isClosing;
  // Close and back controls ignore presses while busy or leaving.
  const isInteractionBlocked = config.isLocked || isClosing;
  const requestClose = (0, _react.useCallback)(() => {
    if (!isInteractionBlocked) {
      handleClose();
    }
  }, [handleClose, isInteractionBlocked]);
  const handleBackBtnPress = config.handleBackBtn;
  const requestBack = (0, _react.useMemo)(() => handleBackBtnPress ? () => {
    if (!isInteractionBlocked) {
      handleBackBtnPress();
    }
  } : undefined, [handleBackBtnPress, isInteractionBlocked]);
  (0, _useModalRegistration.useModalRegistration)({
    instanceId,
    modalKey,
    isRendered,
    onBackPress: requestClose,
    handleRef
  });
  (0, _useModalRegistration.useModalPresentationTelemetry)({
    modalKey,
    isVisible,
    isRendered,
    isTopModal,
    isClosing,
    canInteract,
    isLocked: config.isLocked,
    pageHost: config.pageHost
  });
  const keyboardHeight = (0, _useModalKeyboardHeight.useModalKeyboardHeight)(isRendered && isTopModal && (config.liftFooterOnKeyboard || config.avoidKeyboard || config.adjustScrollContentForKeyboard), screenHeight, isClosing, environment.keyboardAccessoryHeight);
  const swipeHandlers = (0, _useSwipeDownToClose.useSwipeDownToClose)(config.closeOnSwipeDown && canInteract, requestClose, sheetRef);
  const hasFooter = Boolean(config.footer);
  const layout = (0, _resolveModalLayout.resolveModalLayout)({
    screenHeight,
    topInset: insets.top,
    bottomInset: insets.bottom,
    layerIndex: Math.max(0, layerPosition.index),
    modalTopOffset: config.modalTopOffset,
    modalHeight: config.modalHeight,
    isAutoHeight: config.autoHeight,
    hasFooter,
    isWithoutContainerFooter: config.withoutContainerFooter,
    footerBottomPadding: config.footerBottomPadding,
    keyboardHeight,
    keyboardInsetBottomOffset: config.keyboardInsetBottomOffset,
    isAvoidingKeyboard: config.avoidKeyboard,
    isFooterLiftedOnKeyboard: config.liftFooterOnKeyboard,
    isAdjustingScrollContent: config.adjustScrollContentForKeyboard,
    platform: _reactNative.Platform.OS
  });
  const touchPointerEvents = canInteract ? 'auto' : 'none';
  const modalLayer = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    pointerEvents: canInteract ? 'box-none' : 'none',
    style: _CustomModalStyles.layoutStyles.fill,
    children: [config.withBackdrop ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
      disabled: !config.closeOnBackdropPress || isInteractionBlocked,
      onPress: config.closeOnBackdropPress ? requestClose : undefined,
      pointerEvents: touchPointerEvents,
      style: _reactNative.StyleSheet.absoluteFill,
      testID: "custom-modal-backdrop",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
        pointerEvents: "none",
        style: [styles.backdrop, {
          opacity: backdropOpacity
        }]
      })
    }) :
    /*#__PURE__*/
    // No dimming, but the screen below stays blocked.
    (0, _jsxRuntime.jsx)(_reactNative.View, {
      pointerEvents: touchPointerEvents,
      style: _reactNative.StyleSheet.absoluteFill,
      testID: "custom-modal-touch-blocker"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: _CustomModalStyles.layoutStyles.sheetWrapper,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
        ref: sheetRef,
        onLayout: handleModalLayout,
        style: [styles.container, {
          width: screenWidth
        }, config.autoHeight ? {
          maxHeight: layout.availableHeight
        } : {
          height: layout.sheetHeight
        }, config.containerStyles, {
          opacity: config.transitionStyle === 'fade' ? backdropOpacity : 1,
          transform: [{
            translateY
          }]
        }],
        testID: "custom-modal-swipe-surface",
        ...swipeHandlers,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          pointerEvents: canInteract && !config.isLocked ? 'auto' : 'none',
          style: [!config.autoHeight && _CustomModalStyles.layoutStyles.fill, {
            paddingBottom: layout.contentPaddingBottom,
            paddingTop: config.contentTopPadding ?? (insets.top > 0 ? CONTENT_TOP_PADDING_WITH_INSET : 0)
          }],
          children: [config.header !== null ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: [styles.header, config.headerStyles],
            testID: "custom-modal-header",
            children: config.header === undefined ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalHeader.ModalHeader, {
              closeAccessibilityLabel: config.closeAccessibilityLabel,
              closeTestID: config.closeButtonTestID,
              isDisabled: isInteractionBlocked,
              onBack: requestBack,
              onClose: requestClose,
              styles: styles,
              title: config.title,
              titleOpacity: titleOpacity
            }) : config.header
          }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: [_CustomModalStyles.layoutStyles.pagesClip, !config.autoHeight && _CustomModalStyles.layoutStyles.fill],
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPages.ModalPages, {
              activeIndex: screenIndex,
              contentMaxHeight: layout.contentMaxHeight,
              isAutoHeight: config.autoHeight,
              isKeyboardDismissInteractive: config.avoidKeyboard || config.adjustScrollContentForKeyboard,
              isScrollEnabled: config.scrollEnabled,
              pageHost: config.pageHost,
              pageWidth: screenWidth,
              pages: pages,
              scrollContentInsetBottom: layout.scrollContentInsetBottom,
              scrollContentPaddingBottom: layout.scrollContentPaddingBottom,
              scrollRef: scrollRef,
              slideAnim: slideAnim,
              styles: styles
            })
          }), hasFooter ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: [styles.footerSurface, !config.withoutContainerFooter && styles.footer, !config.withoutContainerFooter && !config.divider && styles.footerWithoutDivider, {
              paddingBottom: layout.footerPaddingBottom
            }],
            children: config.footer
          }) : null, isTopModal && config.inlineAlert ? config.inlineAlert : null]
        })
      })
    }), config.nestedOverlays]
  });
  return isRendered ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.ModalLayerPortal, {
    getPhase: getPhase,
    id: instanceId,
    onAttach: reattach,
    onContentError: forceClose,
    onDetach: animateDetachedExit,
    phase: phase,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalParentVisibilityContext.ModalParentVisibilityContext.Provider, {
      value: isVisible,
      children: modalLayer
    })
  }) : null;
});
CustomModal.displayName = 'CustomModal';
//# sourceMappingURL=CustomModal.js.map