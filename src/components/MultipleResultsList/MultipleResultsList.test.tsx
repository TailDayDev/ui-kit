import { StyleSheet, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { MultipleResultsList } from './MultipleResultsList';
import type {
  MultipleResultsListItem,
  MultipleResultsListProps,
} from './MultipleResultsList.types';

type HostNode = ReturnType<typeof screen.getByText>;

const LABELS = { edit: 'Edit', from: 'From', to: 'To' };

const DAY_ITEM: MultipleResultsListItem = {
  title: 'Cat condo',
  priceText: '$12',
  dates: ['Sep 30'],
  isRange: false,
};

const RANGE_ITEM: MultipleResultsListItem = {
  title: 'Outdoor kennel',
  priceText: '$18 / night',
  dates: ['Oct 1', 'Oct 3'],
  isRange: true,
};

const renderList = (props: Partial<MultipleResultsListProps> = {}) =>
  render(<MultipleResultsList items={[DAY_ITEM]} labels={LABELS} {...props} />);

/** Align values of the date column (the row with gap 4) holding `dateText`. */
const dateAlignItems = (dateText: string) => {
  let node: HostNode | null = screen.getByText(dateText);
  while (node) {
    const style = StyleSheet.flatten(node.props.style);
    if (style?.flexDirection === 'row' && style.gap === lightTheme.space[1]) {
      return style.alignItems;
    }
    node = node.parent;
  }
  return undefined;
};

/** Style of the colored side bar of the row holding `text`. */
const sideBarStyle = (text: string) => {
  let node: HostNode | null = screen.getByText(text);
  while (node) {
    const style = StyleSheet.flatten(node.props.style);
    if (style?.flexDirection === 'row' && style.gap === lightTheme.space[3]) {
      const bar = node.children.at(-1);
      return typeof bar === 'string'
        ? undefined
        : StyleSheet.flatten(bar?.props.style);
    }
    node = node.parent;
  }
  return undefined;
};

describe('MultipleResultsList', () => {
  it('shows a single date without from/to labels', async () => {
    await renderList();
    expect(screen.getByText('Cat condo')).toBeTruthy();
    expect(screen.getByText('$12')).toBeTruthy();
    expect(screen.getByText('Sep 30')).toBeTruthy();
    expect(screen.queryByText('From')).toBeNull();
    expect(screen.queryByText('To')).toBeNull();
    expect(dateAlignItems('Sep 30')).toBe('flex-end');
  });

  it('centers one date only when the caller opts in', async () => {
    await renderList({ isSingleDateCentered: true });
    expect(dateAlignItems('Sep 30')).toBe('center');
  });

  it('does not center a range even when the caller opts in', async () => {
    await renderList({ items: [RANGE_ITEM], isSingleDateCentered: true });
    expect(dateAlignItems('Oct 1')).toBe('flex-end');
  });

  it('shows both range dates with lowercase from/to labels', async () => {
    await renderList({ items: [RANGE_ITEM] });
    expect(screen.getByText('Oct 1')).toBeTruthy();
    expect(screen.getByText('Oct 3')).toBeTruthy();
    expect(screen.getByText('$18 / night')).toBeTruthy();
    expect(
      StyleSheet.flatten(screen.getByText('From').props.style).textTransform,
    ).toBe('lowercase');
    expect(screen.getByText('To')).toBeTruthy();
  });

  it('keeps rows separate and alternates the side bar color', async () => {
    await renderList({
      items: [
        { ...DAY_ITEM, key: 'a' },
        { ...RANGE_ITEM, key: 'b' },
      ],
    });
    expect(screen.getByText('Sep 30')).toBeTruthy();
    expect(screen.getByText('Oct 3')).toBeTruthy();
    const bars = ['Sep 30', 'Oct 3'].map(sideBarStyle);
    expect(bars.map(style => style?.backgroundColor)).toEqual([
      lightTheme.colors.bg.accent,
      lightTheme.palette.secondary,
    ]);
  });

  it('renders the image or an empty 40pt slot', async () => {
    await renderList({
      items: [
        { ...DAY_ITEM, key: 'a', image: <View testID="room-image" /> },
        { ...RANGE_ITEM, key: 'b' },
      ],
    });
    expect(screen.getByTestId('room-image')).toBeTruthy();
  });

  it('shows the title, the edit button and calls onEdit', async () => {
    const onEdit = jest.fn();
    await renderList({ title: 'Rooms', onEdit });
    expect(screen.getByText('Rooms')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Edit' }));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('shows the total row only with a total value', async () => {
    await renderList({ totalLabel: 'Total' });
    expect(screen.queryByText('Total')).toBeNull();
    await renderList({ totalLabel: 'Total', totalValue: '$30' });
    expect(screen.getByText('Total')).toBeTruthy();
    expect(screen.getByText('$30')).toBeTruthy();
  });
});
