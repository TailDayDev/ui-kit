import { StyleSheet, Text as RNText } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { StatusBadge } from './StatusBadge';

const badgeStyle = () =>
  StyleSheet.flatten(screen.getByTestId('badge').props.style);
const textColor = (text: string) =>
  StyleSheet.flatten(screen.getByText(text).props.style).color;

describe('StatusBadge', () => {
  it.each([
    [
      'success',
      lightTheme.colors.bg.successSoft,
      lightTheme.colors.text.success,
    ],
    ['danger', lightTheme.colors.bg.errorSoft, lightTheme.colors.text.error],
    [
      'warning',
      lightTheme.palette.warningLight,
      lightTheme.colors.text.primary,
    ],
    ['neutral', lightTheme.colors.bg.subtle, lightTheme.colors.text.secondary],
  ] as const)('paints the %s tone', async (tone, background, color) => {
    await render(<StatusBadge testID="badge" label="Status" tone={tone} />);
    expect(badgeStyle().backgroundColor).toBe(background);
    expect(textColor('Status')).toBe(color);
    expect(
      StyleSheet.flatten(screen.getByText('Status').props.style),
    ).toMatchObject(lightTheme.typography.caption.regular);
  });

  it('draws an inline pill by default', async () => {
    await render(<StatusBadge testID="badge" label="Given" tone="success" />);
    expect(badgeStyle()).toMatchObject({
      alignSelf: 'flex-start',
      borderRadius: lightTheme.radius.lg,
      height: 20,
      gap: 4,
      paddingHorizontal: 8,
    });
  });

  it('puts the success icon left and alert icons right', async () => {
    await render(<StatusBadge testID="badge" label="Given" tone="success" />);
    const order = () =>
      screen
        .getByTestId('badge')
        .children.map(child =>
          typeof child === 'string' || child.type === 'Text' ? 'text' : 'icon',
        );
    expect(order()).toEqual(['icon', 'text']);

    await render(<StatusBadge testID="badge" label="Overdue" tone="danger" />);
    expect(order()).toEqual(['text', 'icon']);

    await render(
      <StatusBadge
        testID="badge"
        label="Overdue"
        tone="danger"
        iconPosition="left"
      />,
    );
    expect(order()).toEqual(['icon', 'text']);
  });

  it('shows only the icon with the label for screen readers in iconOnly', async () => {
    await render(
      <StatusBadge
        testID="badge"
        label="Overdue"
        tone="danger"
        layout="iconOnly"
      />,
    );
    expect(screen.queryByText('Overdue')).toBeNull();
    expect(screen.getByLabelText('Overdue')).toBeTruthy();
    expect(badgeStyle()).toMatchObject({
      width: 20,
      height: 20,
      borderRadius: 10,
    });
  });

  it('stretches in fullWidth', async () => {
    await render(
      <StatusBadge
        testID="badge"
        label="Done"
        tone="success"
        layout="fullWidth"
      />,
    );
    expect(badgeStyle()).toMatchObject({
      alignSelf: 'stretch',
      justifyContent: 'center',
      borderRadius: 10,
    });
  });

  it('keeps the legacy color props', async () => {
    await render(
      <StatusBadge
        testID="badge"
        label="Legacy"
        backgroundColor={lightTheme.palette.manualBadgeBackground}
        textColor={lightTheme.palette.manualBadgeForeground}
        icon={<RNText>i</RNText>}
      />,
    );
    expect(badgeStyle().backgroundColor).toBe(
      lightTheme.palette.manualBadgeBackground,
    );
    expect(textColor('Legacy')).toBe(lightTheme.palette.manualBadgeForeground);
    expect(screen.getByText('i')).toBeTruthy();
  });
});
