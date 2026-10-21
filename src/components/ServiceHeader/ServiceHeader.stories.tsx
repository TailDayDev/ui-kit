import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { Chip } from '../Chip';
import { ChipGroup } from '../ChipGroup';
import { ServiceHeader } from './ServiceHeader';
import type { ServiceHeaderSelectorProps } from './ServiceHeader.types';

const CHIP_COUNT = 8;

const styles = StyleSheet.create({
  // Figma ServiceHeader › Фильтры: padding 0/16, gap 4.
  chips: { gap: 4, paddingHorizontal: 16 },
});

/** Figma bottomContent sample: first chip selected without a badge, the rest with "0". */
const FigmaChips = () => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.chips}
  >
    {Array.from({ length: CHIP_COUNT }, (_, index) => (
      <Chip
        key={index}
        name="Label"
        count="0"
        isSelected={index === 0}
        hasBadge={index !== 0}
        onPress={() => {}}
      />
    ))}
  </ScrollView>
);

const ChipGroupFilters = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <ChipGroup
      items={[
        { id: 'checkin', name: 'Check-in', count: 3 },
        { id: 'checkout', name: 'Check-out', count: 1 },
        { id: 'feeding', name: 'Feeding', count: 0 },
      ]}
      value={value}
      onChange={setValue}
      allLabel="All"
    />
  );
};

const SELECTOR_ARGS: ServiceHeaderSelectorProps = {
  forceTitleOnly: false,
  trigger: { titleSelected: 'Title', notifications: '0', onPress: () => {} },
  search: { onPress: () => {}, accessibilityLabel: 'Search' },
  hasSearch: true,
  hasBottomContent: true,
  bottomContent: <FigmaChips />,
};

const meta = {
  title: 'Components/ServiceHeader',
  component: ServiceHeader,
  args: SELECTOR_ARGS,
} satisfies Meta<typeof ServiceHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `forceTitleOnly=false`. */
export const ForceTitleOnlyFalse: Story = {};

/** Figma `forceTitleOnly=true`. */
export const ForceTitleOnlyTrue: Story = {
  render: () => (
    <ServiceHeader
      forceTitleOnly
      title="Title"
      bottomContent={<FigmaChips />}
    />
  ),
};

/** Without the bottom row and search. */
export const Compact: Story = {
  args: { hasBottomContent: false, hasSearch: false },
};

/** With the kit `ChipGroup` in the bottom slot. */
export const WithChipGroup: Story = {
  args: { bottomContent: <ChipGroupFilters /> },
};

/** Both Figma variants. */
export const AllVariants: Story = {
  render: () => (
    <Box gap={4}>
      <ServiceHeader {...SELECTOR_ARGS} />
      <ServiceHeader
        forceTitleOnly
        title="Title"
        bottomContent={<FigmaChips />}
      />
    </Box>
  ),
};
