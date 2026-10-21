import { StyleSheet, Text as RNText } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodayTaskDetails } from './TodayTaskDetails';

const textStyle = (value: string) =>
  StyleSheet.flatten(screen.getByText(value).props.style);

describe('TodayTaskDetails', () => {
  it('renders icon, title, trailing and note in Figma styles', async () => {
    await render(
      <TodayTaskDetails
        testID="details"
        icon={<RNText>icon</RNText>}
        title="Dry food"
        trailing="200 g"
        note="Mix with water"
      />,
    );
    expect(screen.getByText('icon')).toBeTruthy();
    expect(textStyle('Dry food')).toMatchObject({
      ...lightTheme.typography.body.bold,
      color: lightTheme.colors.text.primary,
    });
    expect(textStyle('200 g')).toMatchObject(
      lightTheme.typography.body.regular,
    );
    expect(textStyle('Mix with water')).toMatchObject({
      ...lightTheme.typography.caption.regular,
      color: lightTheme.colors.text.secondary,
    });
    expect(
      StyleSheet.flatten(screen.getByTestId('details').props.style),
    ).toMatchObject({ padding: 16, gap: 12 });
  });

  it('hides icon, trailing and note via their flags', async () => {
    await render(
      <TodayTaskDetails
        icon={<RNText>icon</RNText>}
        hasIcon={false}
        title="Walk"
        trailing="200 g"
        hasTrailing={false}
        note="Mix"
        hasNote={false}
      />,
    );
    expect(screen.getByText('Walk')).toBeTruthy();
    expect(screen.queryByText('icon')).toBeNull();
    expect(screen.queryByText('200 g')).toBeNull();
    expect(screen.queryByText('Mix')).toBeNull();
  });
});
