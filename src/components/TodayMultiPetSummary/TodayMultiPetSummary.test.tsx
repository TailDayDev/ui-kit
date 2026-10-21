import { StyleSheet, Text as RNText } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodayMultiPetSummary } from './TodayMultiPetSummary';

const pets = [
  { id: 'a', photo: <RNText>photo-a</RNText>, accessibilityLabel: 'Rex' },
  { id: 'b', photo: <RNText>photo-b</RNText>, accessibilityLabel: 'Bella' },
];
const flat = (testID: string) =>
  StyleSheet.flatten(
    screen.getByTestId(testID, { includeHiddenElements: true }).props.style,
  );

describe('TodayMultiPetSummary', () => {
  it('renders photos as 64pt circles with a 4pt white ring, overlapping by 8', async () => {
    await render(
      <TodayMultiPetSummary
        testID="multi"
        pets={pets}
        detailsLabel="Details"
      />,
    );
    expect(screen.getByRole('image', { name: 'Rex' })).toBeTruthy();
    expect(flat('multi.pet.a')).toMatchObject({
      width: 72,
      height: 72,
      margin: -4,
      borderWidth: 4,
      borderColor: lightTheme.colors.bg.surface,
    });
    expect(flat('multi.pet.a').marginLeft).toBeUndefined();
    expect(flat('multi.pet.b').marginLeft).toBe(-12);
  });

  it('shows the extra count only when given', async () => {
    await render(
      <TodayMultiPetSummary
        testID="multi"
        pets={pets}
        extraCount="+3"
        detailsLabel="Details"
      />,
    );
    expect(flat('multi.extra').backgroundColor).toBe(
      lightTheme.palette.secondary,
    );
    expect(
      StyleSheet.flatten(screen.getByText('+3').props.style),
    ).toMatchObject({
      ...lightTheme.typography.headline.medium,
      color: lightTheme.colors.text.inverse,
    });

    await render(
      <TodayMultiPetSummary
        testID="multi"
        pets={pets}
        detailsLabel="Details"
      />,
    );
    expect(screen.queryByTestId('multi.extra')).toBeNull();
  });

  it('draws the no-photo circle for a pet without a photo', async () => {
    await render(
      <TodayMultiPetSummary
        testID="multi"
        pets={[{ id: 'x' }]}
        noPhotoImage={<RNText>no-photo</RNText>}
        detailsLabel="Details"
      />,
    );
    expect(screen.getByText('no-photo')).toBeTruthy();
    expect(flat('multi.pet.x').backgroundColor).toBe(
      lightTheme.colors.bg.subtle,
    );
  });

  it('calls onDetailsPress from a single details button', async () => {
    const onDetailsPress = jest.fn();
    await render(
      <TodayMultiPetSummary
        pets={pets}
        detailsLabel="Show details"
        onDetailsPress={onDetailsPress}
      />,
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);
    await fireEvent.press(screen.getByRole('button', { name: 'Show details' }));
    expect(onDetailsPress).toHaveBeenCalledTimes(1);
  });

  it('disables the details button without a handler', async () => {
    await render(<TodayMultiPetSummary pets={pets} detailsLabel="Details" />);
    expect(screen.getByRole('button', { name: 'Details' })).toBeDisabled();
  });
});
