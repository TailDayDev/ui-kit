import { FlatList, StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ChipGroup } from './ChipGroup';

const ITEMS = [
  { id: 'first', name: 'First', count: 3 },
  { id: 'second', name: 'Second' },
];

describe('ChipGroup', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('selects "All" for a null value and reports chip ids', async () => {
    const onChange = jest.fn();
    await render(
      <ChipGroup
        items={ITEMS}
        value={null}
        onChange={onChange}
        allLabel="All"
        testIDPrefix="chips"
      />,
    );
    expect(screen.getByRole('button', { name: 'All' })).toBeSelected();
    await fireEvent.press(screen.getByTestId('chips.second'));
    expect(onChange).toHaveBeenLastCalledWith('second');
    await fireEvent.press(screen.getByTestId('chips.all'));
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('styles the selected compact chip as the Figma selected Chip', async () => {
    await render(
      <ChipGroup
        items={ITEMS}
        value="first"
        onChange={jest.fn()}
        showAll={false}
        testIDPrefix="chips"
      />,
    );
    const selected = screen.getByTestId('chips.first');
    expect(selected).toBeSelected();
    expect(StyleSheet.flatten(selected.props.style)).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accentSoft,
      borderColor: lightTheme.palette.primary,
      borderRadius: 8,
      height: 32,
    });
    expect(
      StyleSheet.flatten(screen.getByText('First').props.style),
    ).toMatchObject({
      ...lightTheme.typography.caption.bold,
      color: lightTheme.colors.text.accent,
    });
    expect(StyleSheet.flatten(screen.getByText('3').props.style).color).toBe(
      lightTheme.colors.text.inverse,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('chips.second').props.style),
    ).toMatchObject({
      backgroundColor: lightTheme.colors.bg.surface,
      borderColor: lightTheme.colors.border.default,
    });
  });

  it('uses the filter pill metrics', async () => {
    await render(
      <ChipGroup
        items={ITEMS}
        value={null}
        onChange={jest.fn()}
        showAll={false}
        variant="filter"
        testIDPrefix="chips"
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('chips.first').props.style),
    ).toMatchObject({ borderRadius: 38, paddingLeft: 16, paddingRight: 12 });
    expect(
      StyleSheet.flatten(screen.getByText('First').props.style),
    ).toMatchObject(lightTheme.typography.body.regular);
  });

  it('shows the skeleton while loading', async () => {
    await render(
      <ChipGroup
        items={ITEMS}
        value={null}
        onChange={jest.fn()}
        allLabel="All"
        isLoading
      />,
    );
    expect(screen.queryByText('All')).toBeNull();
  });

  it('does not move the list programmatically when automatic scrolling is disabled', async () => {
    const scrollToOffsetSpy = jest.spyOn(FlatList.prototype, 'scrollToOffset');
    const scrollToIndexSpy = jest.spyOn(FlatList.prototype, 'scrollToIndex');

    await render(
      <ChipGroup
        items={ITEMS}
        onChange={() => undefined}
        scrollToSelectedOnMount={false}
        value={null}
        allLabel="All"
      />,
    );
    await screen.rerender(
      <ChipGroup
        items={ITEMS}
        onChange={() => undefined}
        scrollToSelectedOnMount={false}
        value="second"
        allLabel="All"
      />,
    );

    expect(scrollToOffsetSpy).not.toHaveBeenCalled();
    expect(scrollToIndexSpy).not.toHaveBeenCalled();
  });
});
