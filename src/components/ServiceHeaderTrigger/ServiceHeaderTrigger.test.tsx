import { StyleSheet, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ServiceHeaderTrigger } from './ServiceHeaderTrigger';

describe('ServiceHeaderTrigger', () => {
  it('renders the title in title/bold and the badge', async () => {
    await render(
      <ServiceHeaderTrigger
        titleSelected="Hotel"
        notifications="3"
        testID="trigger"
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByText('Hotel').props.style),
    ).toMatchObject({
      ...lightTheme.typography.title.bold,
      color: lightTheme.colors.text.primary,
    });
    expect(
      StyleSheet.flatten(screen.getByTestId('trigger.badge').props.style),
    ).toMatchObject({ backgroundColor: lightTheme.colors.bg.accent });
    expect(StyleSheet.flatten(screen.getByText('3').props.style).color).toBe(
      lightTheme.colors.text.inverse,
    );
  });

  it('hides the badge with hasNotificationsBadge=false or no count', async () => {
    const { rerender } = await render(
      <ServiceHeaderTrigger
        titleSelected="Hotel"
        notifications="3"
        hasNotificationsBadge={false}
        testID="trigger"
      />,
    );
    expect(screen.queryByTestId('trigger.badge')).toBeNull();
    await rerender(
      <ServiceHeaderTrigger titleSelected="Hotel" testID="trigger" />,
    );
    expect(screen.queryByTestId('trigger.badge')).toBeNull();
  });

  it('is a button labelled with the title and calls onPress', async () => {
    const onPress = jest.fn();
    await render(
      <ServiceHeaderTrigger titleSelected="Hotel" onPress={onPress} />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Hotel' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is not a button without onPress', async () => {
    await render(<ServiceHeaderTrigger titleSelected="Hotel" />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders the image slot', async () => {
    await render(
      <ServiceHeaderTrigger
        titleSelected="Hotel"
        image={<View testID="photo" />}
      />,
    );
    expect(screen.getByTestId('photo')).toBeTruthy();
  });
});
