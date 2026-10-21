import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { lightTheme } from '../../theme';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    title: 'Upcoming visit',
    withShadow: false,
    disabled: false,
    additionalPosition: 'right',
    children: (
      <Text color="secondary">Bath and haircut scheduled for 10:30.</Text>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const Badge = () => (
  <Box background="accentSoft" radius="sm" paddingX={2} paddingY={1}>
    <Text variant="caption/medium" color="accent">
      3 photos
    </Text>
  </Box>
);

export const Default: Story = {};

export const BodyOnly: Story = { args: { title: undefined } };

export const WithAdditionalRight: Story = { args: { additional: <Badge /> } };

export const WithAdditionalLeft: Story = {
  args: { additional: <Badge />, additionalPosition: 'left' },
};

export const MultilineTitle: Story = {
  args: {
    title: 'A very long card title that wraps onto a second line when allowed',
    titleNumberOfLines: 2,
  },
};

export const WithShadow: Story = { args: { withShadow: true } };

export const Pressable: Story = {
  args: { withShadow: true, accessibilityLabel: 'Open visit' },
  render: args => <Card {...args} onPress={() => undefined} />,
};

export const Disabled: Story = {
  args: { withShadow: true, disabled: true, accessibilityLabel: 'Open visit' },
  render: Pressable.render,
};

export const CustomStyles: Story = {
  args: {
    cardStyles: { backgroundColor: lightTheme.colors.bg.subtle },
    style: { borderColor: lightTheme.colors.text.success },
  },
};
