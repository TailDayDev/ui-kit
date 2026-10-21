// Shared test setup. Component-specific mocks live next to the tests that need them.
import type ReactModule from 'react';
import type * as ReactNativeModule from 'react-native';

// react-native-svg ships native components that Jest cannot render. Replace every
// export with a plain View that keeps its props, so icon colors stay assertable.
jest.mock('react-native-svg', () => {
  const React = jest.requireActual<typeof ReactModule>('react');
  const { View } = jest.requireActual<typeof ReactNativeModule>('react-native');
  const actual = jest.requireActual<Record<string, unknown>>(
    'react-native-svg/lib/commonjs/lib/extract/types',
  );
  const createMock = (name: string) => {
    const MockSvgElement = (props: Record<string, unknown>) =>
      React.createElement(View, { ...props, testID: props.testID as string });
    MockSvgElement.displayName = name;
    return MockSvgElement;
  };
  const elements = [
    'Svg',
    'Circle',
    'ClipPath',
    'Defs',
    'Ellipse',
    'G',
    'Image',
    'Line',
    'LinearGradient',
    'Mask',
    'Path',
    'Pattern',
    'Polygon',
    'Polyline',
    'RadialGradient',
    'Rect',
    'Stop',
    'Symbol',
    'Text',
    'TextPath',
    'TSpan',
    'Use',
    'ForeignObject',
  ];
  const mocks: Record<string, unknown> = { __esModule: true };
  for (const name of elements) mocks[name] = createMock(name);
  mocks.default = mocks.Svg;
  return { ...actual, ...mocks };
});
