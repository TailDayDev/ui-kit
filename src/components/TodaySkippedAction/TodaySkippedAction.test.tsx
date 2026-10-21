import { StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodaySkippedAction } from './TodaySkippedAction';

describe('TodaySkippedAction', () => {
  it('renders the Figma capsule: 180×48, full radius, pale border, soft-gray fill', async () => {
    await render(<TodaySkippedAction testID="skipped" label="Пропущено" />);
    expect(
      StyleSheet.flatten(screen.getByTestId('skipped').props.style),
    ).toMatchObject({
      width: 180,
      height: 48,
      borderRadius: lightTheme.radius.full,
      borderWidth: 1,
      borderColor: lightTheme.colors.border.default,
      backgroundColor: lightTheme.colors.bg.subtle,
      justifyContent: 'space-between',
      paddingLeft: 23,
      paddingRight: 3,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Пропущено').props.style),
    ).toMatchObject({
      ...lightTheme.typography.headline.medium,
      color: lightTheme.colors.text.primary,
    });
  });

  it('is a single non-interactive accessibility element labelled with the status', async () => {
    await render(<TodaySkippedAction label="Пропущено" />);
    expect(screen.getByLabelText('Пропущено')).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
  });
});
