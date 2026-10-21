import { createContext, useContext } from 'react';

import type {
  StickyTabsBarContextValue,
  StickyTabsContextValue,
} from './StickyTabs.types';

const StickyTabsContext = createContext<StickyTabsContextValue | null>(null);
const StickyTabsBarContext = createContext<StickyTabsBarContextValue | null>(
  null,
);

export const StickyTabsProvider = StickyTabsContext.Provider;
export const StickyTabsBarProvider = StickyTabsBarContext.Provider;

export const useStickyTabsContext = (): StickyTabsContextValue => {
  const context = useContext(StickyTabsContext);

  if (!context) {
    throw new Error(
      'StickyTabs subcomponents must be rendered inside <StickyTabs>.',
    );
  }

  return context;
};

export const useStickyTabsBarContext = (): StickyTabsBarContextValue => {
  const context = useContext(StickyTabsBarContext);

  if (!context) {
    throw new Error(
      'StickyTabs subcomponents must be rendered inside <StickyTabs>.',
    );
  }

  return context;
};
