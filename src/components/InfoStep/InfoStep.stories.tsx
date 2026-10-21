import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';

import { lightTheme } from '../../theme';
import { InfoStep } from './InfoStep';

const meta = {
  title: 'Components/InfoStep',
  component: InfoStep,
  decorators: [
    Story => (
      <View style={{ height: 760 }}>
        <Story />
      </View>
    ),
  ],
  args: {
    stage: 'Step 1',
    title: 'Check in pets in seconds',
    description:
      'Scan the QR code on the booking or find the client by name. The stay starts immediately.',
    renderImage: (size: number) => (
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: lightTheme.colors.bg.subtle,
          borderRadius: lightTheme.radius.lg,
        }}
      />
    ),
  },
} satisfies Meta<typeof InfoStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongDescription: Story = {
  args: {
    description:
      'A long description that takes several lines. The image above shrinks so the texts always fit on the screen without scrolling, as on the app intro screen.',
  },
};
