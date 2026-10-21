import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { lightTheme } from '../../theme';
import type { TypographyVariant } from '../../tokens';
import { Box } from '../Box';
import { Text } from './Text';

const VARIANTS = Object.entries(lightTheme.typography).flatMap(
  ([group, weights]) =>
    Object.keys(weights).map(
      weight => `${group}/${weight}` as TypographyVariant,
    ),
);

const meta = {
  title: 'Primitives/Text',
  component: Text,
  args: { children: 'Барон — корм на сегодня', variant: 'body/regular' },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    color: {
      control: 'select',
      options: Object.keys(lightTheme.colors.text),
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: args => (
    <Box gap={3}>
      {VARIANTS.map(variant => (
        <Box key={variant} gap={1}>
          <Text variant="caption/regular" color="secondary">
            {variant}
          </Text>
          <Text {...args} variant={variant} />
        </Box>
      ))}
    </Box>
  ),
};

export const Colors: Story = {
  render: args => (
    <Box gap={2}>
      {(
        Object.keys(
          lightTheme.colors.text,
        ) as (keyof typeof lightTheme.colors.text)[]
      ).map(color => (
        <Box
          key={color}
          background={color === 'inverse' ? 'accent' : undefined}
          padding={1}
        >
          <Text {...args} color={color}>
            {`text.${color}`}
          </Text>
        </Box>
      ))}
    </Box>
  ),
};
