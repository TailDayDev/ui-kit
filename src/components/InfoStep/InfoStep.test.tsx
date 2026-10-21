import { StyleSheet, Text as RNText } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { InfoStep } from './InfoStep';

// Jest's react-native preset reports a 750×1334 window.
const WINDOW = { width: 750, height: 1334 };
const CHROME = 310;
const PADDING = 24;

describe('InfoStep', () => {
  it('renders stage, title and description with the app text styles', async () => {
    await render(
      <InfoStep
        stage="Step 1"
        title="Check in pets"
        description="Scan the QR code at the door"
        renderImage={() => null}
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByText('Step 1').props.style),
    ).toMatchObject(lightTheme.typography.body.bold);
    expect(
      StyleSheet.flatten(screen.getByText('Check in pets').props.style),
    ).toMatchObject(lightTheme.typography.largeTitle.semibold);
    expect(
      StyleSheet.flatten(
        screen.getByText('Scan the QR code at the door').props.style,
      ),
    ).toMatchObject({
      ...lightTheme.typography.caption.regular,
      color: lightTheme.colors.text.secondary,
    });
  });

  it('sizes the image to the free space and shrinks it after the texts lay out', async () => {
    const renderImage = jest.fn((size: number) => (
      <RNText testID="image">{size}</RNText>
    ));
    await render(
      <InfoStep
        stage="Step 1"
        title="Title"
        description="Text"
        renderImage={renderImage}
      />,
    );
    const free = (bottom: number) =>
      Math.min(
        WINDOW.height - CHROME - bottom - PADDING,
        WINDOW.width - 2 * PADDING,
      );
    expect(renderImage).toHaveBeenLastCalledWith(free(0));

    const bottom = screen.getByText('Step 1').parent;
    if (!bottom) {
      throw new Error('texts container not rendered');
    }
    await fireEvent(bottom, 'layout', {
      nativeEvent: { layout: { height: 400 } },
    });
    expect(renderImage).toHaveBeenLastCalledWith(free(400));
  });
});
