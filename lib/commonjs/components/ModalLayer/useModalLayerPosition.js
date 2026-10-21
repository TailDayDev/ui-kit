"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModalLayerPosition = void 0;
var _react = require("react");
var _modalLayerStore = require("./modalLayerStore.js");
const CLOSED_SNAPSHOT = '-1|0';
const subscribeNothing = () => () => undefined;
const getClosedSnapshot = () => CLOSED_SNAPSHOT;

/**
 * Position of a layer in the stack; re-renders only when it changes. A modal
 * whose layer is not mounted (`isMounted` false) does not subscribe, so the
 * many closed modals on a screen are not woken by every stack change.
 */
const useModalLayerPosition = (id, isMounted = true) => {
  const getSnapshot = (0, _react.useCallback)(() => {
    const {
      index,
      isTop
    } = (0, _modalLayerStore.resolveModalLayerPosition)((0, _modalLayerStore.getModalLayers)(), id);
    return `${index}|${isTop ? 1 : 0}`;
  }, [id]);
  const snapshot = (0, _react.useSyncExternalStore)(isMounted ? _modalLayerStore.subscribeModalLayers : subscribeNothing, isMounted ? getSnapshot : getClosedSnapshot, isMounted ? getSnapshot : getClosedSnapshot);
  return (0, _react.useMemo)(() => {
    const [index, isTop] = snapshot.split('|');
    return {
      index: Number(index),
      isTop: isTop === '1'
    };
  }, [snapshot]);
};
exports.useModalLayerPosition = useModalLayerPosition;
//# sourceMappingURL=useModalLayerPosition.js.map