"use strict";

import Svg, { Path } from 'react-native-svg';
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Funnel (copied from the app `shared/icons/FilterIcon`). Color comes from `color`.
 * The app default frame was 16×18 with a 24×24 viewBox; the kit uses `size` (24)
 * like every other icon. `FilterTrigger` renders it at 24×24, as the app does.
 */
export const FilterIcon = ({
  color,
  size = 24,
  width,
  height
}) => /*#__PURE__*/_jsx(Svg, {
  width: width ?? size,
  height: height ?? size,
  viewBox: "0 0 24 24",
  fill: "none",
  children: /*#__PURE__*/_jsx(Path, {
    d: "M15.0001 19.88C15.0401 20.18 14.9401 20.5 14.7101 20.71C14.3201 21.1 13.6901 21.1 13.3001 20.71L9.2901 16.7C9.0601 16.47 8.9601 16.16 9.0001 15.87V10.75L4.2101 4.62C3.8701 4.19 3.9501 3.56 4.3801 3.22C4.5701 3.08 4.7801 3 5.0001 3H19.0001C19.2201 3 19.4301 3.08 19.6201 3.22C20.0501 3.56 20.1301 4.19 19.7901 4.62L15.0001 10.75V19.88ZM7.0401 5L11.0001 10.06V15.58L13.0001 17.58V10.05L16.9601 5H7.0401Z",
    fill: color
  })
});
//# sourceMappingURL=FilterIcon.js.map