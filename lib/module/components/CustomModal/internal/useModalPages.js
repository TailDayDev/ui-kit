"use strict";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { isModalLayerPhaseActive } from "../../ModalLayer/index.js";
const PAGE_SLIDE_DURATION = 260;
const PAGE_SLIDE_EASING = Easing.out(Easing.cubic);
/**
 * Pages of a multi-page modal: the active index, the row offset that slides
 * it into view and the title fade on every page change. Every new opening
 * starts on `defaultScreenIndex`; a reopen while leaving keeps the page.
 */
export const useModalPages = ({
  phase,
  defaultScreenIndex,
  pageWidth
}) => {
  const [screenIndex, setScreenIndex] = useState(defaultScreenIndex);
  const slideAnim = useRef(new Animated.Value(-defaultScreenIndex * pageWidth)).current;
  const titleOpacity = useRef(new Animated.Value(1)).current;
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const previousPhaseRef = useRef(phase);

  // Before paint, so a new opening never shows the page of the last one.
  // Any way out of `closed` is a new opening: with reduced motion `entering`
  // and `open` land in one render, so `closed → open` is all this sees.
  useLayoutEffect(() => {
    const previousPhase = previousPhaseRef.current;
    previousPhaseRef.current = phase;
    if (previousPhase !== 'closed' || !isModalLayerPhaseActive(phase)) {
      return;
    }
    setScreenIndex(defaultScreenIndex);
    slideAnim.setValue(-defaultScreenIndex * pageWidth);
  }, [defaultScreenIndex, pageWidth, phase, slideAnim]);
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: -screenIndex * pageWidth,
      duration: PAGE_SLIDE_DURATION,
      easing: PAGE_SLIDE_EASING,
      useNativeDriver: true
    }).start();
  }, [pageWidth, screenIndex, slideAnim]);
  useEffect(() => {
    titleOpacity.setValue(0);
    Animated.timing(titleOpacity, {
      toValue: 1,
      duration: PAGE_SLIDE_DURATION,
      easing: PAGE_SLIDE_EASING,
      useNativeDriver: true
    }).start();
  }, [screenIndex, titleOpacity]);

  /** `ref.slideTo(index)`: ignored unless the modal is entering or open. */
  const slideTo = useCallback(index => {
    if (isModalLayerPhaseActive(phaseRef.current)) {
      setScreenIndex(index);
    }
  }, []);
  return {
    screenIndex,
    slideAnim,
    slideTo,
    titleOpacity
  };
};
//# sourceMappingURL=useModalPages.js.map