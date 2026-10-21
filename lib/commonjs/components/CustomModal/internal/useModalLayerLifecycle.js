"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModalLayerLifecycle = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../ModalLayer/index.js");
/** Enter / leave animation length of the app modal. */
const MODAL_TRANSITION_DURATION = 220;
const MODAL_TRANSITION_EASING = _reactNative.Easing.out(_reactNative.Easing.cubic);
const CLOSE_POLICY = {
  isDismissReported: true
};
const TEARDOWN_POLICY = {
  isDismissReported: false
};
/**
 * Lifecycle of a CustomModal drawn by the root ModalLayerHost.
 *
 * The modal is fully controlled: it is shown while `visible` is true and
 * hides only when `visible` turns false. X, the backdrop, a swipe, Android
 * Back and `ref.close()` only ask the owner to close through `onClose`; an
 * owner that keeps `visible` (a save in progress, a confirmation shown on
 * top) keeps the modal open, and a sheet moved by the swipe goes back.
 *
 * Phases change only on events: a `visible` edge, the first layout of the
 * sheet and the completion callback of its own animation. An animation that
 * was superseded is ignored by id, so no timer is needed to recover from a
 * missing callback.
 */
const useModalLayerLifecycle = ({
  visible,
  onClose,
  onDismissed,
  screenHeight,
  transitionDurationMs = MODAL_TRANSITION_DURATION,
  transitionStyle = 'slide'
}) => {
  const {
    isReducedMotion
  } = (0, _react.useContext)(_index.ModalLayerMotionContext);
  const isFadeTransition = transitionStyle === 'fade';
  const [phase, setPhase] = (0, _react.useState)('closed');
  const phaseRef = (0, _react.useRef)('closed');
  const closePolicyRef = (0, _react.useRef)(CLOSE_POLICY);
  const isEnterAwaitingLayoutRef = (0, _react.useRef)(false);
  const measuredHeightRef = (0, _react.useRef)(null);
  const animationIdRef = (0, _react.useRef)(0);
  const activeAnimationRef = (0, _react.useRef)(null);
  const previousVisibleRef = (0, _react.useRef)(null);
  const backdropOpacity = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const translateY = (0, _react.useRef)(new _reactNative.Animated.Value(isFadeTransition ? 0 : screenHeight)).current;

  // Latest props for the stable phase handlers below.
  const latestRef = (0, _react.useRef)({
    visible,
    isFadeTransition,
    isReducedMotion,
    screenHeight,
    onClose,
    onDismissed,
    transitionDurationMs
  });
  latestRef.current = {
    visible,
    isFadeTransition,
    isReducedMotion,
    screenHeight,
    onClose,
    onDismissed,
    transitionDurationMs
  };
  const resolveHiddenOffset = (0, _react.useCallback)(() => {
    const latest = latestRef.current;
    if (latest.isFadeTransition) {
      return 0;
    }
    return measuredHeightRef.current ?? latest.screenHeight;
  }, []);
  const stopAnimation = (0, _react.useCallback)(() => {
    // Bump first: stop() calls back synchronously and that callback is stale.
    animationIdRef.current += 1;
    activeAnimationRef.current?.stop();
    activeAnimationRef.current = null;
  }, []);
  const animateTo = (0, _react.useCallback)((isShown, onFinished) => {
    stopAnimation();
    if (latestRef.current.isReducedMotion) {
      backdropOpacity.setValue(isShown ? 1 : 0);
      translateY.setValue(isShown ? 0 : resolveHiddenOffset());
      onFinished();
      return;
    }
    const animationId = animationIdRef.current;
    const {
      transitionDurationMs: duration
    } = latestRef.current;
    const animation = _reactNative.Animated.parallel([_reactNative.Animated.timing(backdropOpacity, {
      toValue: isShown ? 1 : 0,
      duration,
      easing: MODAL_TRANSITION_EASING,
      useNativeDriver: true
    }), _reactNative.Animated.timing(translateY, {
      toValue: isShown ? 0 : resolveHiddenOffset(),
      duration,
      easing: MODAL_TRANSITION_EASING,
      useNativeDriver: true
    })], {
      stopTogether: true
    });
    activeAnimationRef.current = animation;
    // `finished` is false only when the animation was stopped; a stop by
    // this hook bumps the id first, so a current id means nothing replaced
    // this animation and the phase may advance.
    animation.start(() => {
      if (animationId !== animationIdRef.current) {
        return;
      }
      activeAnimationRef.current = null;
      onFinished();
    });
  }, [backdropOpacity, resolveHiddenOffset, stopAnimation, translateY]);
  const dispatch = (0, _react.useCallback)((event, options) => {
    const previousPhase = phaseRef.current;
    const nextPhase = (0, _index.transitionModalLayerPhase)(previousPhase, event);
    if (nextPhase === previousPhase) {
      return;
    }
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
    if (nextPhase === 'entering') {
      if (previousPhase === 'exiting') {
        // Reverse from wherever the leave animation is now.
        animateTo(true, () => dispatch('enterFinished'));
        return;
      }
      backdropOpacity.setValue(0);
      measuredHeightRef.current = null;
      translateY.setValue(resolveHiddenOffset());
      if (latestRef.current.isReducedMotion) {
        animateTo(true, () => dispatch('enterFinished'));
        return;
      }

      // The sheet height is known after its first layout in the host.
      isEnterAwaitingLayoutRef.current = true;
      return;
    }
    if (nextPhase === 'exiting') {
      isEnterAwaitingLayoutRef.current = false;
      if (options?.isImmediate) {
        stopAnimation();
        dispatch('exitFinished');
        return;
      }
      animateTo(false, () => dispatch('exitFinished'));
      return;
    }
    if (nextPhase === 'closed') {
      stopAnimation();
      // Right here, not in an effect: a frozen screen runs no effects, and
      // an open and a close in one batch would leave `phase` unchanged.
      if (closePolicyRef.current.isDismissReported) {
        latestRef.current.onDismissed?.();
      }
    }
  }, [animateTo, backdropOpacity, resolveHiddenOffset, stopAnimation, translateY]);
  const handleModalLayout = (0, _react.useCallback)(event => {
    const {
      height
    } = event.nativeEvent.layout;
    measuredHeightRef.current = height > 0 ? height : null;
    if (!isEnterAwaitingLayoutRef.current || phaseRef.current !== 'entering') {
      return;
    }
    isEnterAwaitingLayoutRef.current = false;
    translateY.setValue(resolveHiddenOffset());
    animateTo(true, () => dispatch('enterFinished'));
  }, [animateTo, dispatch, resolveHiddenOffset, translateY]);
  (0, _react.useEffect)(() => {
    if (previousVisibleRef.current === visible) {
      return;
    }
    const isInitialRender = previousVisibleRef.current === null;
    previousVisibleRef.current = visible;
    if (visible) {
      closePolicyRef.current = CLOSE_POLICY;
      // Before the content mounts, so an `autoFocus` inside it is kept.
      if (phaseRef.current === 'closed') {
        _reactNative.Keyboard.dismiss();
      }
      dispatch('show');
      return;
    }
    if (isInitialRender) {
      return;
    }
    _reactNative.Keyboard.dismiss();
    dispatch('hide');
  }, [dispatch, visible]);

  /** Set by a close request; settled once the owner has rendered it. */
  const isCloseRequestPendingRef = (0, _react.useRef)(false);
  const [closeRequest, setCloseRequest] = (0, _react.useState)(0);

  // The owner kept `visible` (it refused, or asked for a confirmation shown
  // on top): bring back a sheet the swipe moved. A refusal changes nothing
  // else, so a closed modal and the owner's flag can never disagree.
  (0, _react.useEffect)(() => {
    if (!isCloseRequestPendingRef.current) {
      return;
    }
    isCloseRequestPendingRef.current = false;
    if (phaseRef.current === 'open') {
      animateTo(true, () => undefined);
    }
  }, [animateTo, closeRequest]);

  /** X, backdrop, swipe, Back, `ref.close()`: ask the owner to close. */
  const handleClose = (0, _react.useCallback)(() => {
    _reactNative.Keyboard.dismiss();
    // One request per owner render: a double tap in one frame asks once.
    if (!(0, _index.isModalLayerPhaseActive)(phaseRef.current) || isCloseRequestPendingRef.current) {
      return;
    }
    isCloseRequestPendingRef.current = true;
    setCloseRequest(request => request + 1);
    latestRef.current.onClose();
  }, []);
  const dismissForTeardown = (0, _react.useCallback)(() => {
    if (phaseRef.current === 'closed') {
      return;
    }
    closePolicyRef.current = TEARDOWN_POLICY;
    if (phaseRef.current === 'exiting') {
      stopAnimation();
      dispatch('exitFinished');
      return;
    }
    dispatch('hide', {
      isImmediate: true
    });
  }, [dispatch, stopAnimation]);

  /**
   * The content can't render: ask the owner to close and hide anyway.
   * `onDismissed` still follows, so nothing stays held for a modal that is
   * no longer on screen.
   */
  const forceClose = (0, _react.useCallback)(() => {
    if (!(0, _index.isModalLayerPhaseActive)(phaseRef.current)) {
      return;
    }

    // The layer is gone either way: owners (presence, sequence, alerts)
    // wait for `onDismissed` to release what they hold for this modal.
    closePolicyRef.current = CLOSE_POLICY;
    try {
      latestRef.current.onClose();
    } finally {
      dispatch('hide');
    }
  }, [dispatch]);
  const getPhase = (0, _react.useCallback)(() => phaseRef.current, []);
  /** Bumped on reattach: a detached leave that ends after it is stale. */
  const detachGenerationRef = (0, _react.useRef)(0);

  // The owner left while the modal was on screen (unmounted, or its screen
  // was frozen). Animate the layer out without touching the phase: a frozen
  // owner comes back through `reattach` in the phase it had.
  const animateDetachedExit = (0, _react.useCallback)(onLayerRemoved => {
    detachGenerationRef.current += 1;
    const detachGeneration = detachGenerationRef.current;
    stopAnimation();
    // A modal that was already closing finishes its close here, so its
    // post-close callbacks run now and not once the screen comes back.
    const onFinished = () => {
      onLayerRemoved();
      if (phaseRef.current === 'exiting') {
        dispatch('exitFinished');
      }
    };
    if (latestRef.current.isReducedMotion) {
      onFinished();
      return;
    }
    const {
      transitionDurationMs: duration
    } = latestRef.current;
    _reactNative.Animated.parallel([_reactNative.Animated.timing(backdropOpacity, {
      toValue: 0,
      duration,
      easing: MODAL_TRANSITION_EASING,
      useNativeDriver: true
    }), _reactNative.Animated.timing(translateY, {
      toValue: resolveHiddenOffset(),
      duration,
      easing: MODAL_TRANSITION_EASING,
      useNativeDriver: true
    })], {
      stopTogether: true
    }).start(({
      finished
    }) => {
      if (detachGeneration !== detachGenerationRef.current) {
        return;
      }
      if (finished) {
        onFinished();
        return;
      }
      // Stopped, not finished: React tears the animated view down inside
      // its commit (an insertion-effect cleanup stops the animation), where
      // the layer store must not be updated. Finish right after the commit.
      queueMicrotask(() => {
        if (detachGeneration === detachGenerationRef.current) {
          onFinished();
        }
      });
    });
  }, [backdropOpacity, dispatch, resolveHiddenOffset, stopAnimation, translateY]);

  // The layer is back in the host (first mount, or a frozen screen shown
  // again): bring the sheet to where its phase says it is.
  const reattach = (0, _react.useCallback)(() => {
    detachGenerationRef.current += 1;
    const currentPhase = phaseRef.current;
    if (currentPhase === 'closed' || isEnterAwaitingLayoutRef.current) {
      return;
    }
    if (currentPhase === 'exiting') {
      animateTo(false, () => dispatch('exitFinished'));
      return;
    }

    // Closed while its screen was frozen (no effects ran): leave, don't
    // slide in first and out again.
    if (!latestRef.current.visible) {
      previousVisibleRef.current = false;
      dispatch('hide');
      return;
    }
    animateTo(true, () => dispatch('enterFinished'));
  }, [animateTo, dispatch]);
  (0, _react.useEffect)(() => stopAnimation, [stopAnimation]);
  return {
    animateDetachedExit,
    backdropOpacity,
    dismissForTeardown,
    forceClose,
    getPhase,
    handleClose,
    handleModalLayout,
    isClosing: phase === 'exiting',
    isRendered: phase !== 'closed',
    phase,
    reattach,
    translateY
  };
};
exports.useModalLayerLifecycle = useModalLayerLifecycle;
//# sourceMappingURL=useModalLayerLifecycle.js.map