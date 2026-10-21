import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box, Text } from '../../primitives';
import { ChipGroup } from './ChipGroup';
import type { ChipGroupVariant, ChipItem } from './ChipGroup.types';
import { ChipGroupSkeleton } from './ChipGroupSkeleton';

const ITEMS: ChipItem[] = [
  { id: 'dogs', name: 'Собаки', count: 12 },
  { id: 'cats', name: 'Кошки', count: 4 },
  { id: 'birds', name: 'Птицы' },
  { id: 'rodents', name: 'Грызуны', count: 1 },
  { id: 'reptiles', name: 'Рептилии', count: 0 },
];

const Interactive = ({
  variant,
  isShowAll,
}: {
  variant: ChipGroupVariant;
  isShowAll: boolean;
}) => {
  const [value, setValue] = useState<string | null>(null);
  return isShowAll ? (
    <ChipGroup
      items={ITEMS}
      value={value}
      onChange={setValue}
      variant={variant}
      allLabel="Все"
    />
  ) : (
    <ChipGroup
      items={ITEMS}
      value={value}
      onChange={setValue}
      variant={variant}
      showAll={false}
    />
  );
};

const meta = {
  title: 'Components/ChipGroup',
  component: ChipGroup,
  args: {
    items: ITEMS,
    value: null,
    onChange: () => {},
    allLabel: 'Все',
    variant: 'compact',
    isLoading: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['compact', 'filter'] },
  },
} satisfies Meta<typeof ChipGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const CompactSelected: Story = { args: { value: 'cats' } };

export const Filter: Story = { args: { variant: 'filter', value: 'dogs' } };

export const Loading: Story = { args: { isLoading: true } };

export const InteractiveVariants: Story = {
  render: () => (
    <Box gap={4}>
      <Text variant="caption/regular" color="secondary">
        compact, with “All”
      </Text>
      <Interactive variant="compact" isShowAll />
      <Text variant="caption/regular" color="secondary">
        filter, without “All”
      </Text>
      <Interactive variant="filter" isShowAll={false} />
    </Box>
  ),
};

/** Figma `ChipGroupSkeleton`. */
export const Skeletons: Story = {
  render: () => (
    <Box gap={4}>
      <ChipGroupSkeleton />
      <ChipGroupSkeleton variant="filter" />
    </Box>
  ),
};
