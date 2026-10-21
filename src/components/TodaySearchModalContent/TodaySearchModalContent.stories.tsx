import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { IconPawPrint } from '../../icons/figma';
import { Box, Icon } from '../../primitives';
import { TodayPetIdentity } from '../TodayPetIdentity';
import { TodayTaskDetails } from '../TodayTaskDetails';
import { TodaySearchModalContent } from './TodaySearchModalContent';
import type {
  TodaySearchModalContentProps,
  TodaySearchModalContentSection,
} from './TodaySearchModalContent.types';

const noop = () => {};
// Story-only stand-in for the app's raster artwork (task type, placement).
const sampleIcon = <Icon icon={IconPawPrint} />;
const sampleSmallIcon = <Icon icon={IconPawPrint} size={16} />;

const LABELS = {
  placeholder: 'Поиск',
  initial: 'Здесь отобразятся результаты поиска',
  noResults: 'Ничего не найдено',
  clear: 'Очистить поиск',
};

const SECTIONS: TodaySearchModalContentSection[] = [
  {
    id: 'morning-2026-10-20',
    title: 'Утро — 20 октября: 1',
    tasks: [
      {
        id: 'molly-grooming',
        header: {
          badge: {
            actionType: 'AdditionalService',
            label: 'Доп. услуга',
            icon: sampleIcon,
          },
          time: { title: '10:30', subtitle: 'через 50 м' },
        },
        pet: (
          <TodayPetIdentity
            name="Molly"
            meta="Пудель"
            avatar={{
              petPhotoUrl: 'https://picsum.photos/id/1025/128/128',
              ownerFirstName: 'Rachel',
              ownerLastName: 'Lee',
            }}
            placements={{ title: 'Daycare zone 2', image: sampleSmallIcon }}
          />
        ),
        details: (
          <TodayTaskDetails
            title="Мытьё и сушка"
            hasTrailing={false}
            note="Тёплая вода, гипоаллергенный шампунь. Сушка феном на низкой температуре."
            icon={sampleIcon}
          />
        ),
        footer: {
          onMenuPress: noop,
          menuAccessibilityLabel: 'Ещё действия',
          sliderProps: { completedLabel: 'Готово!', onComplete: noop },
        },
      },
    ],
  },
];

const meta = {
  title: 'Components/TodaySearchModalContent',
  component: TodaySearchModalContent,
  args: {
    state: 'initial',
    query: '',
    onQueryChange: noop,
    labels: LABELS,
    sections: SECTIONS,
    isAutoFocused: false,
  },
  decorators: [
    Story => (
      <Box background="surface" style={{ height: 779 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof TodaySearchModalContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `state=initial`. */
export const Initial: Story = {};

/** Figma `state=results`. */
export const Results: Story = { args: { state: 'results', query: 'Text' } };

/** Figma `state=no-results`. */
export const NoResults: Story = {
  args: { state: 'no-results', query: 'Text' },
};

const InteractiveSearch = (args: TodaySearchModalContentProps) => {
  const [query, setQuery] = useState('');
  const isMatch = query.trim().toLowerCase() === 'molly';
  return (
    <TodaySearchModalContent
      {...args}
      query={query}
      onQueryChange={setQuery}
      state={query.trim() ? (isMatch ? 'results' : 'no-results') : 'initial'}
    />
  );
};

/** Type "Molly" to see results; anything else shows "nothing found". */
export const Interactive: Story = {
  render: args => <InteractiveSearch {...args} />,
};

/** All Figma states side by side (scaled to fit). */
export const AllVariants: Story = {
  render: args => (
    <Box row gap={2}>
      {(['initial', 'results', 'no-results'] as const).map(state => (
        <Box key={state} flex style={{ height: 779 }}>
          <TodaySearchModalContent
            {...args}
            state={state}
            query={state === 'initial' ? '' : 'Text'}
          />
        </Box>
      ))}
    </Box>
  ),
};
