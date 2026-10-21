import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { IconPawPrint } from '../../icons/figma';
import { Box, Icon } from '../../primitives';
import { TodayMultiPetSummary } from '../TodayMultiPetSummary';
import { TodayPetIdentity } from '../TodayPetIdentity';
import { TodayTaskDetails } from '../TodayTaskDetails';
import { TodayTaskCard } from './TodayTaskCard';

const noop = () => {};
// Story-only stand-in for the app's raster artwork (food, task type, placement).
const sampleIcon = <Icon icon={IconPawPrint} />;
const sampleSmallIcon = <Icon icon={IconPawPrint} size={16} />;

const samplePet = (
  <TodayPetIdentity
    name="Title"
    meta="Subtitle"
    avatar={{
      petPhotoUrl: 'https://picsum.photos/id/237/128/128',
      ownerFirstName: 'Rachel',
      ownerLastName: 'Lee',
      ownerPhotoUrl: 'https://picsum.photos/id/64/56/56',
    }}
    placements={{ title: 'Label', image: sampleSmallIcon }}
  />
);

const sampleDetails = (
  <TodayTaskDetails
    title="Title"
    trailing="Label"
    note="Text"
    icon={sampleIcon}
  />
);

const meta = {
  title: 'Components/TodayTaskCard',
  component: TodayTaskCard,
  args: {
    header: {
      badge: { actionType: 'Feeding', label: 'Label', icon: sampleIcon },
      time: { title: 'Title', subtitle: 'Subtitle', tone: 'default' },
    },
    pet: samplePet,
    details: sampleDetails,
    footer: {
      onMenuPress: noop,
      menuAccessibilityLabel: 'Ещё действия',
      sliderProps: { completedLabel: 'Label', onComplete: noop },
    },
    skipReason: 'Text',
  },
  decorators: [
    Story => (
      <Box background="screen" padding={4}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof TodayTaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `isFinished=false`. */
export const NotFinished: Story = {};

/** Figma `isFinished=true` (completed slider, completed time tone). */
export const Finished: Story = {
  args: {
    isFinished: true,
    header: {
      badge: { actionType: 'Feeding', label: 'Label', icon: sampleIcon },
      time: { title: 'Title', subtitle: 'Subtitle', tone: 'completed' },
    },
    footer: {
      onMenuPress: noop,
      menuAccessibilityLabel: 'Ещё действия',
      sliderProps: {
        completedLabel: 'Label',
        onComplete: noop,
        isCompleted: true,
      },
    },
  },
};

/** Skipped task: «Пропущено» footer, veil, reason above the veil. */
export const SkippedWithReason: Story = {
  args: {
    isFinished: true,
    hasSkipReason: true,
    skipReason: 'Питомец отказался от еды',
    footer: {
      action: 'skipped',
      onMenuPress: noop,
      menuAccessibilityLabel: 'Ещё действия',
      skippedProps: { label: 'Пропущено' },
    },
  },
};

/** `hasHeader=false`: the card inside the details modal. */
export const WithoutHeader: Story = { args: { hasHeader: false } };

/** `pet` swapped to `TodayMultiPetSummary`. */
export const MultiPet: Story = {
  args: {
    pet: (
      <TodayMultiPetSummary
        pets={[{ id: '1' }, { id: '2' }, { id: '3' }]}
        extraCount="+2"
        detailsLabel="Подробнее"
        onDetailsPress={noop}
      />
    ),
  },
};

/** `hasPet=false`, `hasDetails=false`. */
export const HeaderAndFooterOnly: Story = {
  args: { hasPet: false, hasDetails: false },
};

/** Both Figma variants stacked. */
export const AllVariants: Story = {
  render: args => (
    <Box gap={4}>
      <TodayTaskCard {...args} />
      <TodayTaskCard {...args} isFinished />
    </Box>
  ),
};
