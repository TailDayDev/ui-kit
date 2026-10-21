import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { IconPawPrint } from '../../icons/figma';
import { Box, Icon } from '../../primitives';
import { TodayPetIdentity } from './TodayPetIdentity';

// Story-only stand-in for the server placement image.
const sampleImage = <Icon icon={IconPawPrint} size={16} />;

const meta = {
  title: 'Components/TodayPetIdentity',
  component: TodayPetIdentity,
  args: {
    name: 'Title',
    meta: 'Subtitle',
    hasPlacements: true,
    avatar: {
      petPhotoUrl: 'https://picsum.photos/id/237/128/128',
      ownerFirstName: 'Rachel',
      ownerLastName: 'Lee',
      ownerPhotoUrl: 'https://picsum.photos/id/64/56/56',
    },
    placements: { title: 'Label', image: sampleImage },
  },
  decorators: [
    Story => (
      <Box background="surface">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof TodayPetIdentity>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TodayPetIdentity` (hasPlacements=true). */
export const Default: Story = {};

/** Figma hasPlacements=false (check-in before the pet is placed). */
export const WithoutPlacements: Story = { args: { hasPlacements: false } };

export const TwoPlacements: Story = {
  args: {
    placements: {
      itemsCount: 2,
      title: 'Room 12',
      image: sampleImage,
      secondTitle: 'Playground',
      secondImage: sampleImage,
    },
  },
};

export const Interactive: Story = {
  args: { onPress: () => undefined, accessibilityLabel: 'Open profile' },
};

export const LongTexts: Story = {
  args: {
    name: 'Sir Barkington the Third of Riverside Kennels',
    meta: 'Border Collie mix, 4 years, 18 kg, very friendly',
  },
};
