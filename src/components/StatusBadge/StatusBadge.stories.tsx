import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';

import { CheckIcon } from '../../icons/CheckIcon';
import { lightTheme } from '../../theme';
import { StatusBadge } from './StatusBadge';
import type { StatusBadgeLayout, StatusBadgeTone } from './StatusBadge.types';

const TONES: StatusBadgeTone[] = ['success', 'danger', 'warning', 'neutral'];
const LAYOUTS: StatusBadgeLayout[] = ['inline', 'fullWidth', 'iconOnly'];

const meta = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  args: { label: 'Given', tone: 'success', layout: 'inline' },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Danger: Story = { args: { label: 'Overdue', tone: 'danger' } };

export const Warning: Story = {
  args: { label: 'Expiring soon', tone: 'warning' },
};

export const Neutral: Story = { args: { label: 'Inactive', tone: 'neutral' } };

export const IconLeft: Story = {
  args: { label: 'Overdue', tone: 'danger', iconPosition: 'left' },
};

export const AllTonesAndLayouts: Story = {
  render: () => (
    <View style={{ gap: lightTheme.space[3] }}>
      {LAYOUTS.map(layout => (
        <View
          key={layout}
          style={{ flexDirection: 'row', gap: lightTheme.space[2] }}
        >
          {TONES.map(tone => (
            <View key={tone} style={{ flex: layout === 'fullWidth' ? 1 : 0 }}>
              <StatusBadge label={tone} tone={tone} layout={layout} />
            </View>
          ))}
        </View>
      ))}
    </View>
  ),
};

/** Deprecated API: explicit colors and icon. */
export const Legacy: Story = {
  args: {
    label: 'Manual',
    tone: undefined,
    backgroundColor: lightTheme.palette.manualBadgeBackground,
    textColor: lightTheme.palette.manualBadgeForeground,
    icon: (
      <CheckIcon size={14} color={lightTheme.palette.manualBadgeForeground} />
    ),
  },
};
