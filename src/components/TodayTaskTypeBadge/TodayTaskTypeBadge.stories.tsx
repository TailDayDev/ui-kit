import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { IconPawPrint } from '../../icons/figma';
import { Box, Icon } from '../../primitives';
import { TodayTaskTypeBadge } from './TodayTaskTypeBadge';
import type { TodayTaskActionType } from './TodayTaskTypeBadge.types';

const ACTION_TYPES: TodayTaskActionType[] = [
  'CheckIn',
  'CheckOut',
  'Feeding',
  'Medication',
  'AdditionalService',
  'Manual',
  'Transfer',
];

// Story-only stand-in for the app's raster task-type artwork.
const sampleIcon = <Icon icon={IconPawPrint} />;

const meta = {
  title: 'Components/TodayTaskTypeBadge',
  component: TodayTaskTypeBadge,
  args: {
    actionType: 'CheckIn',
    label: 'Label',
    icon: sampleIcon,
    hasCareType: false,
    careType: 'Label',
    hasSecondCareType: false,
    secondCareType: 'Label',
  },
  argTypes: {
    actionType: { control: 'select', options: ACTION_TYPES },
  },
} satisfies Meta<typeof TodayTaskTypeBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma actionType=CheckIn. */
export const CheckIn: Story = {};
/** Figma actionType=CheckOut. */
export const CheckOut: Story = { args: { actionType: 'CheckOut' } };
/** Figma actionType=Feeding. */
export const Feeding: Story = { args: { actionType: 'Feeding' } };
/** Figma actionType=Medication. */
export const Medication: Story = { args: { actionType: 'Medication' } };
/** Figma actionType=AdditionalService. */
export const AdditionalService: Story = {
  args: { actionType: 'AdditionalService' },
};
/** Figma actionType=Manual. */
export const Manual: Story = { args: { actionType: 'Manual' } };
/** Figma actionType=Transfer. */
export const Transfer: Story = { args: { actionType: 'Transfer' } };

/** Check-in with two care types (Figma hasCareType + hasSecondCareType). */
export const WithCareTypes: Story = {
  args: {
    label: 'Check-in',
    hasCareType: true,
    careType: 'Boarding',
    hasSecondCareType: true,
    secondCareType: 'Grooming with a very long name',
    style: { maxWidth: 300 },
  },
};

export const AllVariants: Story = {
  render: args => (
    <Box gap={3}>
      {ACTION_TYPES.map(actionType => (
        <TodayTaskTypeBadge
          key={actionType}
          {...args}
          actionType={actionType}
        />
      ))}
    </Box>
  ),
};
