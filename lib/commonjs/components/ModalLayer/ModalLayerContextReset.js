"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalLayerContextReset = void 0;
var _ScrollViewContext = _interopRequireDefault(require("react-native/Libraries/Components/ScrollView/ScrollViewContext"));
var _VirtualizedListContext = require("react-native/Libraries/Lists/VirtualizedListContext");
var _TextAncestor = _interopRequireDefault(require("react-native/Libraries/Text/TextAncestor"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Resets the contexts that describe the declaration site's own layout —
 * being inside a list, a scroll view or a <Text> — exactly as RN's <Modal>
 * does for its content. The web build has its own file without them.
 */
const ModalLayerContextReset = ({
  children
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_VirtualizedListContext.VirtualizedListContextResetter, {
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ScrollViewContext.default.Provider, {
    value: null,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextAncestor.default.Provider, {
      value: false,
      children: children
    })
  })
});
exports.ModalLayerContextReset = ModalLayerContextReset;
//# sourceMappingURL=ModalLayerContextReset.js.map