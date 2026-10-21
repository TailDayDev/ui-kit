import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodayManualPetPickerContent } from './TodayManualPetPickerContent';

const PETS = [
  { id: 'rocky', name: 'Rocky', meta: 'Jack Russell', testID: 'pet.rocky' },
  { id: 'bella', name: 'Bella', placements: [{ title: 'Kennel' }] },
];

const styleOf = (testID: string) =>
  StyleSheet.flatten(
    screen.getByTestId(testID, { includeHiddenElements: true }).props.style,
  );

describe('TodayManualPetPickerContent', () => {
  it('renders the Figma layout: paddings 8/24/24/24, "no pet" row and pet rows', async () => {
    await render(
      <TodayManualPetPickerContent
        testID="content"
        noneTestID="none"
        pets={PETS}
        selectedId="rocky"
        onSelect={jest.fn()}
        noneLabel="No pet"
        accessibilityLabel="Choose pet"
      />,
    );
    expect(styleOf('content')).toMatchObject({
      paddingTop: 8,
      paddingHorizontal: 24,
      paddingBottom: 24,
    });
    expect(styleOf('none')).toMatchObject({
      height: 88,
      borderRadius: 16,
      borderColor: lightTheme.colors.border.default,
    });
    expect(
      StyleSheet.flatten(screen.getByText('No pet').props.style),
    ).toMatchObject(lightTheme.typography.headline.medium);
    expect(screen.getByLabelText('Choose pet').props.accessibilityRole).toBe(
      'radiogroup',
    );
    expect(
      screen.getByRole('radio', { name: 'Rocky', checked: true }),
    ).toBeTruthy();
    expect(
      screen.getByRole('radio', { name: 'Bella', checked: false }),
    ).toBeTruthy();
    expect(
      screen.getByRole('radio', { name: 'No pet', checked: false }),
    ).toBeTruthy();
    expect(screen.getByText('Kennel')).toBeTruthy();
  });

  it('selects the "no pet" row when selectedId is null', async () => {
    await render(
      <TodayManualPetPickerContent
        noneTestID="none"
        pets={PETS}
        selectedId={null}
        onSelect={jest.fn()}
        noneLabel="No pet"
      />,
    );
    expect(
      screen.getByRole('radio', { name: 'No pet', checked: true }),
    ).toBeTruthy();
    expect(styleOf('none')).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accentSoft,
      borderColor: lightTheme.colors.bg.accent,
    });
    expect(styleOf('none.radio.dot')).toMatchObject({ width: 10, height: 10 });
  });

  it('reports the tapped pet id, or null for "no pet"', async () => {
    const onSelect = jest.fn();
    await render(
      <TodayManualPetPickerContent
        pets={PETS}
        selectedId="rocky"
        onSelect={onSelect}
        noneLabel="No pet"
      />,
    );
    await fireEvent.press(screen.getByRole('radio', { name: 'Bella' }));
    expect(onSelect).toHaveBeenLastCalledWith('bella');
    await fireEvent.press(screen.getByRole('radio', { name: 'No pet' }));
    expect(onSelect).toHaveBeenLastCalledWith(null);
    expect(onSelect).toHaveBeenCalledTimes(2);
  });
});
