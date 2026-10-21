import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { TodayTaskFooter } from './TodayTaskFooter';

const BASE = {
  menuAccessibilityLabel: 'Ещё действия',
  testID: 'footer',
};
const footerStyle = () =>
  StyleSheet.flatten(screen.getByTestId('footer').props.style);

describe('TodayTaskFooter', () => {
  it('renders the slider variant with the Figma padding 8/16/16/16', async () => {
    await render(
      <TodayTaskFooter
        {...BASE}
        onMenuPress={jest.fn()}
        sliderProps={{ completedLabel: 'Готово!', onComplete: jest.fn() }}
      />,
    );
    expect(footerStyle()).toMatchObject({
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingTop: 8,
      paddingBottom: 16,
      paddingHorizontal: 16,
    });
    expect(screen.getByRole('adjustable', { name: 'Готово!' })).toBeTruthy();
    expect(
      StyleSheet.flatten(
        screen.getByRole('button', { name: 'Ещё действия' }).props.style,
      ),
    ).toMatchObject({ width: 48, height: 48, borderRadius: 8 });
  });

  it('renders the door variant: gap 16, door fills the row and is pressable', async () => {
    const onPress = jest.fn();
    await render(
      <TodayTaskFooter
        {...BASE}
        onMenuPress={jest.fn()}
        action="door"
        doorProps={{ label: 'Заселить', onPress }}
      />,
    );
    expect(footerStyle()).toMatchObject({
      gap: 16,
      justifyContent: 'flex-start',
    });
    const door = screen.getByRole('button', { name: 'Заселить' });
    expect(StyleSheet.flatten(door.props.style).flex).toBe(1);
    await fireEvent.press(door);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders the skipped variant', async () => {
    await render(
      <TodayTaskFooter
        {...BASE}
        onMenuPress={jest.fn()}
        action="skipped"
        skippedProps={{ label: 'Пропущено' }}
      />,
    );
    expect(screen.getByText('Пропущено')).toBeTruthy();
    expect(screen.queryByRole('adjustable')).toBeNull();
  });

  it('calls onMenuPress and blocks it when the menu is disabled', async () => {
    const onMenuPress = jest.fn();
    const sliderProps = { completedLabel: 'Готово!', onComplete: jest.fn() };
    await render(
      <TodayTaskFooter
        {...BASE}
        onMenuPress={onMenuPress}
        sliderProps={sliderProps}
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Ещё действия' }));
    expect(onMenuPress).toHaveBeenCalledTimes(1);

    await render(
      <TodayTaskFooter
        {...BASE}
        onMenuPress={onMenuPress}
        sliderProps={sliderProps}
        isMenuDisabled
      />,
    );
    const menu = screen.getByRole('button', { name: 'Ещё действия' });
    expect(menu).toBeDisabled();
    await fireEvent.press(menu);
    expect(onMenuPress).toHaveBeenCalledTimes(1);
  });
});
