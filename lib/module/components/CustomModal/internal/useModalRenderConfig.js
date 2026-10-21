"use strict";

import { useEffect, useRef } from 'react';

/**
 * What the sheet renders: the live props while `visible`, and the props of the
 * last committed visible render while it animates out, so a leaving sheet
 * keeps its title, content and footer even if the owner clears them on close.
 */
export const useModalRenderConfig = (isVisible, liveConfig) => {
  const committedConfigRef = useRef(liveConfig);

  // After commit: a render React throws away must not become the frozen one.
  useEffect(() => {
    if (isVisible) {
      committedConfigRef.current = liveConfig;
    }
  });
  return isVisible ? liveConfig : committedConfigRef.current;
};
//# sourceMappingURL=useModalRenderConfig.js.map