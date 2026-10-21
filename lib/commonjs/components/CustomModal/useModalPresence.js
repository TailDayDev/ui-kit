"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModalPresence = void 0;
var _react = require("react");
const isPresentValue = value => value !== null && value !== undefined && value !== false;

/**
 * Mounts a modal while it is open and keeps it mounted until it has fully
 * dismissed, so each opening starts with fresh state, the close animation
 * plays, `onDismissed` fires and the content keeps its last value while the
 * sheet leaves. The way to mount a modal conditionally:
 *
 * const presence = useModalPresence(selectedItem);
 * {presence.isMounted && (
 *   <CustomModal visible={presence.visible} onDismissed={presence.onDismissed}>
 *     <Content item={presence.value} />
 *   </CustomModal>
 * )}
 */
const useModalPresence = openValue => {
  const isOpen = isPresentValue(openValue);
  const isOpenRef = (0, _react.useRef)(isOpen);
  isOpenRef.current = isOpen;
  const lastValueRef = (0, _react.useRef)(isOpen ? openValue : null);
  if (isOpen) {
    lastValueRef.current = openValue;
  }
  const [isRetained, setIsRetained] = (0, _react.useState)(isOpen);
  (0, _react.useEffect)(() => {
    if (isOpen) {
      setIsRetained(true);
    }
  }, [isOpen]);
  const onDismissed = (0, _react.useCallback)(() => {
    // A reopen during the close animation keeps the modal mounted.
    if (isOpenRef.current) {
      return;
    }
    lastValueRef.current = null;
    setIsRetained(false);
  }, []);
  return {
    isMounted: isOpen || isRetained,
    visible: isOpen,
    value: isOpen ? openValue : lastValueRef.current,
    onDismissed
  };
};
exports.useModalPresence = useModalPresence;
//# sourceMappingURL=useModalPresence.js.map