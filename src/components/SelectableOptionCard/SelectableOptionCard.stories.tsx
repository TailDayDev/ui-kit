import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box, Text } from '../../primitives';
import { SelectableOptionCard } from './SelectableOptionCard';

const meta = {
  title: 'Components/SelectableOptionCard',
  component: SelectableOptionCard,
  args: {
    title: 'Rabies',
    description: 'Core vaccine recommended for most dogs and cats.',
    isSelected: false,
    isDisabled: false,
    onPress: () => undefined,
  },
} satisfies Meta<typeof SelectableOptionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = { args: { isSelected: true } };

export const WithBadge: Story = { args: { badgeText: 'Recommended' } };

export const SelectedWithBadge: Story = {
  args: { badgeText: 'Recommended', isSelected: true },
};

export const Disabled: Story = { args: { isDisabled: true } };

export const DisabledSelected: Story = {
  args: { isDisabled: true, isSelected: true },
};

export const TitleOnly: Story = { args: { description: null } };

export const WithFooter: Story = {
  args: {
    footer: (
      <Text variant="caption/medium" color="secondary">
        Valid for 1 year
      </Text>
    ),
  },
};

export const Static: Story = { args: { onPress: undefined } };

const VACCINES = [
  { id: 'rabies', title: 'Rabies', badge: 'Recommended' },
  { id: 'bordetella', title: 'Bordetella', badge: undefined },
] as const;

const InteractiveList = () => {
  const [selectedId, setSelectedId] = useState<string>('rabies');
  return (
    <Box gap={3}>
      {VACCINES.map(vaccine => (
        <SelectableOptionCard
          key={vaccine.id}
          title={vaccine.title}
          description="Commonly required for boarding and daycare stays."
          badgeText={vaccine.badge}
          isSelected={selectedId === vaccine.id}
          onPress={() => setSelectedId(vaccine.id)}
        />
      ))}
    </Box>
  );
};

export const Interactive: Story = { render: () => <InteractiveList /> };
