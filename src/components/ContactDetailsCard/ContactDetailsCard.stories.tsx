import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Text } from '../../primitives/Text';
import { Button } from '../Button';
import { ContactDetailsCard } from './ContactDetailsCard';
import type {
  ContactDetailsCardContentProps,
  ContactDetailsRow,
} from './ContactDetailsCard.types';

const ROWS: ContactDetailsRow[] = [
  { id: 'phone', label: 'Phone', value: '+373 60 112 233' },
  { id: 'email', label: 'Email', value: 'owner@example.com' },
  {
    id: 'address',
    label: 'Address',
    value: 'Strada Ștefan cel Mare 123, Chișinău',
    description: 'Ring the bell twice',
    isValueNarrow: true,
  },
];

/** Rows mode as a single props shape, so Storybook controls can type the args. */
const RowsCard = (props: ContactDetailsCardContentProps) => (
  <ContactDetailsCard {...props} />
);

const meta = {
  title: 'Components/ContactDetailsCard',
  component: RowsCard,
  args: {
    title: 'Owner contacts',
    emptyText: 'No contacts added',
    rows: ROWS,
    withShadow: false,
  },
} satisfies Meta<typeof RowsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rows: Story = {};

export const Empty: Story = { args: { rows: [] } };

export const Message: Story = {
  render: ({ title, withShadow }) => (
    <ContactDetailsCard
      title={title}
      withShadow={withShadow}
      message="Contacts are hidden for your role"
    />
  ),
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: <Text variant="headline/medium">Maria Popescu</Text>,
    hasHeaderDivider: true,
    footer: <Button title="Call" onPress={() => undefined} />,
  },
};

export const Pressable: Story = {
  args: { withShadow: true, onPress: () => undefined },
};

export const Disabled: Story = {
  args: { withShadow: true, disabled: true, onPress: () => undefined },
};

export const TappableValues: Story = {
  args: {
    rows: ROWS.map(row => ({ ...row, onValuePress: () => undefined })),
  },
};
