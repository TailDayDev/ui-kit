import { useState } from 'react';
import { Text as RNText } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { CheckIcon } from '../../icons/CheckIcon';
import { MultiSelect } from './MultiSelect';
import type { MultiSelectItem, MultiSelectProps } from './MultiSelect.types';
import { MultiSelectCard } from './MultiSelectCard';

const LIST: MultiSelectItem[] = [
  { id: 1, title: 'Dog', description: 'Any breed', displayOrder: 1 },
  { id: 2, title: 'Cat', description: 'Indoor or outdoor', displayOrder: 2 },
  { id: 3, title: 'Rabbit', descriptionCode: 'rabbit_hint', displayOrder: 3 },
  { id: 4, title: 'Other', isCustom: true },
];

const renderItemIcon: MultiSelectProps['renderItemIcon'] = ({
  size,
  color,
}) => <CheckIcon size={size} color={color} />;

const Interactive = (props: Partial<MultiSelectProps>) => {
  const [selected, setSelected] = useState<(number | string)[]>([1]);
  return (
    <MultiSelect
      list={LIST}
      selectedItems={selected}
      handlePress={() => undefined}
      onSelectionChange={setSelected}
      renderItemIcon={renderItemIcon}
      resolveDescriptionCode={code => `Translated: ${code}`}
      {...props}
    />
  );
};

const meta = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  args: {
    list: LIST,
    selectedItems: [1],
    handlePress: () => undefined,
  },
  render: args => <Interactive {...args} />,
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleSelection: Story = { args: { selectionMode: 'single' } };

export const Wrapped: Story = { args: { variant: 'wrapped' } };

export const LockedItems: Story = { args: { disabledItems: [2] } };

export const Disabled: Story = { args: { disabled: true } };

export const NoIconNoDescription: Story = {
  args: { showIcon: false, showDescription: false },
};

export const CardOnly: Story = {
  render: () => (
    <MultiSelectCard
      item={{ id: 1, title: 'Night stay', description: '$40 per night' }}
      selected
      withShadow
      showIcon={false}
      handlePress={() => undefined}
    >
      <RNText>Extra content</RNText>
    </MultiSelectCard>
  ),
};
