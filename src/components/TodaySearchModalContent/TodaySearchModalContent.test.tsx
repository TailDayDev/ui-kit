import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Text } from '../../primitives/Text';
import { lightTheme } from '../../theme';
import { TodaySearchModalContent } from './TodaySearchModalContent';
import type {
  TodaySearchModalContentProps,
  TodaySearchModalContentSection,
} from './TodaySearchModalContent.types';

const LABELS = {
  placeholder: 'Поиск',
  initial: 'Здесь отобразятся результаты поиска',
  noResults: 'Ничего не найдено',
  clear: 'Очистить поиск',
};

const SECTIONS: TodaySearchModalContentSection[] = [
  {
    id: 'morning',
    title: 'Утро — 20 октября: 1',
    tasks: [
      {
        id: 'molly',
        testID: 'card.molly',
        pet: <Text>Molly</Text>,
        footer: {
          onMenuPress: jest.fn(),
          menuAccessibilityLabel: 'Ещё действия',
          sliderProps: { completedLabel: 'Готово!', onComplete: jest.fn() },
        },
      },
    ],
  },
];

const renderContent = (props: Partial<TodaySearchModalContentProps> = {}) =>
  render(
    <TodaySearchModalContent
      query=""
      onQueryChange={jest.fn()}
      labels={LABELS}
      inputTestID="input"
      clearTestID="clear"
      emptyStateTestID="empty"
      sections={SECTIONS}
      {...props}
    />,
  );

describe('TodaySearchModalContent', () => {
  it('state=initial: hint text, no clear control, no results', async () => {
    await renderContent();
    expect(screen.getByPlaceholderText('Поиск')).toBeTruthy();
    const hint = screen.getByText(LABELS.initial);
    expect(StyleSheet.flatten(hint.props.style)).toMatchObject({
      ...lightTheme.typography.headline.medium,
      color: lightTheme.colors.text.secondary,
      textAlign: 'center',
    });
    expect(screen.queryByTestId('clear')).toBeNull();
    expect(screen.queryByText('Molly')).toBeNull();
  });

  it('state=results: section header and task cards', async () => {
    await renderContent({ state: 'results', query: 'Mol' });
    expect(screen.getByText('Утро — 20 октября: 1')).toBeTruthy();
    expect(screen.getByText('Molly')).toBeTruthy();
    expect(screen.getByTestId('card.molly')).toBeTruthy();
    expect(screen.queryByTestId('empty')).toBeNull();
  });

  it('state=no-results: nothing found text', async () => {
    await renderContent({ state: 'no-results', query: 'zzz' });
    expect(screen.getByText(LABELS.noResults)).toBeTruthy();
    expect(screen.queryByText('Molly')).toBeNull();
  });

  it('reports typed text and clears via onClear or onQueryChange', async () => {
    const onQueryChange = jest.fn();
    await renderContent({ query: 'Mol', onQueryChange });
    await fireEvent.changeText(screen.getByTestId('input'), 'Moll');
    expect(onQueryChange).toHaveBeenCalledWith('Moll');

    const clearButton = screen.getByRole('button', { name: 'Очистить поиск' });
    await fireEvent(clearButton, 'accessibilityTap');
    expect(onQueryChange).toHaveBeenLastCalledWith('');
  });

  it('calls onClear when given', async () => {
    const onClear = jest.fn();
    const onQueryChange = jest.fn();
    await renderContent({ query: 'Mol', onClear, onQueryChange });
    await fireEvent(screen.getByTestId('clear'), 'accessibilityTap');
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onQueryChange).not.toHaveBeenCalled();
  });

  it('draws the focused field with the accent stroke and shadow/focus', async () => {
    await renderContent({ testID: 'body', isAutoFocused: false });
    const fieldStyle = () =>
      StyleSheet.flatten(screen.getByTestId('body.field').props.style);
    expect(fieldStyle()).toMatchObject({
      height: 48,
      borderRadius: lightTheme.radius.sm,
      borderWidth: 1,
      paddingLeft: 16,
      gap: 12,
      backgroundColor: lightTheme.colors.bg.surface,
      borderColor: lightTheme.palette.lightGray,
    });
    await fireEvent(screen.getByTestId('input'), 'focus');
    expect(fieldStyle()).toMatchObject({
      borderColor: lightTheme.palette.primary,
      boxShadow: [...lightTheme.shadows.focus],
    });
    await fireEvent(screen.getByTestId('input'), 'blur');
    expect(fieldStyle()).toMatchObject({
      borderColor: lightTheme.palette.lightGray,
    });
  });

  it('wraps cards with renderTask', async () => {
    await renderContent({
      state: 'results',
      renderTask: (task, card) => (
        <>
          <Text>{`wrapped ${task.id}`}</Text>
          {card}
        </>
      ),
    });
    expect(screen.getByText('wrapped molly')).toBeTruthy();
    expect(screen.getByText('Molly')).toBeTruthy();
  });
});
