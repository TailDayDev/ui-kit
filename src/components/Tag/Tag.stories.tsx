import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';

import { Box } from '../../primitives/Box';
import { Tag } from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  args: {
    item: { id: '1', title: 'Heated floor' },
    selectedItems: [],
    handlePress: () => undefined,
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = { args: { selectedItems: ['1'] } };

const ITEMS = [
  { id: '1', title: 'Heated floor' },
  { id: '2', title: 'Garden' },
  { id: '3', title: 'Camera' },
  { id: '4', title: 'Air conditioning' },
];

const TagGroup = () => {
  const [selected, setSelected] = useState<Array<number | string>>(['2']);
  const toggle = (id: number | string) =>
    setSelected(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id],
    );
  return (
    <Box row gap={2} style={{ flexWrap: 'wrap' }}>
      {ITEMS.map(item => (
        <Tag
          key={item.id}
          item={item}
          selectedItems={selected}
          handlePress={toggle}
        />
      ))}
    </Box>
  );
};

export const Group: Story = { render: () => <TagGroup /> };
