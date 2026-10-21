"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModalSequence = void 0;
var _react = require("react");
/**
 * Shows one modal of a multi-step flow at a time: when the target step
 * switches to another modal, the current one dismisses first and the next one
 * is presented only after its `onDismissed`, so the steps never overlap.
 *
 * `onSequenceEnd` fires once the last modal has dismissed with no target left,
 * so the owner can unmount the whole flow.
 */
const useModalSequence = (targetKey, onSequenceEnd) => {
  const [activeKey, setActiveKey] = (0, _react.useState)(targetKey);
  const targetKeyRef = (0, _react.useRef)(targetKey);
  targetKeyRef.current = targetKey;
  const onSequenceEndRef = (0, _react.useRef)(onSequenceEnd);
  onSequenceEndRef.current = onSequenceEnd;

  // Nothing is on screen, so the first modal can be presented right away.
  if (activeKey === null && targetKey !== null) {
    setActiveKey(targetKey);
  }
  const onDismissed = (0, _react.useCallback)(() => {
    const nextKey = targetKeyRef.current;
    setActiveKey(nextKey);
    if (nextKey === null) {
      onSequenceEndRef.current?.();
    }
  }, []);
  const resolvedActiveKey = activeKey ?? targetKey;
  return {
    activeKey: resolvedActiveKey,
    visible: resolvedActiveKey !== null && resolvedActiveKey === targetKey,
    onDismissed
  };
};
exports.useModalSequence = useModalSequence;
//# sourceMappingURL=useModalSequence.js.map