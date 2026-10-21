import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { PlusIcon } from '../../icons/PlusIcon';
import { Box, Icon, Text } from '../../primitives';
import { IconRoundButton, IconSquareButton } from './IconButton';

const ROUND_SIZES = [28, 36, 40] as const;
const SQUARE_SIZES = [40, 48] as const;
const GLYPH_SIZE = 20;

const glyph = <Icon icon={PlusIcon} size={GLYPH_SIZE} />;

const meta = {
  title: 'Components/IconButton',
  component: IconRoundButton,
  args: {
    accessibilityLabel: 'Add',
    icon: glyph,
    disabled: false,
    loading: false,
    size: 40,
  },
  argTypes: { icon: { control: false } },
} satisfies Meta<typeof IconRoundButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Round, size 40. Press it to see the 0.9 pressed opacity. */
export const Round: Story = {};

export const Square: Story = {
  render: args => <IconSquareButton {...args} />,
};

const StateRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Box gap={2}>
    <Text variant="body/medium">{label}</Text>
    <Box row gap={4} align="center">
      {children}
    </Box>
  </Box>
);

/** Every size × default / disabled / loading. */
export const Matrix: Story = {
  render: () => (
    <Box gap={6}>
      {ROUND_SIZES.map(size => (
        <StateRow key={`round-${size}`} label={`IconRoundButton ${size}`}>
          <IconRoundButton accessibilityLabel="Add" icon={glyph} size={size} />
          <IconRoundButton
            accessibilityLabel="Add"
            icon={glyph}
            size={size}
            disabled
          />
          <IconRoundButton
            accessibilityLabel="Add"
            icon={glyph}
            size={size}
            loading
          />
        </StateRow>
      ))}
      {SQUARE_SIZES.map(size => (
        <StateRow key={`square-${size}`} label={`IconSquareButton ${size}`}>
          <IconSquareButton accessibilityLabel="Add" icon={glyph} size={size} />
          <IconSquareButton
            accessibilityLabel="Add"
            icon={glyph}
            size={size}
            disabled
          />
          <IconSquareButton
            accessibilityLabel="Add"
            icon={glyph}
            size={size}
            loading
          />
        </StateRow>
      ))}
    </Box>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const Loading: Story = { args: { loading: true } };
