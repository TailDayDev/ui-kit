import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box, Text } from '../../primitives';
import { Button } from './Button';
import type { ButtonSize, ButtonStyle } from './Button.types';

const STYLES: ButtonStyle[] = [
  'default',
  'light',
  'danger',
  'dangerSimple',
  'secondary',
  'green',
  'softGray',
  'transparent',
  'edit',
  'link',
  'main',
];
const SIZES: ButtonSize[] = ['extraSmall', 'small', 'medium', 'large'];

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    title: 'Сохранить',
    onPress: () => {},
    style: 'default',
    size: 'medium',
    disabled: false,
    loading: false,
  },
  argTypes: {
    style: { control: 'select', options: STYLES },
    size: { control: 'select', options: SIZES },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma `Button`: default / light / red (`danger`). */
export const FigmaStyles: Story = {
  render: args => (
    <Box gap={3}>
      <Button {...args} style="default" />
      <Button {...args} style="light" />
      <Button {...args} style="danger" title="Удалить" />
    </Box>
  ),
};

export const AllStyles: Story = {
  render: args => (
    <Box gap={3}>
      {STYLES.map(style => (
        <Box key={style} gap={1}>
          <Text variant="caption/regular" color="secondary">
            {style}
          </Text>
          <Button {...args} style={style} />
        </Box>
      ))}
    </Box>
  ),
};

export const Sizes: Story = {
  render: args => (
    <Box gap={3}>
      {SIZES.map(size => (
        <Button key={size} {...args} size={size} title={size} />
      ))}
    </Box>
  ),
};

export const States: Story = {
  render: args => (
    <Box gap={3}>
      <Button {...args} title="Default" />
      <Button {...args} title="Disabled" disabled />
      <Button {...args} title="Loading" loading />
      <Button {...args} title="Light loading" style="light" loading />
      <Button {...args} title="Rounded" isRounded />
    </Box>
  ),
};

export const WithIcon: Story = {
  render: args => (
    <Box gap={3}>
      <Button {...args} icon={<Text color="inverse">+</Text>} />
      <Button
        {...args}
        icon={<Text color="inverse">→</Text>}
        iconPosition="right"
      />
      <Button
        {...args}
        title=""
        accessibilityLabel="Добавить"
        icon={<Text color="inverse">+</Text>}
      />
    </Box>
  ),
};
