"use strict";

import { useContext, useEffect, useRef } from 'react';
import { setModalLayerBackHandler } from "../../ModalLayer/index.js";
import { CustomModalEnvironmentContext } from "../CustomModalProvider.js";
/**
 * Tells the app about a rendered modal through CustomModalProvider (registry,
 * dev stack) and gives the layer store its Back handler (the host gives Back
 * to the top layer only, whatever order screens subscribed in; a locked
 * modal takes and ignores it).
 */
export const useModalRegistration = ({
  instanceId,
  modalKey,
  isRendered,
  onBackPress,
  handleRef
}) => {
  const {
    onModalRendered
  } = useContext(CustomModalEnvironmentContext);
  const onModalRenderedRef = useRef(onModalRendered);
  onModalRenderedRef.current = onModalRendered;
  useEffect(() => {
    if (!isRendered) {
      return undefined;
    }
    const cleanup = onModalRenderedRef.current?.({
      instanceId,
      modalKey,
      handleRef
    });
    return cleanup ?? undefined;
  }, [handleRef, instanceId, isRendered, modalKey]);
  useEffect(() => {
    if (!isRendered) {
      return undefined;
    }
    setModalLayerBackHandler(instanceId, onBackPress);
    return () => {
      setModalLayerBackHandler(instanceId, null);
    };
  }, [instanceId, isRendered, onBackPress]);
};

/** Reports presentation state changes of a modal that is or was shown. */
export const useModalPresentationTelemetry = ({
  modalKey,
  isVisible,
  isRendered,
  isTopModal,
  isClosing,
  canInteract,
  isLocked,
  pageHost
}) => {
  const {
    onPresentationStateChange
  } = useContext(CustomModalEnvironmentContext);
  const onChangeRef = useRef(onPresentationStateChange);
  onChangeRef.current = onPresentationStateChange;
  useEffect(() => {
    if (!isRendered && !isVisible) {
      return;
    }
    onChangeRef.current?.({
      modalKey,
      isVisible,
      isRendered,
      isTopModal,
      isClosing,
      canInteract,
      isLocked,
      pageHost
    });
  }, [canInteract, isClosing, isLocked, isRendered, isTopModal, isVisible, modalKey, pageHost]);
};
//# sourceMappingURL=useModalRegistration.js.map