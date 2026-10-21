// Internal React Native contexts that RN's own <Modal> resets for its
// content. ModalLayerContextReset does the same for content the host renders
// away from its declaration site. React Native ships no types for them.
declare module 'react-native/Libraries/Lists/VirtualizedListContext' {
  import type { ComponentType, ReactNode } from 'react';

  export const VirtualizedListContextResetter: ComponentType<{
    children: ReactNode;
  }>;
}

declare module 'react-native/Libraries/Components/ScrollView/ScrollViewContext' {
  import type { Context } from 'react';

  const ScrollViewContext: Context<{ horizontal: boolean } | null>;
  export default ScrollViewContext;
}

declare module 'react-native/Libraries/Text/TextAncestor' {
  import type { Context } from 'react';

  const TextAncestorContext: Context<boolean>;
  export default TextAncestorContext;
}
