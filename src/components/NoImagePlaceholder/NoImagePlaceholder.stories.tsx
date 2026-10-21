import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import Svg, { Path } from 'react-native-svg';

import { Box } from '../../primitives';
import { NoImagePlaceholder } from './NoImagePlaceholder';
import type { NoImagePlaceholderRenderParams } from './NoImagePlaceholder.types';

// Story-only stand-in for the app's admin `NoImageIcon` (a framed photo glyph).
const renderSampleArtwork = ({ color }: NoImagePlaceholderRenderParams) => (
  <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 5h16v14H4zM4 15l4-4 4 4 3-3 5 5"
      stroke={color ?? '#BDBDBD'}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </Svg>
);

const meta = {
  title: 'Components/NoImagePlaceholder',
  component: NoImagePlaceholder,
  args: { size: 56, renderImage: renderSampleArtwork },
} satisfies Meta<typeof NoImagePlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tinted: Story = { args: { color: '#7962FF' } };

export const Sizes: Story = {
  render: args => (
    <Box row gap={3} align="center">
      {[24, 40, 48, 56, 96].map(size => (
        <NoImagePlaceholder key={size} {...args} size={size} />
      ))}
    </Box>
  ),
};

export const FillParent: Story = {
  args: { size: '100%' },
  render: args => (
    <Box style={{ width: 120, height: 120 }} background="subtle">
      <NoImagePlaceholder {...args} />
    </Box>
  ),
};

/** Without `renderImage` the frame is empty: the artwork is app-provided. */
export const WithoutArtwork: Story = { args: { renderImage: undefined } };
