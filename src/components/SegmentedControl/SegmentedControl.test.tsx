import { Animated, StyleSheet } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { SegmentedControl } from './SegmentedControl';

/** The outer control view (it owns `onLayout`). */
const getContainer = () => {
  const container = screen.root;
  if (!container) {
    throw new Error('SegmentedControl did not render');
  }
  return container;
};

const getSegmentBackgrounds = () =>
  screen
    .getAllByRole('tab')
    .map(segment => StyleSheet.flatten(segment.props.style).backgroundColor);

describe('SegmentedControl', () => {
  it('shows the selected segment before the first layout and hands over to the pill after it', async () => {
    await render(
      <SegmentedControl
        options={['Available', 'All']}
        selectedIndex={1}
        onChange={jest.fn()}
      />,
    );
    expect(getSegmentBackgrounds()).toEqual([
      undefined,
      lightTheme.colors.bg.surface,
    ]);

    await act(async () => {
      fireEvent(getContainer(), 'layout', {
        nativeEvent: { layout: { width: 208 } },
      });
    });
    expect(getSegmentBackgrounds()).toEqual([undefined, undefined]);
    expect(
      screen
        .getAllByRole('tab')
        .map(segment => StyleSheet.flatten(segment.props.style).width),
    ).toEqual([100, 100]);
  });

  it('marks the selected segment and calls onChange on press', async () => {
    const onChange = jest.fn();
    await render(
      <SegmentedControl
        options={['Care', 'Pet']}
        selectedIndex={0}
        onChange={onChange}
        testIDs={['tabs.care', 'tabs.pet']}
      />,
    );
    expect(screen.getByRole('tab', { name: 'Care' })).toBeSelected();
    expect(screen.getByRole('tab', { name: 'Pet' })).not.toBeSelected();
    expect(screen.getByTestId('tabs.pet')).toBeTruthy();

    await fireEvent.press(screen.getByRole('tab', { name: 'Pet' }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('styles the selected label with the accent bold text', async () => {
    await render(
      <SegmentedControl
        options={['Care', 'Pet']}
        selectedIndex={1}
        onChange={jest.fn()}
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByText('Pet').props.style),
    ).toMatchObject({
      ...lightTheme.typography.body.bold,
      color: lightTheme.colors.text.accent,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Care').props.style),
    ).toMatchObject({
      ...lightTheme.typography.body.medium,
      color: lightTheme.colors.text.primary,
    });
  });

  it('drives the pill from scrollX when scroll-linked', async () => {
    const scrollX = new Animated.Value(0);
    await render(
      <SegmentedControl
        options={['Care', 'Pet']}
        selectedIndex={0}
        onChange={jest.fn()}
        scrollX={scrollX}
        screenWidth={320}
      />,
    );
    await act(async () => {
      fireEvent(getContainer(), 'layout', {
        nativeEvent: { layout: { width: 208 } },
      });
    });
    await act(async () => {
      scrollX.setValue(320);
    });
    expect(screen.getAllByRole('tab')).toHaveLength(2);
  });
});
