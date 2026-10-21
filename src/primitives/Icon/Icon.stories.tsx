import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import Svg, { Path } from 'react-native-svg';

import { Box } from '../Box';
import { Icon } from './Icon';
import type { IconComponentProps } from './Icon.types';

// Sample glyph for the story only (lucide "plus"). Real icons come from the app or a future icon set.
const PlusSvg = ({ color, size = 24 }: IconComponentProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12h14M12 5v14"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

const meta = {
  title: 'Primitives/Icon',
  component: Icon,
  args: { icon: PlusSvg, size: 24, color: 'default' },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'default',
        'accent',
        'text.primary',
        'text.error',
        'text.inverse',
      ],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: args => (
    <Box row gap={3} align="center">
      {[16, 20, 24, 28].map(size => (
        <Icon key={size} {...args} size={size} />
      ))}
    </Box>
  ),
};
