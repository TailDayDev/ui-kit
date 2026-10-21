import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives/Box';
import { TodaySkipReasonContent } from './TodaySkipReasonContent';
import type {
  TodaySkipReason,
  TodaySkipReasonContentProps,
} from './TodaySkipReasonContent.types';

const noop = () => undefined;

const toReasons = (labels: string[]): TodaySkipReason[] =>
  labels.map((label, index) => ({
    key: index === labels.length - 1 ? 'other' : `reason${index + 1}`,
    label,
  }));

const REASONS_5 = toReasons([
  'Питомец отказался от еды',
  'По указанию владельца',
  'По состоянию здоровья питомца',
  'Закончился корм питомца',
  'Другая причина',
]);
const REASONS_6 = toReasons([
  'Владелец забрал раньше',
  'Владелец сделает сам',
  'Владелец отменил услугу',
  'По состоянию питомца',
  'Услуга не оказана',
  'Другая причина',
]);
const REASONS_3 = toReasons([
  'Не потребовалось',
  'Не успели',
  'Другая причина',
]);

const meta = {
  title: 'Components/TodaySkipReasonContent',
  component: TodaySkipReasonContent,
  args: {
    title: 'Выберите причину пропуска',
    subtitle: 'Subtitle',
    reasons: REASONS_5,
    selectedReasonKey: null,
    onSelectReason: noop,
    hasOtherReason: false,
    reasonLabel: 'Коротко опишите причину',
    reasonDescription: 'Text',
    onReasonDescriptionChange: noop,
    reasonMaxLength: 130,
  },
} satisfies Meta<typeof TodaySkipReasonContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TodaySkipReasonContent` rows=5. */
export const Rows5: Story = { name: 'rows=5' };

/** Figma `TodaySkipReasonContent` rows=6. */
export const Rows6: Story = { name: 'rows=6', args: { reasons: REASONS_6 } };

/** Figma `TodaySkipReasonContent` rows=3. */
export const Rows3: Story = { name: 'rows=3', args: { reasons: REASONS_3 } };

/** Figma `TodaySkipReasonContent` hasOtherReason=true. */
export const HasOtherReason: Story = {
  name: 'hasOtherReason=true',
  args: { selectedReasonKey: 'other', hasOtherReason: true },
};

const InteractiveContent = (args: TodaySkipReasonContentProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [text, setText] = useState('');
  return (
    <TodaySkipReasonContent
      {...args}
      selectedReasonKey={selectedKey}
      onSelectReason={setSelectedKey}
      hasOtherReason={selectedKey === 'other'}
      reasonDescription={text}
      onReasonDescriptionChange={setText}
      reasonPlaceholder="Text"
    />
  );
};

/** Pick "Другая причина" to open the field (app behaviour). */
export const Interactive: Story = {
  render: args => <InteractiveContent {...args} />,
};

export const AllVariants: Story = {
  render: args => (
    <Box gap={6}>
      <TodaySkipReasonContent {...args} reasons={REASONS_5} />
      <TodaySkipReasonContent {...args} reasons={REASONS_6} />
      <TodaySkipReasonContent {...args} reasons={REASONS_3} />
    </Box>
  ),
};
