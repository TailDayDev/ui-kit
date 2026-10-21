import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { TodayTaskFooter } from './TodayTaskFooter';

const noop = () => {};
const BASE = {
  onMenuPress: noop,
  menuAccessibilityLabel: 'Ещё действия',
};

// Props are a union over `action`, so every story renders explicitly.
const meta: Meta<typeof TodayTaskFooter> = {
  title: 'Components/TodayTaskFooter',
  component: TodayTaskFooter,
};

export default meta;
type Story = StoryObj<typeof TodayTaskFooter>;

/** Figma `action=slider`. */
export const Slider: Story = {
  render: () => (
    <TodayTaskFooter
      {...BASE}
      action="slider"
      sliderProps={{ completedLabel: 'Label', onComplete: noop }}
    />
  ),
};

/** Figma `action=door`. */
export const Door: Story = {
  render: () => (
    <TodayTaskFooter
      {...BASE}
      action="door"
      doorProps={{ label: 'Label', onPress: noop }}
    />
  ),
};

/** Figma `action=skipped`. */
export const Skipped: Story = {
  render: () => (
    <TodayTaskFooter
      {...BASE}
      action="skipped"
      skippedProps={{ label: 'Пропущено' }}
    />
  ),
};

export const MenuDisabled: Story = {
  render: () => (
    <TodayTaskFooter
      {...BASE}
      isMenuDisabled
      sliderProps={{
        completedLabel: 'Label',
        onComplete: noop,
        isDisabled: true,
      }}
    />
  ),
};

/** All Figma variants stacked. */
export const AllVariants: Story = {
  render: () => (
    <Box>
      <TodayTaskFooter
        {...BASE}
        action="slider"
        sliderProps={{ completedLabel: 'Label', onComplete: noop }}
      />
      <TodayTaskFooter
        {...BASE}
        action="door"
        doorProps={{ label: 'Label', onPress: noop }}
      />
      <TodayTaskFooter
        {...BASE}
        action="skipped"
        skippedProps={{ label: 'Пропущено' }}
      />
    </Box>
  ),
};
