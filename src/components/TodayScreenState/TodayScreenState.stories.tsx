import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { StyleSheet, View } from 'react-native';

import { lightTheme } from '../../theme';
import { TodayScreenState } from './TodayScreenState';
import type { TodayScreenStateProps } from './TodayScreenState.types';

const noop = () => undefined;
// Story canvas: the 398pt preview width.
const CANVAS_WIDTH = 398;
const ALL_VARIANTS_GAP = 48;

// Story stand-in for the app pictures (the kit never loads images).
const placeholderStyles = StyleSheet.create({
  picture: {
    alignSelf: 'stretch',
    backgroundColor: lightTheme.colors.bg.accentSoft,
    borderRadius: lightTheme.radius.lg,
    flex: 1,
  },
});
const illustration = <View style={placeholderStyles.picture} />;

/** Figma sample texts per variant. */
const SAMPLES: Record<
  'no-auth' | 'no-hotel' | 'empty' | 'no-results',
  Pick<TodayScreenStateProps, 'title' | 'description' | 'actionLabel'>
> = {
  'no-auth': {
    title: 'Войдите, чтобы продолжить',
    description: 'На этом экране появятся задачи на сегодня.',
    actionLabel: 'Войти',
  },
  'no-hotel': {
    title: 'Создайте первую гостиницу',
    description: 'Задачи дня появятся,\nкогда будет гостиница.',
    actionLabel: 'Создать гостиницу',
  },
  empty: {
    title: 'Все задачи выполнены',
    description: 'День закрыт. Ниже — что сделано.',
  },
  'no-results': {
    title: 'К сожалению,\nничего не найдено',
    description: 'Попробуйте другой запрос\nили снимите фильтр.',
    actionLabel: 'Сбросить',
  },
};

const meta = {
  title: 'Components/TodayScreenState',
  component: TodayScreenState,
  args: {
    kind: 'no-auth',
    illustration,
    onAction: noop,
    label: 'Label',
    ...SAMPLES['no-auth'],
  },
  decorators: [
    Story => (
      <View style={{ width: CANVAS_WIDTH }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TodayScreenState>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma kind=no-auth. */
export const NoAuth: Story = {};

/** Figma kind=no-hotel. */
export const NoHotel: Story = {
  args: { kind: 'no-hotel', ...SAMPLES['no-hotel'] },
};

/** Figma kind=empty. */
export const Empty: Story = {
  args: { kind: 'empty', actionLabel: undefined, ...SAMPLES.empty },
};

/** Figma kind=no-results. */
export const NoResults: Story = {
  args: { kind: 'no-results', ...SAMPLES['no-results'] },
};

/** Figma kind=offline. */
export const Offline: Story = { args: { kind: 'offline' } };

export const AllVariants: Story = {
  render: args => (
    <View style={{ gap: ALL_VARIANTS_GAP }}>
      <TodayScreenState {...args} kind="no-auth" {...SAMPLES['no-auth']} />
      <TodayScreenState {...args} kind="no-hotel" {...SAMPLES['no-hotel']} />
      <TodayScreenState {...args} kind="empty" {...SAMPLES.empty} />
      <TodayScreenState
        {...args}
        kind="no-results"
        {...SAMPLES['no-results']}
      />
      <TodayScreenState {...args} kind="offline" />
    </View>
  ),
};
