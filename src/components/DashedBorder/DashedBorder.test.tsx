import { StyleSheet, Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { DashedBorder } from './DashedBorder';

describe('DashedBorder', () => {
  it('renders its children inside a box of the given size', async () => {
    await render(
      <DashedBorder width={100} height={56} borderRadius={16}>
        <Text>Add</Text>
      </DashedBorder>,
    );
    expect(screen.getByText('Add')).toBeTruthy();
  });

  it('applies the content style over the centered defaults', async () => {
    await render(
      <DashedBorder
        width={100}
        height={56}
        style={{ alignItems: 'flex-start' }}
      >
        <Text testID="child">Add</Text>
      </DashedBorder>,
    );
    // The content box is the nearest ancestor with `flex: 1`.
    let node = screen.getByTestId('child').parent;
    while (node && StyleSheet.flatten(node.props.style)?.flex !== 1) {
      node = node.parent;
    }
    const style = StyleSheet.flatten(node?.props.style);
    expect(style).toMatchObject({
      alignItems: 'flex-start',
      justifyContent: 'center',
      borderRadius: 8,
    });
  });
});
