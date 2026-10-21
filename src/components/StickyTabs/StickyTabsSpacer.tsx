import { View } from 'react-native';

import { useStickyTabsContext } from './StickyTabsContext';

/**
 * Reserve vertical space inside a ScrollView for the sticky overlay bar.
 */
export const StickyTabsSpacer = () => {
  const { barHeight } = useStickyTabsContext();

  return <View style={{ height: barHeight }} />;
};
