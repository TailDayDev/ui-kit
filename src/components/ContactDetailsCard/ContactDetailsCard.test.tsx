import { StyleSheet, Text as RNText } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ContactDetailsCard } from './ContactDetailsCard';

const ROWS = [
  { id: 'phone', label: 'Phone', value: '+37360112233', testID: 'phone' },
  { id: 'email', label: 'Email', value: 'owner@example.com' },
];

describe('ContactDetailsCard', () => {
  it('renders the title and the rows', async () => {
    await render(
      <ContactDetailsCard title="Owner" emptyText="No contacts" rows={ROWS} />,
    );
    expect(screen.getByText('Owner')).toBeTruthy();
    expect(screen.getByText('+37360112233')).toBeTruthy();
    expect(screen.getByText('owner@example.com')).toBeTruthy();
    expect(screen.queryByText('No contacts')).toBeNull();
  });

  it('shows the empty text in secondary body text without rows', async () => {
    await render(
      <ContactDetailsCard title="Owner" emptyText="No contacts" rows={[]} />,
    );
    expect(
      StyleSheet.flatten(screen.getByText('No contacts').props.style),
    ).toMatchObject({
      ...lightTheme.typography.body.regular,
      color: lightTheme.colors.text.secondary,
    });
  });

  it('shows only the message in message mode', async () => {
    await render(<ContactDetailsCard title="Owner" message="No access" />);
    expect(screen.getByText('No access')).toBeTruthy();
  });

  it('renders header, header divider and footer', async () => {
    await render(
      <ContactDetailsCard
        title="Owner"
        emptyText="No contacts"
        rows={ROWS}
        header={<RNText>Header</RNText>}
        hasHeaderDivider
        footer={<RNText>Footer</RNText>}
      />,
    );
    const headerBox = screen.getByText('Header').parent;
    expect(StyleSheet.flatten(headerBox?.props.style)).toMatchObject({
      gap: 12,
      marginBottom: 12,
    });
    expect(screen.getByText('Footer')).toBeTruthy();
  });

  it('calls the card onPress and not when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <ContactDetailsCard
        title="Owner"
        message="No access"
        testID="card"
        onPress={onPress}
      />,
    );
    await fireEvent.press(screen.getByTestId('card'));
    expect(onPress).toHaveBeenCalledTimes(1);

    const blocked = jest.fn();
    await render(
      <ContactDetailsCard
        title="Owner"
        message="No access"
        testID="card"
        disabled
        onPress={blocked}
      />,
    );
    await fireEvent.press(screen.getByTestId('card'));
    expect(blocked).not.toHaveBeenCalled();
  });

  it('keeps a row press away from the card press', async () => {
    const onCardPress = jest.fn();
    const onRowPress = jest.fn();
    await render(
      <ContactDetailsCard
        title="Owner"
        emptyText="No contacts"
        rows={[
          {
            ...ROWS[0],
            id: 'phone',
            label: 'Phone',
            value: '1',
            onPress: onRowPress,
          },
        ]}
        onPress={onCardPress}
      />,
    );
    await fireEvent.press(screen.getByTestId('phone'), {
      stopPropagation: jest.fn(),
    });
    expect(onRowPress).toHaveBeenCalledTimes(1);
    expect(onCardPress).not.toHaveBeenCalled();
  });
});
