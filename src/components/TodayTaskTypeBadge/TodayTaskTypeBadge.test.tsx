import { StyleSheet, Text as RNText } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodayTaskTypeBadge } from './TodayTaskTypeBadge';
import type { TodayTaskActionType } from './TodayTaskTypeBadge.types';

const { colors, palette } = lightTheme;

const CASES: [TodayTaskActionType, string, string][] = [
  ['CheckIn', colors.bg.accentSoft, colors.text.accent],
  ['CheckOut', colors.bg.successSoft, colors.text.success],
  ['Feeding', palette.feedingBadgeBackground, palette.feedingBadgeForeground],
  ['Medication', palette.medicationBadgeBackground, colors.text.error],
  [
    'AdditionalService',
    palette.additionalServiceBadgeBackground,
    palette.additionalServiceBadgeForeground,
  ],
  ['Manual', palette.manualBadgeBackground, palette.manualBadgeForeground],
  [
    'Transfer',
    palette.transferBadgeBackground,
    palette.transferBadgeForeground,
  ],
];

const flatStyle = (testID: string) =>
  StyleSheet.flatten(screen.getByTestId(testID).props.style);

describe('TodayTaskTypeBadge', () => {
  it.each(CASES)(
    'renders actionType=%s in its fill and text color',
    async (actionType, background, foreground) => {
      await render(
        <TodayTaskTypeBadge
          testID="badge"
          actionType={actionType}
          label="Label"
        />,
      );
      expect(flatStyle('badge').backgroundColor).toBe(background);
      expect(
        StyleSheet.flatten(screen.getByText('Label').props.style),
      ).toMatchObject({
        ...lightTheme.typography.headline.regular,
        color: foreground,
      });
    },
  );

  it('has the Figma shape: radii 8/16/16/0 (24 clamped to half height), padding 4/16/4/12, gap 8', async () => {
    await render(<TodayTaskTypeBadge testID="badge" label="Label" />);
    expect(flatStyle('badge')).toMatchObject({
      borderTopLeftRadius: 8,
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      borderBottomLeftRadius: 0,
      paddingTop: 4,
      paddingRight: 16,
      paddingBottom: 4,
      paddingLeft: 12,
      gap: 8,
      minHeight: 32,
    });
  });

  it('renders the icon slot', async () => {
    await render(
      <TodayTaskTypeBadge label="Label" icon={<RNText>icon</RNText>} />,
    );
    expect(
      screen.getByText('icon', { includeHiddenElements: true }),
    ).toBeTruthy();
  });

  it('hides care types unless their flags are on', async () => {
    await render(
      <TodayTaskTypeBadge
        testID="badge"
        label="Check-in"
        careType="Boarding"
        secondCareType="Grooming"
      />,
    );
    expect(
      screen.queryByText('Boarding', { includeHiddenElements: true }),
    ).toBeNull();
    expect(screen.getByLabelText('Check-in')).toBeTruthy();
  });

  it('shows one and two care types in one line and reads them all', async () => {
    await render(
      <TodayTaskTypeBadge
        testID="badge"
        label="Check-in"
        hasCareType
        careType="Boarding"
        hasSecondCareType
        secondCareType="Grooming"
      />,
    );
    const first = screen.getByTestId('badge.careType1', {
      includeHiddenElements: true,
    });
    expect(first.props.numberOfLines).toBe(1);
    expect(
      screen.getByTestId('badge.careType2', { includeHiddenElements: true }),
    ).toBeTruthy();
    expect(
      screen.getByLabelText('Check-in • Boarding • Grooming'),
    ).toBeTruthy();
  });
});
