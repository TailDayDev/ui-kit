import { StyleSheet } from 'react-native';
import { screen } from '@testing-library/react-native';

type HostView = ReturnType<typeof screen.container.queryAll>[number];

/**
 * Host views with a testID, hidden ones included (layers below the top one
 * and the covered background are hidden from accessibility).
 */
export const findHostViews = (testID: string): HostView[] =>
  screen.container.queryAll(node => node.props.testID === testID);

/** The single host view with this testID. */
export const getHostView = (testID: string): HostView => {
  const [view, ...rest] = findHostViews(testID);
  if (!view || rest.length > 0) {
    throw new Error(
      `Expected one view with testID "${testID}", found ${rest.length + (view ? 1 : 0)}`,
    );
  }
  return view;
};

/** Host views of one native type (e.g. 'RCTScrollView'). */
export const findHostViewsByType = (type: string): HostView[] =>
  screen.container.queryAll(node => node.type === type);

export const flattenStyle = (view: HostView) =>
  StyleSheet.flatten(view.props.style) ?? {};
