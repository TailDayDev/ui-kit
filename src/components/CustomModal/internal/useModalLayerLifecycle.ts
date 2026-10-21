import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Keyboard,
  type LayoutChangeEvent,
} from 'react-native';

import {
  isModalLayerPhaseActive,
  ModalLayerMotionContext,
  transitionModalLayerPhase,
  type ModalLayerPhase,
  type ModalLayerPhaseEvent,
} from '../../ModalLayer';

/** Enter / leave animation length of the app modal. */
const MODAL_TRANSITION_DURATION = 220;
const MODAL_TRANSITION_EASING = Easing.out(Easing.cubic);

interface IClosePolicy {
  /** Call `onDismissed` once closed; off for teardown (logout). */
  isDismissReported: boolean;
}

const CLOSE_POLICY: IClosePolicy = { isDismissReported: true };
const TEARDOWN_POLICY: IClosePolicy = { isDismissReported: false };

interface IModalLayerLifecycleParams {
  visible: boolean;
  onClose: () => void;
  onDismissed?: () => void;
  screenHeight: number;
  transitionDurationMs?: number;
  transitionStyle?: 'fade' | 'slide';
}

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
export const useModalLayerLifecycle = ({
  visible,
  onClose,
  onDismissed,
  screenHeight,
  transitionDurationMs = MODAL_TRANSITION_DURATION,
  transitionStyle = 'slide',
}: IModalLayerLifecycleParams) => {
  const { isReducedMotion } = useContext(ModalLayerMotionContext);
  const isFadeTransition = transitionStyle === 'fade';

  const [phase, setPhase] = useState<ModalLayerPhase>('closed');

  const phaseRef = useRef<ModalLayerPhase>('closed');
  const closePolicyRef = useRef<IClosePolicy>(CLOSE_POLICY);
  const isEnterAwaitingLayoutRef = useRef(false);
  const measuredHeightRef = useRef<number | null>(null);
  const animationIdRef = useRef(0);
  const activeAnimationRef = useRef<Animated.CompositeAnimation | null>(null);
  const previousVisibleRef = useRef<boolean | null>(null);

  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(
    new Animated.Value(isFadeTransition ? 0 : screenHeight),
  ).current;

  // Latest props for the stable phase handlers below.
  const latestRef = useRef({
    visible,
    isFadeTransition,
    isReducedMotion,
    screenHeight,
    onClose,
    onDismissed,
    transitionDurationMs,
  });
  latestRef.current = {
    visible,
    isFadeTransition,
    isReducedMotion,
    screenHeight,
    onClose,
    onDismissed,
    transitionDurationMs,
  };

  const resolveHiddenOffset = useCallback(() => {
    const latest = latestRef.current;
    if (latest.isFadeTransition) {
      return 0;
    }

    return measuredHeightRef.current ?? latest.screenHeight;
  }, []);

  const stopAnimation = useCallback(() => {
    // Bump first: stop() calls back synchronously and that callback is stale.
    animationIdRef.current += 1;
    activeAnimationRef.current?.stop();
    activeAnimationRef.current = null;
  }, []);

  const animateTo = useCallback(
    (isShown: boolean, onFinished: () => void) => {
      stopAnimation();
      if (latestRef.current.isReducedMotion) {
        backdropOpacity.setValue(isShown ? 1 : 0);
        translateY.setValue(isShown ? 0 : resolveHiddenOffset());
        onFinished();
        return;
      }

      const animationId = animationIdRef.current;
      const { transitionDurationMs: duration } = latestRef.current;
      const animation = Animated.parallel(
        [
          Animated.timing(backdropOpacity, {
            toValue: isShown ? 1 : 0,
            duration,
            easing: MODAL_TRANSITION_EASING,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: isShown ? 0 : resolveHiddenOffset(),
            duration,
            easing: MODAL_TRANSITION_EASING,
            useNativeDriver: true,
          }),
        ],
        { stopTogether: true },
      );

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
    },
    [backdropOpacity, resolveHiddenOffset, stopAnimation, translateY],
  );

  const dispatch = useCallback(
    (event: ModalLayerPhaseEvent, options?: { isImmediate?: boolean }) => {
      const previousPhase = phaseRef.current;
      const nextPhase = transitionModalLayerPhase(previousPhase, event);
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
    },
    [
      animateTo,
      backdropOpacity,
      resolveHiddenOffset,
      stopAnimation,
      translateY,
    ],
  );

  const handleModalLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      measuredHeightRef.current = height > 0 ? height : null;

      if (
        !isEnterAwaitingLayoutRef.current ||
        phaseRef.current !== 'entering'
      ) {
        return;
      }

      isEnterAwaitingLayoutRef.current = false;
      translateY.setValue(resolveHiddenOffset());
      animateTo(true, () => dispatch('enterFinished'));
    },
    [animateTo, dispatch, resolveHiddenOffset, translateY],
  );

  useEffect(() => {
    if (previousVisibleRef.current === visible) {
      return;
    }

    const isInitialRender = previousVisibleRef.current === null;
    previousVisibleRef.current = visible;

    if (visible) {
      closePolicyRef.current = CLOSE_POLICY;
      // Before the content mounts, so an `autoFocus` inside it is kept.
      if (phaseRef.current === 'closed') {
        Keyboard.dismiss();
      }
      dispatch('show');
      return;
    }

    if (isInitialRender) {
      return;
    }

    Keyboard.dismiss();
    dispatch('hide');
  }, [dispatch, visible]);

  /** Set by a close request; settled once the owner has rendered it. */
  const isCloseRequestPendingRef = useRef(false);
  const [closeRequest, setCloseRequest] = useState(0);

  // The owner kept `visible` (it refused, or asked for a confirmation shown
  // on top): bring back a sheet the swipe moved. A refusal changes nothing
  // else, so a closed modal and the owner's flag can never disagree.
  useEffect(() => {
    if (!isCloseRequestPendingRef.current) {
      return;
    }
    isCloseRequestPendingRef.current = false;
    if (phaseRef.current === 'open') {
      animateTo(true, () => undefined);
    }
  }, [animateTo, closeRequest]);

  /** X, backdrop, swipe, Back, `ref.close()`: ask the owner to close. */
  const handleClose = useCallback(() => {
    Keyboard.dismiss();
    // One request per owner render: a double tap in one frame asks once.
    if (
      !isModalLayerPhaseActive(phaseRef.current) ||
      isCloseRequestPendingRef.current
    ) {
      return;
    }

    isCloseRequestPendingRef.current = true;
    setCloseRequest(request => request + 1);
    latestRef.current.onClose();
  }, []);

  const dismissForTeardown = useCallback(() => {
    if (phaseRef.current === 'closed') {
      return;
    }

    closePolicyRef.current = TEARDOWN_POLICY;
    if (phaseRef.current === 'exiting') {
      stopAnimation();
      dispatch('exitFinished');
      return;
    }

    dispatch('hide', { isImmediate: true });
  }, [dispatch, stopAnimation]);

  /**
   * The content can't render: ask the owner to close and hide anyway.
   * `onDismissed` still follows, so nothing stays held for a modal that is
   * no longer on screen.
   */
  const forceClose = useCallback(() => {
    if (!isModalLayerPhaseActive(phaseRef.current)) {
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

  const getPhase = useCallback(() => phaseRef.current, []);
  /** Bumped on reattach: a detached leave that ends after it is stale. */
  const detachGenerationRef = useRef(0);

  // The owner left while the modal was on screen (unmounted, or its screen
  // was frozen). Animate the layer out without touching the phase: a frozen
  // owner comes back through `reattach` in the phase it had.
  const animateDetachedExit = useCallback(
    (onLayerRemoved: () => void) => {
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

      const { transitionDurationMs: duration } = latestRef.current;
      Animated.parallel(
        [
          Animated.timing(backdropOpacity, {
            toValue: 0,
            duration,
            easing: MODAL_TRANSITION_EASING,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: resolveHiddenOffset(),
            duration,
            easing: MODAL_TRANSITION_EASING,
            useNativeDriver: true,
          }),
        ],
        { stopTogether: true },
      ).start(({ finished }) => {
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
    },
    [backdropOpacity, dispatch, resolveHiddenOffset, stopAnimation, translateY],
  );

  // The layer is back in the host (first mount, or a frozen screen shown
  // again): bring the sheet to where its phase says it is.
  const reattach = useCallback(() => {
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

  useEffect(() => stopAnimation, [stopAnimation]);

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
    translateY,
  };
};
