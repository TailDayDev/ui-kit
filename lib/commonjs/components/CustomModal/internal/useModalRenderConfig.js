"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModalRenderConfig = void 0;
var _react = require("react");
/**
 * What the sheet renders: the live props while `visible`, and the props of the
 * last committed visible render while it animates out, so a leaving sheet
 * keeps its title, content and footer even if the owner clears them on close.
 */
const useModalRenderConfig = (isVisible, liveConfig) => {
  const committedConfigRef = (0, _react.useRef)(liveConfig);

  // After commit: a render React throws away must not become the frozen one.
  (0, _react.useEffect)(() => {
    if (isVisible) {
      committedConfigRef.current = liveConfig;
    }
  });
  return isVisible ? liveConfig : committedConfigRef.current;
};
exports.useModalRenderConfig = useModalRenderConfig;
//# sourceMappingURL=useModalRenderConfig.js.map