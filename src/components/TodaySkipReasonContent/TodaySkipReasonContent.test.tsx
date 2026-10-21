import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodaySkipReasonContent } from './TodaySkipReasonContent';
import type { TodaySkipReason } from './TodaySkipReasonContent.types';

const makeReasons = (count: number): TodaySkipReason[] =>
  Array.from({ length: count }, (_, index) => ({
    key: index === count - 1 ? 'other' : `reason${index + 1}`,
    label: index === count - 1 ? 'Other' : `Reason ${index + 1}`,
  }));

const baseProps = {
  title: 'Choose a reason',
  subtitle: 'The owner will see it',
  onSelectReason: jest.fn(),
};

describe('TodaySkipReasonContent', () => {
  it.each([5, 6, 3])('renders rows=%i reasons as radios', async count => {
    await render(
      <TodaySkipReasonContent {...baseProps} reasons={makeReasons(count)} />,
    );
    expect(screen.getAllByRole('radio')).toHaveLength(count);
  });

  it('renders the Figma heading and padding', async () => {
    await render(
      <TodaySkipReasonContent
        {...baseProps}
        testID="content"
        reasons={makeReasons(3)}
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('content').props.style),
    ).toMatchObject({
      gap: 32,
      paddingTop: 8,
      paddingHorizontal: 24,
      paddingBottom: 24,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Choose a reason').props.style),
    ).toMatchObject({
      ...lightTheme.typography.largeTitle.semibold,
      color: lightTheme.colors.text.primary,
    });
    expect(
      StyleSheet.flatten(screen.getByText('The owner will see it').props.style),
    ).toMatchObject({
      ...lightTheme.typography.caption.regular,
      color: lightTheme.colors.text.secondary,
    });
  });

  it('checks the selected reason and reports taps by key', async () => {
    const onSelectReason = jest.fn();
    await render(
      <TodaySkipReasonContent
        {...baseProps}
        reasons={makeReasons(3)}
        selectedReasonKey="reason2"
        onSelectReason={onSelectReason}
      />,
    );
    expect(
      screen.getByRole('radio', { name: 'Reason 2', checked: true }),
    ).toBeTruthy();
    expect(
      screen.getByRole('radio', { name: 'Reason 1', checked: false }),
    ).toBeTruthy();
    await fireEvent.press(screen.getByRole('radio', { name: 'Other' }));
    expect(onSelectReason).toHaveBeenCalledWith('other');
  });

  it('hides the other-reason field by default', async () => {
    await render(
      <TodaySkipReasonContent
        {...baseProps}
        testID="content"
        reasons={makeReasons(3)}
        reasonLabel="Describe"
      />,
    );
    expect(screen.queryByTestId('content.otherReason')).toBeNull();
    expect(screen.queryByText('Describe')).toBeNull();
  });

  it('shows the other-reason field with a counter and reports changes', async () => {
    const onChange = jest.fn();
    await render(
      <TodaySkipReasonContent
        {...baseProps}
        testID="content"
        reasons={makeReasons(3)}
        selectedReasonKey="other"
        hasOtherReason
        reasonLabel="Describe"
        reasonDescription="Vet"
        onReasonDescriptionChange={onChange}
        reasonMaxLength={130}
        reasonInputTestID="input"
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('content.otherReason').props.style),
    ).toMatchObject({
      borderRadius: 16,
      borderColor: lightTheme.colors.border.default,
      padding: 16,
      gap: 8,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Describe').props.style),
    ).toMatchObject(lightTheme.typography.headline.bold);
    expect(screen.getByText('3/130')).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByText('3/130').props.style),
    ).toMatchObject(lightTheme.typography.smallCaption.medium);
    const input = screen.getByTestId('input');
    expect(input.props.maxLength).toBe(130);
    expect(StyleSheet.flatten(input.props.style)).toMatchObject(
      lightTheme.typography.body.regular,
    );
    await fireEvent.changeText(input, 'Vet visit');
    expect(onChange).toHaveBeenCalledWith('Vet visit');
  });
});
