import { StyleSheet, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { NoImagePlaceholder } from './NoImagePlaceholder';

describe('NoImagePlaceholder', () => {
  it('fills the parent by default', async () => {
    await render(<NoImagePlaceholder testID="placeholder" />);
    const style = StyleSheet.flatten(
      screen.getByTestId('placeholder', { includeHiddenElements: true }).props
        .style,
    );
    expect(style).toMatchObject({ width: '100%', height: '100%' });
  });

  it('sizes the frame and hands size and color to renderImage', async () => {
    const renderImage = jest.fn(() => <View testID="artwork" />);
    await render(
      <NoImagePlaceholder
        testID="placeholder"
        size={40}
        color="#828282"
        renderImage={renderImage}
      />,
    );
    expect(renderImage).toHaveBeenCalledWith({ size: 40, color: '#828282' });
    expect(
      screen.getByTestId('artwork', { includeHiddenElements: true }),
    ).toBeTruthy();
    expect(
      StyleSheet.flatten(
        screen.getByTestId('placeholder', { includeHiddenElements: true }).props
          .style,
      ),
    ).toMatchObject({ width: 40, height: 40 });
  });

  it('is decorative unless labelled', async () => {
    await render(<NoImagePlaceholder />);
    expect(screen.queryByRole('image')).toBeNull();
  });

  it('is an image with a label when labelled', async () => {
    await render(<NoImagePlaceholder accessibilityLabel="No photo" />);
    expect(screen.getByRole('image', { name: 'No photo' })).toBeTruthy();
  });
});
