import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { IconPawPrint } from '../../icons/figma';
import { Icon } from '../../primitives';
import { TodayManualPetPickerContent } from './TodayManualPetPickerContent';
import type {
  TodayManualPetPickerContentProps,
  TodayManualPetPickerPet,
} from './TodayManualPetPickerContent.types';

const noop = () => undefined;

// Story-only stand-ins for the server images.
const kennelImage = <Icon icon={IconPawPrint} size={16} />;
const avatar = {
  petPhotoUrl: 'https://picsum.photos/id/237/128/128',
  ownerFirstName: 'Robert',
  ownerLastName: 'Lewis',
  ownerPhotoUrl: 'https://picsum.photos/id/64/48/48',
};
const KENNEL = { title: 'Standard Kennel', image: kennelImage };
const DAYCARE = { title: 'Daycare zone 1', image: kennelImage };

const PETS: TodayManualPetPickerPet[] = [
  {
    id: 'rocky',
    name: 'Rocky',
    meta: 'Джек-рассел',
    placements: [KENNEL, DAYCARE],
    avatar,
  },
  { id: 'bella', name: 'Bella', meta: 'Такса', placements: [KENNEL], avatar },
  {
    id: 'cooper',
    name: 'Cooper',
    meta: 'Хаски',
    placements: [KENNEL, DAYCARE],
    avatar,
  },
  { id: 'molly', name: 'Molly', meta: 'Пудель', placements: [KENNEL], avatar },
  {
    id: 'daisy',
    name: 'Daisy',
    meta: 'Корги',
    placements: [KENNEL, DAYCARE],
    avatar,
  },
];

const meta = {
  title: 'Components/TodayManualPetPickerContent',
  component: TodayManualPetPickerContent,
  args: {
    pets: PETS,
    selectedId: 'rocky',
    onSelect: noop,
    noneLabel: 'Без питомца',
    accessibilityLabel: 'Выберите питомца',
  },
} satisfies Meta<typeof TodayManualPetPickerContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TodayManualPetPickerContent` (Rocky selected). */
export const Default: Story = {};

/** "No pet" selected. */
export const NoPet: Story = { args: { selectedId: null } };

const InteractiveContent = (args: TodayManualPetPickerContentProps) => {
  const [selectedId, setSelectedId] = useState(args.selectedId);
  return (
    <TodayManualPetPickerContent
      {...args}
      selectedId={selectedId}
      onSelect={setSelectedId}
    />
  );
};

/** Tap a row to move the selection. */
export const Interactive: Story = {
  render: args => <InteractiveContent {...args} />,
};
