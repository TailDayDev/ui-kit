import {
  forwardRef,
  useCallback,
  useContext,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Animated, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemedStyles } from '../../theme';
import {
  ModalLayerPortal,
  useModalLayerFrame,
  useModalLayerPosition,
} from '../ModalLayer';
import {
  CUSTOM_MODAL_CLOSE_TEST_ID,
  DEFAULT_KEYBOARD_INSET_BOTTOM_OFFSET,
} from './CustomModal.constants';
import { createStyles, layoutStyles } from './CustomModal.styles';
import type { CustomModalHandle, CustomModalProps } from './CustomModal.types';
import { CustomModalEnvironmentContext } from './CustomModalProvider';
import { ModalParentVisibilityContext } from './internal/ModalParentVisibilityContext';
import { resolveModalLayout } from './internal/resolveModalLayout';
import { useModalKeyboardHeight } from './internal/useModalKeyboardHeight';
import { useModalLayerLifecycle } from './internal/useModalLayerLifecycle';
import { useModalPages } from './internal/useModalPages';
import {
  useModalPresentationTelemetry,
  useModalRegistration,
} from './internal/useModalRegistration';
import { useModalRenderConfig } from './internal/useModalRenderConfig';
import { useSwipeDownToClose } from './internal/useSwipeDownToClose';
import { ModalHeader } from './ModalHeader';
import { ModalPages, toModalPages } from './ModalPages';

/** Content padding above the header when the device has a top inset (app value: space[2]). */
const CONTENT_TOP_PADDING_WITH_INSET = 8;

/**
 * A bottom sheet drawn in the root modal layer host (`ModalLayerRoot`).
 * Fully controlled: it is shown while `visible` is true; X, backdrop, swipe
 * and Android Back only ask the owner to close through `onClose`.
 *
 * A modal opened from inside an open CustomModal must be declared inside it
 * (`children`, `header`, `footer` or `nestedOverlays`), never as a sibling:
 * it then closes together with its parent.
 */
export const CustomModal = forwardRef<CustomModalHandle, CustomModalProps>(
  (
    {
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
      closeButtonTestID = CUSTOM_MODAL_CLOSE_TEST_ID,
      closeAccessibilityLabel,
      avoidKeyboard = false,
      adjustScrollContentForKeyboard = false,
      keyboardInsetBottomOffset = DEFAULT_KEYBOARD_INSET_BOTTOM_OFFSET,
      pageHost = 'scroll-view',
      scrollEnabled = true,
      scrollRef,
      defaultScreenIndex = 0,
      containerStyles,
      headerStyles,
      liftFooterOnKeyboard = false,
      inlineAlert,
    },
    ref,
  ) => {
    const styles = useThemedStyles(createStyles);
    const environment = useContext(CustomModalEnvironmentContext);
    const isParentVisible = useContext(ModalParentVisibilityContext);
    // A leaving parent freezes its content, nested modals included, so they
    // keep the `visible` of its last shown render: hide them with the parent.
    const isVisible = visible && isParentVisible;
    const insets = useSafeAreaInsets();
    // The host's area, not the window: on Android the root view the layers
    // live in can exclude the system bars.
    const { width: screenWidth, height: screenHeight } = useModalLayerFrame();
    const instanceId = `custom-modal${useId()}`;
    const sheetRef = useRef<View>(null);

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
      translateY,
    } = useModalLayerLifecycle({
      onClose,
      onDismissed,
      screenHeight,
      transitionDurationMs,
      transitionStyle,
      visible: isVisible,
    });
    const { screenIndex, slideAnim, slideTo, titleOpacity } = useModalPages({
      phase,
      defaultScreenIndex,
      pageWidth: screenWidth,
    });

    const handle = useMemo<CustomModalHandle>(
      () => ({ close: handleClose, dismissForTeardown, slideTo }),
      [dismissForTeardown, handleClose, slideTo],
    );
    const handleRef = useRef(handle);
    handleRef.current = handle;
    useImperativeHandle(ref, () => handle, [handle]);

    // Everything the sheet shows, frozen while it animates out.
    const config = useModalRenderConfig(isVisible, {
      adjustScrollContentForKeyboard,
      autoHeight,
      avoidKeyboard,
      children,
      closeAccessibilityLabel:
        closeAccessibilityLabel ?? environment.closeAccessibilityLabel ?? '',
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
      withoutContainerFooter,
    });

    const pages = useMemo(
      () => toModalPages(config.children),
      [config.children],
    );

    const layerPosition = useModalLayerPosition(instanceId, isRendered);
    const isTopModal = layerPosition.isTop;
    const canInteract = isTopModal && isVisible && !isClosing;
    // Close and back controls ignore presses while busy or leaving.
    const isInteractionBlocked = config.isLocked || isClosing;

    const requestClose = useCallback(() => {
      if (!isInteractionBlocked) {
        handleClose();
      }
    }, [handleClose, isInteractionBlocked]);
    const handleBackBtnPress = config.handleBackBtn;
    const requestBack = useMemo(
      () =>
        handleBackBtnPress
          ? () => {
              if (!isInteractionBlocked) {
                handleBackBtnPress();
              }
            }
          : undefined,
      [handleBackBtnPress, isInteractionBlocked],
    );

    useModalRegistration({
      instanceId,
      modalKey,
      isRendered,
      onBackPress: requestClose,
      handleRef,
    });
    useModalPresentationTelemetry({
      modalKey,
      isVisible,
      isRendered,
      isTopModal,
      isClosing,
      canInteract,
      isLocked: config.isLocked,
      pageHost: config.pageHost,
    });

    const keyboardHeight = useModalKeyboardHeight(
      isRendered &&
        isTopModal &&
        (config.liftFooterOnKeyboard ||
          config.avoidKeyboard ||
          config.adjustScrollContentForKeyboard),
      screenHeight,
      isClosing,
      environment.keyboardAccessoryHeight,
    );
    const swipeHandlers = useSwipeDownToClose(
      config.closeOnSwipeDown && canInteract,
      requestClose,
      sheetRef,
    );

    const hasFooter = Boolean(config.footer);
    const layout = resolveModalLayout({
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
      platform: Platform.OS,
    });

    const touchPointerEvents = canInteract ? 'auto' : 'none';

    const modalLayer = (
      <View
        pointerEvents={canInteract ? 'box-none' : 'none'}
        style={layoutStyles.fill}
      >
        {config.withBackdrop ? (
          <Pressable
            disabled={!config.closeOnBackdropPress || isInteractionBlocked}
            onPress={config.closeOnBackdropPress ? requestClose : undefined}
            pointerEvents={touchPointerEvents}
            style={StyleSheet.absoluteFill}
            testID="custom-modal-backdrop"
          >
            <Animated.View
              pointerEvents="none"
              style={[styles.backdrop, { opacity: backdropOpacity }]}
            />
          </Pressable>
        ) : (
          // No dimming, but the screen below stays blocked.
          <View
            pointerEvents={touchPointerEvents}
            style={StyleSheet.absoluteFill}
            testID="custom-modal-touch-blocker"
          />
        )}
        <View style={layoutStyles.sheetWrapper}>
          <Animated.View
            ref={sheetRef}
            onLayout={handleModalLayout}
            style={[
              styles.container,
              { width: screenWidth },
              config.autoHeight
                ? { maxHeight: layout.availableHeight }
                : { height: layout.sheetHeight },
              config.containerStyles,
              {
                opacity:
                  config.transitionStyle === 'fade' ? backdropOpacity : 1,
                transform: [{ translateY }],
              },
            ]}
            testID="custom-modal-swipe-surface"
            {...swipeHandlers}
          >
            <View
              pointerEvents={canInteract && !config.isLocked ? 'auto' : 'none'}
              style={[
                !config.autoHeight && layoutStyles.fill,
                {
                  paddingBottom: layout.contentPaddingBottom,
                  paddingTop:
                    config.contentTopPadding ??
                    (insets.top > 0 ? CONTENT_TOP_PADDING_WITH_INSET : 0),
                },
              ]}
            >
              {config.header !== null ? (
                <View
                  style={[styles.header, config.headerStyles]}
                  testID="custom-modal-header"
                >
                  {config.header === undefined ? (
                    <ModalHeader
                      closeAccessibilityLabel={config.closeAccessibilityLabel}
                      closeTestID={config.closeButtonTestID}
                      isDisabled={isInteractionBlocked}
                      onBack={requestBack}
                      onClose={requestClose}
                      styles={styles}
                      title={config.title}
                      titleOpacity={titleOpacity}
                    />
                  ) : (
                    config.header
                  )}
                </View>
              ) : null}

              <View
                style={[
                  layoutStyles.pagesClip,
                  !config.autoHeight && layoutStyles.fill,
                ]}
              >
                <ModalPages
                  activeIndex={screenIndex}
                  contentMaxHeight={layout.contentMaxHeight}
                  isAutoHeight={config.autoHeight}
                  isKeyboardDismissInteractive={
                    config.avoidKeyboard ||
                    config.adjustScrollContentForKeyboard
                  }
                  isScrollEnabled={config.scrollEnabled}
                  pageHost={config.pageHost}
                  pageWidth={screenWidth}
                  pages={pages}
                  scrollContentInsetBottom={layout.scrollContentInsetBottom}
                  scrollContentPaddingBottom={layout.scrollContentPaddingBottom}
                  scrollRef={scrollRef}
                  slideAnim={slideAnim}
                  styles={styles}
                />
              </View>

              {hasFooter ? (
                <View
                  style={[
                    styles.footerSurface,
                    !config.withoutContainerFooter && styles.footer,
                    !config.withoutContainerFooter &&
                      !config.divider &&
                      styles.footerWithoutDivider,
                    { paddingBottom: layout.footerPaddingBottom },
                  ]}
                >
                  {config.footer}
                </View>
              ) : null}
              {/* The modal's own alert only: app-wide alerts are drawn
                  above every modal by the app. */}
              {isTopModal && config.inlineAlert ? config.inlineAlert : null}
            </View>
          </Animated.View>
        </View>
        {config.nestedOverlays}
      </View>
    );

    return isRendered ? (
      <ModalLayerPortal
        getPhase={getPhase}
        id={instanceId}
        onAttach={reattach}
        onContentError={forceClose}
        onDetach={animateDetachedExit}
        phase={phase}
      >
        <ModalParentVisibilityContext.Provider value={isVisible}>
          {modalLayer}
        </ModalParentVisibilityContext.Provider>
      </ModalLayerPortal>
    ) : null;
  },
);

CustomModal.displayName = 'CustomModal';
