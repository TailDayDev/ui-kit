import { StyleSheet, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ConfirmationModalContent } from './ConfirmationModalContent';

describe('ConfirmationModalContent', () => {
  it('renders the Figma frame: padding 0/24/24/24, gap 32, centered texts', async () => {
    await render(
      <ConfirmationModalContent
        testID="content"
        title="Title"
        description="Text"
        illustration={<View testID="picture" />}
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('content').props.style),
    ).toMatchObject({
      paddingHorizontal: 24,
      paddingBottom: 24,
      gap: 32,
      alignItems: 'center',
    });
    expect(
      StyleSheet.flatten(
        screen.getByRole('header', { name: 'Title' }).props.style,
      ),
    ).toMatchObject({
      ...lightTheme.typography.title.bold,
      color: lightTheme.colors.text.primary,
      textAlign: 'center',
    });
    expect(
      StyleSheet.flatten(screen.getByText('Text').props.style),
    ).toMatchObject({
      ...lightTheme.typography.caption.regular,
      color: lightTheme.colors.text.secondary,
      textAlign: 'center',
    });
    const frame = screen.getByTestId('picture').parent;
    expect(StyleSheet.flatten(frame?.props.style)).toMatchObject({
      width: 100,
      height: 100,
      borderRadius: 8,
      overflow: 'hidden',
    });
  });

  it('hides the description when hasDescription is false', async () => {
    await render(
      <ConfirmationModalContent
        title="Title"
        description="Text"
        hasDescription={false}
      />,
    );
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.queryByText('Text')).toBeNull();
  });

  it('renders no picture frame without an illustration', async () => {
    await render(<ConfirmationModalContent testID="content" title="Title" />);
    expect(screen.getByTestId('content').children).toHaveLength(1);
  });
});
