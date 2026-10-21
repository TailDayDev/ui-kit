import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { IconPawPrint } from '../../icons/figma';
import { Box, Icon } from '../../primitives';
import { PetPickerRow } from './PetPickerRow';

const noop = () => undefined;

// Story-only stand-in for the server placement image.
const sampleImage = <Icon icon={IconPawPrint} size={16} />;

const meta = {
  title: 'Components/PetPickerRow',
  component: PetPickerRow,
  args: {
    name: 'Title',
    meta: 'Subtitle',
    placements: [
      { title: 'Label', image: sampleImage },
      { title: 'Label', image: sampleImage },
    ],
    avatar: {
      petPhotoUrl: 'https://picsum.photos/id/237/128/128',
      ownerFirstName: 'Robert',
      ownerLastName: 'Lewis',
      ownerPhotoUrl: 'https://picsum.photos/id/64/48/48',
    },
    isSelected: false,
    onPress: noop,
  },
} satisfies Meta<typeof PetPickerRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `PetPickerRow` isSelected=false. */
export const IsSelectedFalse: Story = { name: 'isSelected=false' };

/** Figma `PetPickerRow` isSelected=true. */
export const IsSelectedTrue: Story = {
  name: 'isSelected=true',
  args: { isSelected: true },
};

/** One placement, owner initials instead of a photo. */
export const OnePlacement: Story = {
  args: {
    name: 'Bella',
    meta: 'Такса',
    placements: [{ title: 'Standard Kennel', image: sampleImage }],
    avatar: {
      petPhotoUrl: 'https://picsum.photos/id/237/128/128',
      ownerFirstName: 'Robert',
      ownerLastName: 'Lewis',
    },
  },
};

/** App data today: no breed, no placement. */
export const NameOnly: Story = {
  args: { name: 'Rocky', meta: null, placements: [] },
};

export const AllVariants: Story = {
  render: args => (
    <Box gap={4}>
      <PetPickerRow {...args} isSelected={false} />
      <PetPickerRow {...args} isSelected />
    </Box>
  ),
};
