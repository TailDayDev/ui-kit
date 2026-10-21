import { useState } from 'react';
import { View } from 'react-native';
import { act, render } from '@testing-library/react-native';

import {
  getModalLayers,
  ModalLayerBackground,
  ModalLayerMotionContext,
  ModalLayerTestRoot,
  resetModalLayersForTests,
} from '../ModalLayer';
import { findHostViews } from './__fixtures__/modalTestUtils';
import { CustomModal } from './CustomModal';

const SHEET_HEIGHT = 400;
const ANIMATED_MOTION = { isReducedMotion: false };

type NestedPlacement = 'children' | 'nestedOverlays';

const renderParentWithNested = async (placement: NestedPlacement) => {
  const onParentDismissed = jest.fn();
  const onNestedDismissed = jest.fn();
  let setParentVisible: (isVisible: boolean) => void = () => undefined;
  let setNestedVisible: (isVisible: boolean) => void = () => undefined;

  const Owner = () => {
    const [isParentVisible, updateParentVisible] = useState(false);
    const [isNestedVisible, updateNestedVisible] = useState(false);
    setParentVisible = updateParentVisible;
    setNestedVisible = updateNestedVisible;

    const nested = (
      <CustomModal
        onClose={() => updateNestedVisible(false)}
        onDismissed={onNestedDismissed}
        title="nested"
        visible={isNestedVisible}
      >
        <View testID="nested.content" />
      </CustomModal>
    );

    return (
      <CustomModal
        nestedOverlays={placement === 'nestedOverlays' ? nested : undefined}
        onClose={() => updateParentVisible(false)}
        onDismissed={onParentDismissed}
        title="parent"
        visible={isParentVisible}
      >
        <View testID="parent.content">
          {placement === 'children' ? nested : null}
        </View>
      </CustomModal>
    );
  };

  const result = await render(
    <ModalLayerMotionContext.Provider value={ANIMATED_MOTION}>
      <ModalLayerBackground>
        <Owner />
      </ModalLayerBackground>
    </ModalLayerMotionContext.Provider>,
    { wrapper: ModalLayerTestRoot },
  );

  const layoutTopSheet = async () => {
    const surface = findHostViews('custom-modal-swipe-surface').at(-1);
    await act(() => {
      surface?.props.onLayout({
        nativeEvent: { layout: { height: SHEET_HEIGHT } },
      });
    });
  };
  const finishAnimations = async () => {
    await act(() => {
      jest.runAllTimers();
    });
  };

  return {
    finishAnimations,
    onNestedDismissed,
    onParentDismissed,
    openBoth: async () => {
      await act(() => setParentVisible(true));
      await layoutTopSheet();
      await finishAnimations();
      await act(() => setNestedVisible(true));
      await layoutTopSheet();
      await finishAnimations();
    },
    phases: () => getModalLayers().map(layer => layer.phase),
    closeParentOnly: () => act(() => setParentVisible(false)),
    unmount: result.unmount,
  };
};

describe('CustomModal nested in another CustomModal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    await act(() => {
      resetModalLayersForTests();
    });
    jest.useRealTimers();
  });

  it.each<NestedPlacement>(['children', 'nestedOverlays'])(
    'leaves with its parent and reports onDismissed (declared in %s)',
    async placement => {
      const stack = await renderParentWithNested(placement);
      await stack.openBoth();
      expect(stack.phases()).toEqual(['open', 'open']);

      // The owner hides only the parent; the nested modal must not stay on
      // top, frozen visible by the leaving parent.
      await stack.closeParentOnly();
      expect(stack.phases()).toEqual(['exiting', 'exiting']);

      await stack.finishAnimations();

      expect(stack.phases()).toEqual([]);
      expect(stack.onParentDismissed).toHaveBeenCalledTimes(1);
      expect(stack.onNestedDismissed).toHaveBeenCalledTimes(1);
      await stack.unmount();
    },
  );

  it('draws a modal declared inside the parent as a layer above it', async () => {
    const stack = await renderParentWithNested('children');
    await stack.openBoth();

    const layers = findHostViews('modal-layer');
    expect(layers).toHaveLength(2);
    // The nested content lives in the top layer, not inside the parent's.
    expect(
      layers[1]?.queryAll(node => node.props.testID === 'nested.content'),
    ).toHaveLength(1);
    expect(
      layers[0]?.queryAll(node => node.props.testID === 'nested.content'),
    ).toHaveLength(0);
    await stack.unmount();
  });
});
