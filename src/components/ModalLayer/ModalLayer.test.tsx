import { createContext, useContext, type ReactNode } from 'react';
import { BackHandler, Text, View } from 'react-native';
import { act, render, screen } from '@testing-library/react-native';

import {
  addHardwareBackPressListener,
  dispatchModalLayerBack,
  getModalLayers,
  ModalLayerPortal,
  ModalLayerRoot,
  ModalLayerTestRoot,
  resetModalLayersForTests,
  setModalLayerBackHandler,
  useModalLayerFrame,
  useModalLayerPosition,
  type ModalLayerPhase,
} from '.';

const DeclarationContext = createContext('missing');

const ContextValue = () => <Text>{useContext(DeclarationContext)}</Text>;

interface IPortalProps {
  id: string;
  phase: ModalLayerPhase;
  children?: ReactNode;
}

const Portal = ({ id, phase, children }: IPortalProps) => (
  <ModalLayerPortal getPhase={() => phase} id={id} phase={phase}>
    {children ?? <View testID={`${id}.content`} />}
  </ModalLayerPortal>
);

const findHostViews = (testID: string) =>
  screen.container.queryAll(node => node.props.testID === testID);

describe('ModalLayer', () => {
  afterEach(async () => {
    await act(() => {
      resetModalLayersForTests();
    });
  });

  it('renders the app content and no layer while nothing is open', async () => {
    await render(
      <ModalLayerRoot>
        <Text>App</Text>
      </ModalLayerRoot>,
    );

    expect(screen.getByText('App')).toBeTruthy();
    expect(findHostViews('modal-layer')).toHaveLength(0);
  });

  it('draws the overlay above the layers', async () => {
    await render(
      <ModalLayerRoot overlay={<Text>Done bar</Text>}>
        <Text>App</Text>
      </ModalLayerRoot>,
    );

    expect(screen.getByText('Done bar')).toBeTruthy();
  });

  it('draws portal content in the host with the declaration-site context', async () => {
    await render(
      <ModalLayerRoot>
        <DeclarationContext.Provider value="from-screen">
          <Portal id="a" phase="open">
            <ContextValue />
          </Portal>
        </DeclarationContext.Provider>
      </ModalLayerRoot>,
    );

    const [layer] = findHostViews('modal-layer');
    expect(layer).toBeDefined();
    expect(screen.getByText('from-screen')).toBeTruthy();
    // The background is hidden from screen readers under an open layer.
    expect(
      findHostViews('modal-layer-background')[0]?.props
        .accessibilityElementsHidden,
    ).toBe(true);
  });

  it('removes a closed layer and keeps touches off a leaving one', async () => {
    const { rerender } = await render(<Portal id="a" phase="open" />, {
      wrapper: ModalLayerTestRoot,
    });
    expect(findHostViews('modal-layer')[0]?.props.pointerEvents).toBe(
      'box-none',
    );

    await rerender(<Portal id="a" phase="exiting" />);
    expect(findHostViews('modal-layer')[0]?.props.pointerEvents).toBe('none');

    await rerender(<></>);
    expect(getModalLayers()).toHaveLength(0);
  });

  it('reports the position of each layer', async () => {
    let positions: string[] = [];
    const Positions = () => {
      const a = useModalLayerPosition('a');
      const b = useModalLayerPosition('b');
      positions = [`${a.index}|${a.isTop}`, `${b.index}|${b.isTop}`];
      return null;
    };

    await render(
      <>
        <Portal id="a" phase="open" />
        <Portal id="b" phase="open" />
        <Positions />
      </>,
      { wrapper: ModalLayerTestRoot },
    );

    expect(positions).toEqual(['0|false', '1|true']);
  });

  it('falls back to the window size before the root is measured', async () => {
    let frame = { width: 0, height: 0 };
    const Frame = () => {
      frame = useModalLayerFrame();
      return null;
    };

    await render(<Frame />);

    expect(frame.width).toBeGreaterThan(0);
    expect(frame.height).toBeGreaterThan(0);
  });

  it('gives Back to the top layer before a screen listener', async () => {
    const listeners: Parameters<typeof BackHandler.addEventListener>[1][] = [];
    const spy = jest
      .spyOn(BackHandler, 'addEventListener')
      .mockImplementation((_event, listener) => {
        listeners.push(listener);
        return { remove: () => undefined };
      });
    const layerBack = jest.fn();
    const screenBack = jest.fn(() => true);

    await render(<Portal id="a" phase="open" />, {
      wrapper: ModalLayerTestRoot,
    });
    setModalLayerBackHandler('a', layerBack);
    addHardwareBackPressListener(screenBack);

    expect(listeners.at(-1)?.()).toBe(true);
    expect(layerBack).toHaveBeenCalledTimes(1);
    expect(screenBack).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('lets Back through when no layer is open', () => {
    expect(dispatchModalLayerBack()).toBe(false);
  });

  it('isolates a crash in layer content and lets it retry on reopen', async () => {
    const warn = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined);
    const error = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    let isThrowing = true;
    const Content = () => {
      if (isThrowing) {
        throw new Error('broken');
      }
      return <Text>Recovered</Text>;
    };
    const onContentError = jest.fn();
    const Crashing = ({ phase }: { phase: ModalLayerPhase }) => (
      <ModalLayerPortal
        getPhase={() => phase}
        id="crash"
        onContentError={onContentError}
        phase={phase}
      >
        <Content />
      </ModalLayerPortal>
    );

    const { rerender } = await render(
      <>
        <Text>App</Text>
        <Crashing phase="open" />
      </>,
      { wrapper: ModalLayerTestRoot },
    );
    expect(onContentError).toHaveBeenCalledTimes(1);
    expect(screen.getByText('App')).toBeTruthy();
    expect(screen.queryByText('Recovered')).toBeNull();

    isThrowing = false;
    await rerender(
      <>
        <Text>App</Text>
        <Crashing phase="exiting" />
      </>,
    );
    await rerender(
      <>
        <Text>App</Text>
        <Crashing phase="entering" />
      </>,
    );
    expect(screen.getByText('Recovered')).toBeTruthy();
    warn.mockRestore();
    error.mockRestore();
  });
});
