import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import {
  TodayCompletionSlider,
  isCompletionReached,
} from './TodayCompletionSlider';

const trackStyle = () =>
  StyleSheet.flatten(screen.getByTestId('slider').props.style);
const handleStyle = () =>
  StyleSheet.flatten(
    screen.getByTestId('slider.handle', { includeHiddenElements: true }).props
      .style,
  );
const completeAction = (actionName: string) => ({
  nativeEvent: { actionName },
});

describe('TodayCompletionSlider', () => {
  it('renders the idle Figma variant: 180×48 pill track with a purple 40pt handle', async () => {
    await render(
      <TodayCompletionSlider
        testID="slider"
        completedLabel="Готово!"
        onComplete={jest.fn()}
      />,
    );
    expect(trackStyle()).toMatchObject({
      width: 180,
      height: 48,
      borderRadius: lightTheme.radius.full,
      borderWidth: 1,
      borderColor: lightTheme.colors.border.default,
      backgroundColor: lightTheme.colors.bg.subtle,
      opacity: 1,
    });
    expect(handleStyle()).toMatchObject({
      width: 40,
      height: 40,
      backgroundColor: lightTheme.colors.bg.accent,
    });
    expect(screen.queryByText('Готово!')).toBeNull();
  });

  it('renders the completed variant: label and green handle', async () => {
    await render(
      <TodayCompletionSlider
        testID="slider"
        completedLabel="Готово!"
        isCompleted
        onComplete={jest.fn()}
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByText('Готово!').props.style),
    ).toMatchObject({
      ...lightTheme.typography.headline.medium,
      color: lightTheme.colors.text.primary,
    });
    expect(handleStyle().backgroundColor).toBe(lightTheme.palette.secondary);
    expect(trackStyle().justifyContent).toBe('space-between');
  });

  it('dims the disabled variant to 0.6', async () => {
    await render(
      <TodayCompletionSlider
        testID="slider"
        completedLabel="Готово!"
        isDisabled
        onComplete={jest.fn()}
      />,
    );
    expect(trackStyle().opacity).toBe(0.6);
  });

  it('is adjustable and completes once through the accessibility action', async () => {
    const onComplete = jest.fn();
    await render(
      <TodayCompletionSlider
        completedLabel="Готово!"
        onComplete={onComplete}
      />,
    );
    const slider = screen.getByRole('adjustable', { name: 'Готово!' });
    expect(slider.props.accessibilityValue).toMatchObject({ now: 0 });
    expect(slider.props.accessibilityActions).toEqual([
      { name: 'activate', label: 'Готово!' },
      { name: 'increment', label: 'Готово!' },
    ]);

    await fireEvent(slider, 'accessibilityAction', completeAction('activate'));
    await fireEvent(slider, 'accessibilityAction', completeAction('increment'));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('ignores other accessibility actions', async () => {
    const onComplete = jest.fn();
    await render(
      <TodayCompletionSlider
        completedLabel="Готово!"
        onComplete={onComplete}
      />,
    );
    await fireEvent(
      screen.getByRole('adjustable'),
      'accessibilityAction',
      completeAction('decrement'),
    );
    expect(onComplete).not.toHaveBeenCalled();
  });

  it.each([
    ['disabled', { isDisabled: true }],
    ['completed', { isCompleted: true }],
  ])('does not complete when %s', async (_name, state) => {
    const onComplete = jest.fn();
    await render(
      <TodayCompletionSlider
        completedLabel="Готово!"
        onComplete={onComplete}
        {...state}
      />,
    );
    const slider = screen.getByRole('adjustable');
    expect(slider.props.accessibilityActions).toEqual([]);
    await fireEvent(slider, 'accessibilityAction', completeAction('activate'));
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('reports disabled and completed state to screen readers', async () => {
    await render(
      <TodayCompletionSlider
        completedLabel="Готово!"
        isCompleted
        isDisabled
        onComplete={jest.fn()}
      />,
    );
    const slider = screen.getByRole('adjustable');
    expect(slider.props.accessibilityState).toEqual({
      disabled: true,
      checked: true,
    });
    expect(slider.props.accessibilityValue).toMatchObject({
      now: 100,
      text: 'Готово!',
    });
  });

  it('completes only past 80% of the track', () => {
    expect(isCompletionReached(105, 132)).toBe(false);
    expect(isCompletionReached(106, 132)).toBe(true);
    expect(isCompletionReached(500, 132)).toBe(true);
    expect(isCompletionReached(10, 0)).toBe(false);
  });
});
