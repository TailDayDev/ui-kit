import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import {
  IconTabCalendar,
  IconTabMenu,
  IconTabService,
  IconTabToday,
} from '../../icons/figma';
import { lightTheme } from '../../theme';
import { CustomTabBar } from './CustomTabBar';
import type { CustomTabBarTab } from './CustomTabBar.types';

const TABS: CustomTabBarTab[] = [
  { key: 'today', icon: IconTabToday, accessibilityLabel: 'Today' },
  {
    key: 'calendar',
    icon: IconTabCalendar,
    accessibilityLabel: 'Calendar',
    hasBadge: true,
    testID: 'tab.calendar',
  },
  { key: 'service', icon: IconTabService, accessibilityLabel: 'Service' },
  { key: 'menu', icon: IconTabMenu, accessibilityLabel: 'Menu' },
];

describe('CustomTabBar', () => {
  it.each(['today', 'calendar', 'service', 'menu'])(
    'selects only the %s tab',
    async activeKey => {
      await render(
        <CustomTabBar
          tabs={TABS}
          activeKey={activeKey}
          onTabPress={jest.fn()}
        />,
      );
      const selected = screen
        .getAllByRole('tab')
        .filter(tab => tab.props.accessibilityState?.selected);
      expect(selected).toHaveLength(1);
      const label = TABS.find(tab => tab.key === activeKey)?.accessibilityLabel;
      expect(screen.getByRole('tab', { name: label })).toBeSelected();
    },
  );

  it('reports the pressed tab key', async () => {
    const onTabPress = jest.fn();
    const onTabPressIn = jest.fn();
    const onTabLongPress = jest.fn();
    await render(
      <CustomTabBar
        tabs={TABS}
        activeKey="today"
        onTabPress={onTabPress}
        onTabPressIn={onTabPressIn}
        onTabLongPress={onTabLongPress}
      />,
    );
    const service = screen.getByRole('tab', { name: 'Service' });
    await fireEvent.press(service);
    await fireEvent(service, 'pressIn');
    await fireEvent(service, 'longPress');
    expect(onTabPress).toHaveBeenCalledWith('service');
    expect(onTabPressIn).toHaveBeenCalledWith('service');
    expect(onTabLongPress).toHaveBeenCalledWith('service');
  });

  it('renders the tab badge', async () => {
    await render(
      <CustomTabBar tabs={TABS} activeKey="today" onTabPress={jest.fn()} />,
    );
    expect(screen.getByTestId('tab.calendar.badge')).toBeTruthy();
  });

  it('places the indicator under the active tab before layout', async () => {
    await render(
      <CustomTabBar
        tabs={TABS}
        activeKey="service"
        onTabPress={jest.fn()}
        testID="bar"
      />,
    );
    expect(
      StyleSheet.flatten(
        screen.getByTestId('bar.indicator', { includeHiddenElements: true })
          .props.style,
      ),
    ).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accentSoft,
      width: '25%',
      left: '50%',
    });
  });

  it('exposes the tabs as a tablist', async () => {
    await render(
      <CustomTabBar
        tabs={TABS}
        activeKey="today"
        onTabPress={jest.fn()}
        testID="bar"
      />,
    );
    // The container stays non-accessible so iOS does not merge the tabs.
    expect(screen.getByTestId('bar.tabs').props.accessibilityRole).toBe(
      'tablist',
    );
  });
});
