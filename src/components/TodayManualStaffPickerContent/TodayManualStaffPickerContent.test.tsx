import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodayManualStaffPickerContent } from './TodayManualStaffPickerContent';

const STAFF = [
  {
    id: 'jane',
    name: 'Jane Cooper',
    position: 'Manager',
    testID: 'staff.jane',
  },
  { id: 'robert', name: 'Robert Fox', position: 'Groomer' },
];

const styleOf = (testID: string) =>
  StyleSheet.flatten(
    screen.getByTestId(testID, { includeHiddenElements: true }).props.style,
  );

describe('TodayManualStaffPickerContent', () => {
  it('renders the Figma default: paddings 8/24/24/24, "no staff" selected, staff rows', async () => {
    await render(
      <TodayManualStaffPickerContent
        testID="content"
        noneTestID="none"
        staff={STAFF}
        selectedId={null}
        onSelect={jest.fn()}
        noneLabel="No staff"
        accessibilityLabel="Choose staff"
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
      backgroundColor: lightTheme.colors.bg.accentSoft,
      borderColor: lightTheme.colors.bg.accent,
    });
    expect(screen.getByLabelText('Choose staff').props.accessibilityRole).toBe(
      'radiogroup',
    );
    expect(
      screen.getByRole('radio', { name: 'No staff', checked: true }),
    ).toBeTruthy();
    expect(
      screen.getByRole('radio', { name: 'Jane Cooper', checked: false }),
    ).toBeTruthy();
    expect(screen.getByText('Groomer')).toBeTruthy();
    expect(screen.getByText('JC')).toBeTruthy();
  });

  it('marks the selected staff member', async () => {
    await render(
      <TodayManualStaffPickerContent
        noneTestID="none"
        staff={STAFF}
        selectedId="jane"
        onSelect={jest.fn()}
        noneLabel="No staff"
      />,
    );
    expect(
      screen.getByRole('radio', { name: 'Jane Cooper', checked: true }),
    ).toBeTruthy();
    expect(
      screen.getByRole('radio', { name: 'No staff', checked: false }),
    ).toBeTruthy();
    expect(styleOf('none')).toMatchObject({
      backgroundColor: lightTheme.colors.bg.surface,
      borderColor: lightTheme.colors.border.default,
    });
  });

  it('reports the tapped staff id, or null for "no staff"', async () => {
    const onSelect = jest.fn();
    await render(
      <TodayManualStaffPickerContent
        staff={STAFF}
        selectedId="jane"
        onSelect={onSelect}
        noneLabel="No staff"
      />,
    );
    await fireEvent.press(screen.getByRole('radio', { name: 'Robert Fox' }));
    expect(onSelect).toHaveBeenLastCalledWith('robert');
    await fireEvent.press(screen.getByRole('radio', { name: 'No staff' }));
    expect(onSelect).toHaveBeenLastCalledWith(null);
  });
});
