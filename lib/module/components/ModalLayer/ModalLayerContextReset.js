"use strict";

import ScrollViewContext from 'react-native/Libraries/Components/ScrollView/ScrollViewContext';
import { VirtualizedListContextResetter } from 'react-native/Libraries/Lists/VirtualizedListContext';
import TextAncestorContext from 'react-native/Libraries/Text/TextAncestor';

/**
 * Resets the contexts that describe the declaration site's own layout —
 * being inside a list, a scroll view or a <Text> — exactly as RN's <Modal>
 * does for its content. The web build has its own file without them.
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const ModalLayerContextReset = ({
  children
}) => /*#__PURE__*/_jsx(VirtualizedListContextResetter, {
  children: /*#__PURE__*/_jsx(ScrollViewContext.Provider, {
    value: null,
    children: /*#__PURE__*/_jsx(TextAncestorContext.Provider, {
      value: false,
      children: children
    })
  })
});
//# sourceMappingURL=ModalLayerContextReset.js.map