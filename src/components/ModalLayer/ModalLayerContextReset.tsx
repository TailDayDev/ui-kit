import type { ReactNode } from 'react';
import ScrollViewContext from 'react-native/Libraries/Components/ScrollView/ScrollViewContext';
import { VirtualizedListContextResetter } from 'react-native/Libraries/Lists/VirtualizedListContext';
import TextAncestorContext from 'react-native/Libraries/Text/TextAncestor';

/**
 * Resets the contexts that describe the declaration site's own layout —
 * being inside a list, a scroll view or a <Text> — exactly as RN's <Modal>
 * does for its content. The web build has its own file without them.
 */
export const ModalLayerContextReset = ({
  children,
}: {
  children: ReactNode;
}) => (
  <VirtualizedListContextResetter>
    <ScrollViewContext.Provider value={null}>
      <TextAncestorContext.Provider value={false}>
        {children}
      </TextAncestorContext.Provider>
    </ScrollViewContext.Provider>
  </VirtualizedListContextResetter>
);
