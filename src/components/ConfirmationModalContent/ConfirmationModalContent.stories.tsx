import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { StyleSheet, View } from 'react-native';

import { IconTrash2 } from '../../icons/figma';
import { Icon } from '../../primitives/Icon';
import { lightTheme } from '../../theme';
import { ConfirmationModalContent } from './ConfirmationModalContent';

// Story stand-in for the app's trash picture (the kit never loads images).
const PLACEHOLDER_GLYPH_SIZE = 48;
const placeholderStyles = StyleSheet.create({
  picture: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: lightTheme.colors.bg.subtle,
    flex: 1,
    justifyContent: 'center',
  },
});

const illustration = (
  <View style={placeholderStyles.picture}>
    <Icon icon={IconTrash2} size={PLACEHOLDER_GLYPH_SIZE} />
  </View>
);

const meta = {
  title: 'Components/ConfirmationModalContent',
  component: ConfirmationModalContent,
  args: {
    title: 'Title',
    description: 'Text',
    hasDescription: true,
    illustration,
  },
} satisfies Meta<typeof ConfirmationModalContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `ConfirmationModalContent` hasDescription=true. */
export const Default: Story = {};

/** Figma `ConfirmationModalContent` hasDescription=false. */
export const WithoutDescription: Story = { args: { hasDescription: false } };

export const WithoutIllustration: Story = {
  args: { illustration: undefined },
};

export const LongTexts: Story = {
  args: {
    title: 'Delete this booking from the calendar?',
    description:
      'The pet owner will not be notified. This action cannot be undone.',
  },
};
