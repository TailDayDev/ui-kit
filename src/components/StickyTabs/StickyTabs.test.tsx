import { StyleSheet, Text, View } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { clampStickyTabIndex, getStickyTabsPanelTestID } from './constants';
import { StickyTabs } from './StickyTabs';
import type { StickyTabsProps } from './StickyTabs.types';

const renderTabs = (props: Partial<Omit<StickyTabsProps, 'children'>> = {}) =>
  render(
    <StickyTabs barMode="inline" testID="tabs" {...props}>
      <StickyTabs.Panel label="Care" testID="tabs.care">
        <Text>Care body</Text>
      </StickyTabs.Panel>
      <StickyTabs.Panel
        label="Pet"
        testID="tabs.pet"
        transitionShell={<Text>Pet shell</Text>}
      >
        <Text>Pet body</Text>
      </StickyTabs.Panel>
      <StickyTabs.Bar />
      <StickyTabs.Content />
    </StickyTabs>,
  );

const isHidden = (testID: string) =>
  StyleSheet.flatten(
    screen.getByTestId(testID, { includeHiddenElements: true }).props.style,
  ).display === 'none';

describe('StickyTabs', () => {
  it('renders the bar and only the active panel by default', async () => {
    await renderTabs();
    expect(screen.getByRole('tab', { name: 'Care' })).toBeSelected();
    expect(screen.getByText('Care body')).toBeTruthy();
    expect(screen.queryByText('Pet body')).toBeNull();
    expect(
      screen.getByTestId(getStickyTabsPanelTestID('tabs.care')),
    ).toBeTruthy();
  });

  it('switches tabs when uncontrolled and reports the change', async () => {
    const onSelectedIndexChange = jest.fn();
    const onBeforeTabChange = jest.fn();
    await renderTabs({ onSelectedIndexChange, onBeforeTabChange });

    await fireEvent.press(screen.getByRole('tab', { name: 'Pet' }));

    expect(onBeforeTabChange).toHaveBeenCalledWith(0, 1);
    expect(onSelectedIndexChange).toHaveBeenCalledWith(1);
    expect(screen.getByText('Pet body')).toBeTruthy();
    expect(screen.queryByText('Care body')).toBeNull();
  });

  it('waits for the parent in controlled mode', async () => {
    const onSelectedIndexChange = jest.fn();
    await renderTabs({ selectedIndex: 0, onSelectedIndexChange });

    await fireEvent.press(screen.getByRole('tab', { name: 'Pet' }));

    expect(onSelectedIndexChange).toHaveBeenCalledWith(1);
    expect(screen.getByText('Care body')).toBeTruthy();
  });

  it('keeps visited panels mounted and hidden in keep-mounted-hidden mode', async () => {
    await renderTabs({ contentMode: 'keep-mounted-hidden' });
    await fireEvent.press(screen.getByRole('tab', { name: 'Pet' }));

    expect(isHidden('tabs.care.panel')).toBe(true);
    expect(isHidden('tabs.pet.panel')).toBe(false);
  });

  it('shows the transition shell, then the panel after the delay in active-only mode', async () => {
    jest.useFakeTimers();
    try {
      await renderTabs({
        contentMode: 'active-only',
        contentTransitionMs: 250,
      });
      await fireEvent.press(screen.getByRole('tab', { name: 'Pet' }));

      expect(screen.getByText('Pet shell')).toBeTruthy();
      expect(screen.queryByText('Pet body')).toBeNull();

      await act(async () => {
        jest.advanceTimersByTime(250);
      });

      expect(screen.getByText('Pet body')).toBeTruthy();
      expect(screen.queryByText('Pet shell')).toBeNull();
    } finally {
      jest.useRealTimers();
    }
  });

  it('reserves the measured bar height with the spacer', async () => {
    await render(
      <StickyTabs testID="tabs" stickyBar={{ top: 12 }}>
        <StickyTabs.Panel label="Care" testID="tabs.care">
          <Text>Care body</Text>
        </StickyTabs.Panel>
        <View testID="spacer-host">
          <StickyTabs.Spacer />
        </View>
        <StickyTabs.Bar />
      </StickyTabs>,
    );
    const bar = screen.getByTestId('tabs');
    expect(StyleSheet.flatten(bar.props.style)).toMatchObject({ top: 12 });

    await fireEvent(bar, 'layout', { nativeEvent: { layout: { height: 54 } } });
    const [spacer] = screen.getByTestId('spacer-host').children;
    expect(
      spacer && typeof spacer !== 'string'
        ? StyleSheet.flatten(spacer.props.style)
        : null,
    ).toEqual({ height: 54 });
  });

  it('throws when a subcomponent is rendered outside StickyTabs', async () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    await expect(render(<StickyTabs.Spacer />)).rejects.toThrow(
      'StickyTabs subcomponents must be rendered inside <StickyTabs>.',
    );
    consoleError.mockRestore();
  });
});

describe('clampStickyTabIndex', () => {
  it('clamps into the tab range', () => {
    expect(clampStickyTabIndex(5, 2)).toBe(1);
    expect(clampStickyTabIndex(-1, 2)).toBe(0);
    expect(clampStickyTabIndex(3, 0)).toBe(0);
  });
});
