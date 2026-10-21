import { useState, type ReactNode } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box, Text } from '../../primitives';
import { Button } from '../Button';
import { getTodayKey } from '../CustomCalendar/calendarDates';
import { CustomModalProvider } from '../CustomModal';
import { ModalLayerRoot } from '../ModalLayer';
import { CalendarModal } from './CalendarModal';
import type {
  CalendarDateRange,
  CalendarModalProps,
} from './CalendarModal.types';
import { addDays } from './calendarModalDates';

/** iPhone Pro Max frame, as in the CustomModal stories. */
const FRAME = { width: 430, height: 900 };
const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TODAY = getTodayKey();

const Frame = ({ children }: { children: ReactNode }) => (
  <View style={FRAME}>
    <ModalLayerRoot>
      <CustomModalProvider closeAccessibilityLabel="Close">
        {children}
      </CustomModalProvider>
    </ModalLayerRoot>
  </View>
);

type DemoProps = Pick<
  CalendarModalProps,
  'bookedDates' | 'initialSelected' | 'selectionMode'
>;

const Demo = ({ bookedDates, initialSelected, selectionMode }: DemoProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [saved, setSaved] = useState<CalendarDateRange>(initialSelected);
  return (
    <Frame>
      <Box gap={4} padding={6}>
        <Text>
          {saved.startDate ?? '—'} → {saved.endDate ?? '—'}
        </Text>
        <Button title="Open calendar" onPress={() => setIsVisible(true)} />
      </Box>
      <CalendarModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onSave={(startDate, endDate) => {
          setSaved({ startDate, endDate });
          setIsVisible(false);
        }}
        bookedDates={bookedDates}
        initialSelected={saved}
        selectionMode={selectionMode}
        title="Select dates"
        resetLabel="Reset"
        saveLabel="Save"
        weekDayLabels={WEEK_DAYS}
      />
    </Frame>
  );
};

const meta: Meta<typeof Demo> = {
  title: 'Components/CalendarModal',
  component: Demo,
  args: {
    bookedDates: [],
    initialSelected: {},
    selectionMode: 'range',
  },
};

export default meta;

type Story = StoryObj<typeof Demo>;

/** Nothing picked yet: Save is disabled. */
export const Empty: Story = {};

/** A picked stay with a range fill between start and end. */
export const Range: Story = {
  args: {
    initialSelected: {
      startDate: addDays(TODAY, 3),
      endDate: addDays(TODAY, 8),
    },
  },
};

/** Booked days are struck out; a range across them is refused. */
export const WithBookedDates: Story = {
  args: {
    bookedDates: [addDays(TODAY, 10), addDays(TODAY, 11), addDays(TODAY, 12)],
    initialSelected: { startDate: addDays(TODAY, 3) },
  },
};

/** One day; past days stay selectable. */
export const Single: Story = {
  args: {
    selectionMode: 'single',
    initialSelected: { startDate: TODAY, endDate: TODAY },
  },
};
