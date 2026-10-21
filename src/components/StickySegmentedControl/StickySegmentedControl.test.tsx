import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { StickySegmentedControl } from './StickySegmentedControl';

describe('StickySegmentedControl', () => {
  it('positions the wrapper at top and renders the segments', async () => {
    await render(
      <StickySegmentedControl
        options={['Care', 'Pet']}
        selectedIndex={0}
        onChange={jest.fn()}
        screenWidth={320}
        style={{ position: 'absolute' }}
        top={24}
        testID="sticky"
      />,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('sticky').props.style),
    ).toMatchObject({ position: 'absolute', top: 24 });
    expect(screen.getByRole('tab', { name: 'Care' })).toBeSelected();
  });

  it('forwards presses and layout', async () => {
    const onChange = jest.fn();
    const onLayout = jest.fn();
    await render(
      <StickySegmentedControl
        options={['Care', 'Pet']}
        selectedIndex={0}
        onChange={onChange}
        onLayout={onLayout}
        screenWidth={320}
        style={null}
        top={0}
        testID="sticky"
        testIDs={['tabs.care', 'tabs.pet']}
      />,
    );
    await fireEvent.press(screen.getByTestId('tabs.pet'));
    expect(onChange).toHaveBeenCalledWith(1);

    const layoutEvent = { nativeEvent: { layout: { height: 46 } } };
    await fireEvent(screen.getByTestId('sticky'), 'layout', layoutEvent);
    expect(onLayout).toHaveBeenCalledWith(layoutEvent);
  });
});
