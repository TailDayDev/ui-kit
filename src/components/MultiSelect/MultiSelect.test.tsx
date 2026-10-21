import { StyleSheet, Text as RNText } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { MultiSelect } from './MultiSelect';
import type { MultiSelectItem } from './MultiSelect.types';
import { MultiSelectCard } from './MultiSelectCard';

const LIST: MultiSelectItem[] = [
  { id: 3, title: 'Custom', isCustom: true },
  { id: 2, title: 'Second', displayOrder: 2, description: 'Two' },
  { id: 1, title: 'First', displayOrder: 1, descriptionCode: 'first_hint' },
];

const cardStyle = (name: string) =>
  StyleSheet.flatten(screen.getByRole('button', { name }).props.style);

describe('MultiSelect', () => {
  it('sorts built-in items by displayOrder and custom ones last', async () => {
    await render(
      <MultiSelect list={LIST} selectedItems={[]} handlePress={jest.fn()} />,
    );
    const titles = screen
      .getAllByRole('button')
      .map(button => button.props.accessibilityLabel);
    expect(titles).toEqual(['First', 'Second', 'Custom']);
  });

  it('keeps the list order with preserveOrder', async () => {
    await render(
      <MultiSelect
        list={LIST}
        selectedItems={[]}
        handlePress={jest.fn()}
        preserveOrder
      />,
    );
    const titles = screen
      .getAllByRole('button')
      .map(button => button.props.accessibilityLabel);
    expect(titles).toEqual(['Custom', 'Second', 'First']);
  });

  it('marks selected items by normalized id and toggles the selection', async () => {
    const handlePress = jest.fn();
    const onSelectionChange = jest.fn();
    const onItemPress = jest.fn();
    await render(
      <MultiSelect
        list={LIST}
        selectedItems={['2']}
        handlePress={handlePress}
        onSelectionChange={onSelectionChange}
        onItemPress={onItemPress}
      />,
    );
    expect(cardStyle('Second')).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accentSoft,
      borderColor: lightTheme.colors.bg.accent,
    });
    await fireEvent.press(screen.getByRole('button', { name: 'First' }));
    expect(handlePress).toHaveBeenCalledWith(1);
    expect(onItemPress).toHaveBeenCalledWith(LIST[2], 1);
    expect(onSelectionChange).toHaveBeenLastCalledWith(['2', 1]);
    await fireEvent.press(screen.getByRole('button', { name: 'Second' }));
    expect(onSelectionChange).toHaveBeenLastCalledWith([]);
  });

  it('single mode reports one id at most', async () => {
    const onSelectionChange = jest.fn();
    await render(
      <MultiSelect
        list={LIST}
        selectedItems={[1, 2]}
        selectionMode="single"
        handlePress={jest.fn()}
        onSelectionChange={onSelectionChange}
      />,
    );
    expect(cardStyle('Second').borderColor).not.toBe(
      lightTheme.colors.bg.accent,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Second' }));
    expect(onSelectionChange).toHaveBeenLastCalledWith([2]);
    await fireEvent.press(screen.getByRole('button', { name: 'First' }));
    expect(onSelectionChange).toHaveBeenLastCalledWith([]);
  });

  it('locks disabledItems as selected and dimmed', async () => {
    const handlePress = jest.fn();
    await render(
      <MultiSelect
        list={LIST}
        selectedItems={[]}
        disabledItems={[1]}
        handlePress={handlePress}
      />,
    );
    const button = screen.getByRole('button', { name: 'First' });
    expect(button).toBeDisabled();
    expect(cardStyle('First')).toMatchObject({
      opacity: 0.4,
      borderColor: lightTheme.colors.bg.accent,
    });
    await fireEvent.press(button);
    expect(handlePress).not.toHaveBeenCalled();
  });

  it('uses itemComponent instead of the card', async () => {
    await render(
      <MultiSelect
        list={LIST}
        selectedItems={[1]}
        handlePress={jest.fn()}
        itemComponent={({ item, selected }) => (
          <RNText>{`${String(item.title)}:${String(selected)}`}</RNText>
        )}
      />,
    );
    expect(screen.getByText('First:true')).toBeTruthy();
    expect(screen.getByText('Second:false')).toBeTruthy();
  });

  it('resolves description codes and icons through the render props', async () => {
    const renderItemIcon = jest.fn(() => <RNText>icon</RNText>);
    await render(
      <MultiSelect
        list={LIST}
        selectedItems={[]}
        handlePress={jest.fn()}
        renderItemIcon={renderItemIcon}
        resolveDescriptionCode={code => `t:${code}`}
      />,
    );
    const hint = screen.getByText('t:first_hint');
    expect(StyleSheet.flatten(hint.props.style).color).toBe(
      lightTheme.palette.lightGray,
    );
    expect(renderItemIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 24,
        color: lightTheme.colors.text.secondary,
      }),
    );
  });
});

describe('MultiSelectCard', () => {
  it('renders title, description and a dimmed disabled state', async () => {
    const handlePress = jest.fn();
    await render(
      <MultiSelectCard
        item={{ id: 1, title: 'Bath', description: 'Warm water' }}
        handlePress={handlePress}
        disabled
        showIcon={false}
      />,
    );
    const button = screen.getByRole('button', { name: 'Bath' });
    expect(screen.getByText('Warm water')).toBeTruthy();
    expect(StyleSheet.flatten(button.props.style).opacity).toBe(0.6);
    await fireEvent.press(button);
    expect(handlePress).not.toHaveBeenCalled();
  });

  it('colors texts with the accent when selected', async () => {
    await render(
      <MultiSelectCard
        item={{ id: 1, title: 'Bath', description: 'Warm water' }}
        selected
      />,
    );
    expect(StyleSheet.flatten(screen.getByText('Bath').props.style).color).toBe(
      lightTheme.colors.text.accent,
    );
  });
});
