import { useState, type ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { DateRangeField } from './DateRangeField';
import type {
  DateRangeFieldEditorController,
  DateRangeFieldRowConfig,
  DateRangeValue,
} from './DateRangeField.types';

const VALUE: DateRangeValue = {
  startDate: '2026-06-01',
  endDate: '2026-09-01',
};

const formatDate = (value: string | null) =>
  value ? value.split('-').reverse().join('.') : 'Not set';

/** Story editor: a stand-in for the app wheel/calendar sheet. */
const renderEditor = (controller: DateRangeFieldEditorController) =>
  controller.activeField ? (
    <View style={styles.editor}>
      <Text>Editing {controller.activeField}</Text>
      <TouchableOpacity
        onPress={() =>
          controller.commit({
            ...controller.draftValue,
            [controller.activeField === 'start' ? 'startDate' : 'endDate']:
              '2026-12-31',
          })
        }
      >
        <Text>Set 2026-12-31</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={controller.cancel}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  ) : null;

/** Uncontrolled props only: the controlled/uncontrolled union does not fit Storybook args. */
interface StoryFieldProps {
  defaultValue?: DateRangeValue;
  start: DateRangeFieldRowConfig;
  end: DateRangeFieldRowConfig;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  renderEditor?: (controller: DateRangeFieldEditorController) => ReactNode;
}

const StoryField = (props: StoryFieldProps) => <DateRangeField {...props} />;

const meta = {
  title: 'Components/DateRangeField',
  component: StoryField,
  args: {
    defaultValue: VALUE,
    start: { label: 'Start date', formatValue: formatDate },
    end: { label: 'End date', formatValue: formatDate },
  },
  decorators: [
    Story => (
      <View style={{ width: 343 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof StoryField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { defaultValue: { startDate: null, endDate: null } },
};

export const Disabled: Story = { args: { isDisabled: true } };

export const OneRowDisabled: Story = {
  args: {
    end: { label: 'End date', formatValue: formatDate, isDisabled: true },
  },
};

export const ReadOnly: Story = { args: { isReadOnly: true } };

export const WithEditor: Story = { args: { renderEditor } };

const ControlledField = () => {
  const [value, setValue] = useState(VALUE);
  return (
    <DateRangeField
      value={value}
      onValueChange={setValue}
      start={{
        label: 'Treatment date',
        displayValue: formatDate(value.startDate),
      }}
      end={{ label: 'Valid until', displayValue: formatDate(value.endDate) }}
      renderEditor={renderEditor}
    />
  );
};

export const Controlled: Story = { render: () => <ControlledField /> };

const styles = StyleSheet.create({
  editor: { gap: 8, padding: 16 },
});
