"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModalRegistration = exports.useModalPresentationTelemetry = void 0;
var _react = require("react");
var _index = require("../../ModalLayer/index.js");
var _CustomModalProvider = require("../CustomModalProvider.js");
/**
 * Tells the app about a rendered modal through CustomModalProvider (registry,
 * dev stack) and gives the layer store its Back handler (the host gives Back
 * to the top layer only, whatever order screens subscribed in; a locked
 * modal takes and ignores it).
 */
const useModalRegistration = ({
  instanceId,
  modalKey,
  isRendered,
  onBackPress,
  handleRef
}) => {
  const {
    onModalRendered
  } = (0, _react.useContext)(_CustomModalProvider.CustomModalEnvironmentContext);
  const onModalRenderedRef = (0, _react.useRef)(onModalRendered);
  onModalRenderedRef.current = onModalRendered;
  (0, _react.useEffect)(() => {
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
  (0, _react.useEffect)(() => {
    if (!isRendered) {
      return undefined;
    }
    (0, _index.setModalLayerBackHandler)(instanceId, onBackPress);
    return () => {
      (0, _index.setModalLayerBackHandler)(instanceId, null);
    };
  }, [instanceId, isRendered, onBackPress]);
};

/** Reports presentation state changes of a modal that is or was shown. */
exports.useModalRegistration = useModalRegistration;
const useModalPresentationTelemetry = ({
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
  } = (0, _react.useContext)(_CustomModalProvider.CustomModalEnvironmentContext);
  const onChangeRef = (0, _react.useRef)(onPresentationStateChange);
  onChangeRef.current = onPresentationStateChange;
  (0, _react.useEffect)(() => {
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
exports.useModalPresentationTelemetry = useModalPresentationTelemetry;
//# sourceMappingURL=useModalRegistration.js.map