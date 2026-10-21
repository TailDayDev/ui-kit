import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { IconPawPrint } from '../../icons/figma';
import { Box, Icon } from '../../primitives';
import { TodayPetIdentity } from '../TodayPetIdentity';
import { TodayTaskDetails } from '../TodayTaskDetails';
import { MultiActionDetailsContent } from './MultiActionDetailsContent';
import type { MultiActionDetailsContentItem } from './MultiActionDetailsContent.types';

const noop = () => {};
// Story-only stand-in for the app's raster artwork (food, placement).
const sampleIcon = <Icon icon={IconPawPrint} />;
const sampleSmallIcon = <Icon icon={IconPawPrint} size={16} />;

const PETS = [
  {
    id: 'toby',
    name: 'Тоби',
    breed: 'Джек-рассел',
    placement: 'Daycare zone 1',
    food: 'Royal Canin Mini Adult',
    amount: '90 г.',
    note: 'Кормить отдельно от группы — забирает чужие порции.',
    photo: 'https://picsum.photos/id/237/128/128',
  },
  {
    id: 'mia',
    name: 'Мия',
    breed: 'Такса',
    placement: 'Standard Kennel',
    food: 'Farmina N&D Lamb & Blueberry',
    amount: '110 г.',
    photo: 'https://picsum.photos/id/1025/128/128',
  },
  {
    id: 'bublik',
    name: 'Бублик',
    breed: 'Мопс',
    placement: 'Standard Kennel',
    food: "Hill's Science Plan Small & Mini",
    amount: '85 г.',
    note: 'Только медленная миска — ест взахлёб, был случай рвоты.',
  },
  {
    id: 'daisy',
    name: 'Дейзи',
    breed: 'Корги',
    placement: 'Daycare zone 2',
    food: 'Pro Plan Medium Adult OptiHealth',
    amount: '140 г.',
    photo: 'https://picsum.photos/id/1062/128/128',
  },
];

const ITEMS: MultiActionDetailsContentItem[] = PETS.map(pet => ({
  id: pet.id,
  pet: (
    <TodayPetIdentity
      name={pet.name}
      meta={pet.breed}
      avatar={{
        petPhotoUrl: pet.photo,
        ownerFirstName: 'Rachel',
        ownerLastName: 'Lee',
      }}
      placements={{ title: pet.placement, image: sampleSmallIcon }}
    />
  ),
  details: (
    <TodayTaskDetails
      title={pet.food}
      trailing={pet.amount}
      hasNote={Boolean(pet.note)}
      note={pet.note}
      icon={sampleIcon}
    />
  ),
  footer: {
    onMenuPress: noop,
    menuAccessibilityLabel: 'Ещё действия',
    sliderProps: { completedLabel: 'Готово!', onComplete: noop },
  },
}));

const meta = {
  title: 'Components/MultiActionDetailsContent',
  component: MultiActionDetailsContent,
  args: {
    header: {
      badge: { actionType: 'Feeding', label: 'Кормление', icon: sampleIcon },
      time: { title: 'День', subtitle: '11:00 – 16:00', tone: 'default' },
    },
    items: ITEMS,
  },
  decorators: [
    Story => (
      <Box style={{ height: 1058 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof MultiActionDetailsContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `MultiActionDetailsContent` (single variant). */
export const Default: Story = {};

/** One pet finished, one skipped with a reason. */
export const MixedStatuses: Story = {
  args: {
    items: ITEMS.map((item, index) =>
      index === 1
        ? {
            ...item,
            isFinished: true,
            footer: {
              ...item.footer,
              sliderProps: {
                completedLabel: 'Готово!',
                onComplete: noop,
                isCompleted: true,
              },
            },
          }
        : index === 2
          ? {
              ...item,
              isFinished: true,
              hasSkipReason: true,
              skipReason: 'Питомец отказался от еды',
              footer: {
                action: 'skipped',
                onMenuPress: noop,
                menuAccessibilityLabel: 'Ещё действия',
                skippedProps: { label: 'Пропущено' },
              },
            }
          : item,
    ),
  },
};
