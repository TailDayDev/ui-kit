import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ManualTaskSheetContent } from './ManualTaskSheetContent';
import type { ManualTaskSheetContentProps } from './ManualTaskSheetContent.types';

const LABELS = {
  title: 'New task',
  titlePlaceholder: 'What to do?',
  due: 'Due',
  pet: 'Pet',
  staff: 'Staff',
};

const renderContent = async (
  props: Partial<ManualTaskSheetContentProps> = {},
) => {
  const callbacks = {
    onTitleChange: jest.fn(),
    onDuePress: jest.fn(),
    onPetPress: jest.fn(),
    onStaffPress: jest.fn(),
  };
  await render(
    <ManualTaskSheetContent
      testID="content"
      testIDs={{ title: 'title', due: 'due', pet: 'pet', staff: 'staff' }}
      title=""
      titleMaxLength={120}
      labels={LABELS}
      dueValue="No time"
      petValue="No pet"
      staffValue="No staff"
      {...callbacks}
      {...props}
    />,
  );
  return callbacks;
};

const styleOf = (testID: string) =>
  StyleSheet.flatten(
    screen.getByTestId(testID, { includeHiddenElements: true }).props.style,
  );

describe('ManualTaskSheetContent', () => {
  it('renders the Figma default: paddings, title field, counter and empty rows', async () => {
    await renderContent();
    expect(styleOf('content')).toMatchObject({
      paddingHorizontal: 24,
      gap: 24,
    });
    expect(screen.getByText('0/120')).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByText('0/120').props.style),
    ).toMatchObject({
      ...lightTheme.typography.smallCaption.medium,
      bottom: -16,
    });
    expect(
      StyleSheet.flatten(
        screen.getByText('New task', { includeHiddenElements: true }).props
          .style,
      ),
    ).toMatchObject({ color: lightTheme.colors.text.secondary });
    expect(screen.getByLabelText('New task')).toBeTruthy();
    for (const value of ['No time', 'No pet', 'No staff']) {
      expect(
        StyleSheet.flatten(screen.getByText(value).props.style).color,
      ).toBe(lightTheme.colors.text.secondary);
    }
  });

  it('shows filled values in accent', async () => {
    await renderContent({
      petValue: 'Rocky',
      isPetEmpty: false,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Rocky').props.style).color,
    ).toBe(lightTheme.colors.text.accent);
  });

  it('reports title changes and row taps', async () => {
    const callbacks = await renderContent();
    await fireEvent.changeText(screen.getByTestId('title'), 'Feed');
    expect(callbacks.onTitleChange).toHaveBeenCalledWith('Feed');
    await fireEvent.press(screen.getByTestId('due'));
    await fireEvent.press(screen.getByTestId('pet'));
    await fireEvent.press(screen.getByTestId('staff'));
    expect(callbacks.onDuePress).toHaveBeenCalledTimes(1);
    expect(callbacks.onPetPress).toHaveBeenCalledTimes(1);
    expect(callbacks.onStaffPress).toHaveBeenCalledTimes(1);
  });
});
