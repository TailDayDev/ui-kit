"use strict";

import { Platform } from 'react-native';
import { AndroidWheelCore } from "./AndroidWheelCore.js";
import { IosWheelCore } from "./IosWheelCore.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * The JS wheel on Android (and on iOS with a selection band); the native
 * wheel on iOS otherwise.
 */
export const PlatformWheel = props => {
  if (Platform.OS === 'android' || props.selectionIndicatorStyle) {
    return /*#__PURE__*/_jsx(AndroidWheelCore, {
      ...props
    });
  }
  return /*#__PURE__*/_jsx(IosWheelCore, {
    ...props
  });
};
//# sourceMappingURL=PlatformWheel.js.map