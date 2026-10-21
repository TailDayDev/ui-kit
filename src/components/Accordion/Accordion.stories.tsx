import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';

import { Text } from '../../primitives/Text';
import { lightTheme } from '../../theme';
import { Button } from '../Button';
import { AccordionGroup, AccordionItem } from './Accordion';
import { CloseSection } from './CloseSection';

const Demo = ({
  initialOpenId = null,
  isError = false,
}: {
  initialOpenId?: string | null;
  isError?: boolean;
}) => {
  const [openId, setOpenId] = useState<string | null>(initialOpenId);
  return (
    <AccordionGroup
      openId={openId}
      setOpenIdState={setOpenId}
      style={{ gap: lightTheme.space[3] }}
    >
      <AccordionItem
        id="pet"
        isError={isError}
        collapsed={() => (
          <CloseSection label="Pet" value="Rex" emptyLabel="Not selected" />
        )}
        expanded={({ close }) => (
          <>
            <Text
              variant="headline/bold"
              style={{ paddingVertical: lightTheme.space[6] }}
            >
              Choose a pet
            </Text>
            <Button title="Done" onPress={close} />
          </>
        )}
      />
      <AccordionItem
        id="date"
        collapsed={() => (
          <CloseSection label="Date" value="" emptyLabel="Not selected" />
        )}
        expanded={({ close }) => (
          <>
            <Text
              variant="headline/bold"
              style={{ paddingVertical: lightTheme.space[6] }}
            >
              Choose a date
            </Text>
            <Button title="Done" onPress={close} />
          </>
        )}
      />
    </AccordionGroup>
  );
};

const meta = {
  title: 'Components/Accordion',
  component: AccordionGroup,
  args: {
    openId: null,
    setOpenIdState: () => undefined,
    children: null,
  },
} satisfies Meta<typeof AccordionGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = { render: () => <Demo /> };

export const Expanded: Story = { render: () => <Demo initialOpenId="pet" /> };

export const WithError: Story = { render: () => <Demo isError /> };

export const CloseSectionStates: Story = {
  render: () => (
    <>
      <CloseSection label="Pet" value="Rex" emptyLabel="Not selected" />
      <CloseSection label="Date" value="" emptyLabel="Not selected" />
      <CloseSection
        label="Notes"
        value="A very long value that is truncated at the end of the line"
      />
    </>
  ),
};
