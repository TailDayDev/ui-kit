import { createRef, type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import {
  getModalLayers,
  ModalLayerTestRoot,
  resetModalLayersForTests,
} from '../ModalLayer';
import {
  findHostViews,
  flattenStyle,
  getHostView,
} from './__fixtures__/modalTestUtils';
import { CustomModal } from './CustomModal';
import { createStyles } from './CustomModal.styles';
import type {
  CustomModalHandle,
  CustomModalProps,
  CustomModalProviderProps,
  CustomModalRegistration,
} from './CustomModal.types';
import { CustomModalProvider } from './CustomModalProvider';
import { FullScreenModal } from './FullScreenModal';

const renderInHost = (element: ReactElement) =>
  render(element, { wrapper: ModalLayerTestRoot });

const renderModal = async (
  props: Partial<CustomModalProps> = {},
  options: { isCoveredByAnotherModal?: boolean } = {},
) => {
  const onClose = props.onClose ?? jest.fn();
  const result = await renderInHost(
    <>
      <CustomModal
        closeAccessibilityLabel="Close"
        title="Modal title"
        visible
        {...props}
        onClose={onClose}
      >
        {props.children ?? <View testID="modal-content" />}
      </CustomModal>
      {options.isCoveredByAnotherModal ? (
        <CustomModal onClose={jest.fn()} title="Top modal" visible>
          <View />
        </CustomModal>
      ) : null}
    </>,
  );

  return { onClose, result };
};

describe('CustomModal', () => {
  afterEach(async () => {
    await act(() => {
      resetModalLayersForTests();
    });
  });

  describe('styles', () => {
    const styles = createStyles(lightTheme);

    it('matches the app container and header geometry', () => {
      expect(StyleSheet.flatten(styles.container)).toMatchObject({
        backgroundColor: lightTheme.colors.bg.surface,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      });
      const headerStyle = StyleSheet.flatten(styles.header);
      expect(headerStyle).toMatchObject({
        backgroundColor: lightTheme.colors.bg.surface,
        gap: 8,
        height: 60,
        paddingHorizontal: 12,
        paddingVertical: 12,
      });
      expect(headerStyle).not.toHaveProperty('borderBottomWidth');
    });

    it('matches the app back and close control positions', () => {
      expect(StyleSheet.flatten(styles.backButton)).toMatchObject({
        alignItems: 'center',
        backgroundColor: lightTheme.colors.bg.subtle,
        borderRadius: 18,
        height: 36,
        justifyContent: 'center',
        left: 12,
        position: 'absolute',
        width: 36,
      });
      expect(StyleSheet.flatten(styles.closeButton)).toEqual({
        position: 'absolute',
        right: 12,
      });
    });

    it('keeps the title token, the scrim and the footer divider', () => {
      expect(StyleSheet.flatten(styles.title)).toMatchObject({
        ...lightTheme.typography.headline.bold,
        color: lightTheme.colors.text.primary,
      });
      expect(StyleSheet.flatten(styles.backdrop).backgroundColor).toBe(
        lightTheme.colors.overlay.scrim,
      );
      expect(StyleSheet.flatten(styles.footer)).toMatchObject({
        borderTopColor: lightTheme.colors.border.default,
        borderTopWidth: 1,
      });
    });
  });

  describe('rendering', () => {
    it('renders the title, content and an accessible close button', async () => {
      await renderModal();

      expect(screen.getByText('Modal title')).toBeTruthy();
      expect(screen.getByTestId('modal-content')).toBeTruthy();
      expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy();
      expect(getHostView('custom-modal-close')).toBeTruthy();
    });

    it('renders nothing while not visible', async () => {
      await renderModal({ visible: false });

      expect(screen.queryByTestId('modal-content')).toBeNull();
      expect(getModalLayers()).toHaveLength(0);
    });

    it('draws the divider above the footer only when asked', async () => {
      await renderModal({
        footer: <View testID="modal-footer-content" />,
      });
      const footer = getHostView('modal-footer-content').parent;
      expect(StyleSheet.flatten(footer?.props.style).borderTopWidth).toBe(1);
    });

    it('drops the footer divider with divider={false}', async () => {
      await renderModal({
        divider: false,
        footer: <View testID="modal-footer-content" />,
      });
      const footer = getHostView('modal-footer-content').parent;
      expect(StyleSheet.flatten(footer?.props.style).borderTopWidth).toBe(0);
    });

    it('allows a scoped footer bottom padding override', async () => {
      await renderModal({
        footer: <View testID="modal-footer-content" />,
        footerBottomPadding: 7,
      });
      const footer = getHostView('modal-footer-content').parent;
      expect(StyleSheet.flatten(footer?.props.style)).toMatchObject({
        backgroundColor: lightTheme.colors.bg.surface,
        paddingBottom: 7,
      });
    });

    it('allows a scoped container radius override', async () => {
      await renderModal({
        containerStyles: { borderTopLeftRadius: 16, borderTopRightRadius: 16 },
      });
      expect(
        flattenStyle(getHostView('custom-modal-swipe-surface')),
      ).toMatchObject({
        backgroundColor: lightTheme.colors.bg.surface,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      });
    });

    it('replaces the default header', async () => {
      await renderModal({ header: <Text>Custom header</Text> });
      expect(screen.getByText('Custom header')).toBeTruthy();
      expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
    });

    it('hides the header row with header={null}', async () => {
      await renderModal({ header: null });
      expect(findHostViews('custom-modal-header')).toHaveLength(0);
    });

    it('draws its inline alert while it is the top modal', async () => {
      await renderModal({ inlineAlert: <Text>Save failed</Text> });
      expect(screen.getByText('Save failed')).toBeTruthy();
    });

    it('slides to a page through the ref', async () => {
      const ref = createRef<CustomModalHandle>();
      await renderInHost(
        <CustomModal onClose={jest.fn()} ref={ref} visible>
          <View testID="page-0" />
          <View testID="page-1" />
        </CustomModal>,
      );

      expect(screen.getByTestId('page-0')).toBeTruthy();
      expect(screen.getByTestId('page-1')).toBeTruthy();
      await act(() => ref.current?.slideTo(1));
      expect(typeof ref.current?.close).toBe('function');
    });
  });

  describe('header controls', () => {
    it('presses back and close when enabled', async () => {
      const handleBackBtn = jest.fn();
      const { onClose } = await renderModal({ handleBackBtn });

      await fireEvent.press(screen.getByTestId('custom-modal-back'));
      await fireEvent.press(screen.getByRole('button', { name: 'Close' }));

      expect(handleBackBtn).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('disables both controls while locked', async () => {
      const handleBackBtn = jest.fn();
      const { onClose } = await renderModal({ handleBackBtn, isLocked: true });

      const closeButton = screen.getByRole('button', { name: 'Close' });
      expect(closeButton).toBeDisabled();
      await fireEvent.press(screen.getByTestId('custom-modal-back'));
      await fireEvent.press(closeButton);

      expect(handleBackBtn).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('backdrop', () => {
    it('closes an auto-height modal when the backdrop is pressed', async () => {
      const { onClose } = await renderModal({ autoHeight: true });

      await fireEvent.press(getHostView('custom-modal-backdrop'));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('keeps a fixed-height modal open when the backdrop is pressed', async () => {
      const { onClose } = await renderModal();

      await fireEvent.press(getHostView('custom-modal-backdrop'));

      expect(onClose).not.toHaveBeenCalled();
    });

    it('closes a fixed-height modal when backdrop dismissal is enabled', async () => {
      const { onClose } = await renderModal({ closeOnBackdropPress: true });

      await fireEvent.press(getHostView('custom-modal-backdrop'));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not close a locked auto-height modal from the backdrop', async () => {
      const { onClose } = await renderModal({
        autoHeight: true,
        isLocked: true,
      });

      await fireEvent.press(getHostView('custom-modal-backdrop'));

      expect(onClose).not.toHaveBeenCalled();
    });

    it('renders no backdrop action without a backdrop', async () => {
      await renderModal({ autoHeight: true, withBackdrop: false });

      expect(findHostViews('custom-modal-backdrop')).toHaveLength(0);
      expect(
        getHostView('custom-modal-touch-blocker').props.pointerEvents,
      ).toBe('auto');
    });

    it('disables the whole modal layer while another modal is on top', async () => {
      await renderModal({}, { isCoveredByAnotherModal: true });

      const [lower, upper] = findHostViews('custom-modal-backdrop');
      expect(lower?.props.pointerEvents).toBe('none');
      expect(upper?.props.pointerEvents).toBe('auto');
    });
  });

  describe('CustomModalProvider', () => {
    it('registers a rendered modal and cleans up when it closes', async () => {
      const cleanup = jest.fn();
      const onModalRendered = jest.fn<
        ReturnType<NonNullable<CustomModalProviderProps['onModalRendered']>>,
        [CustomModalRegistration]
      >(() => cleanup);
      const Owner = ({ isVisible }: { isVisible: boolean }) => (
        <CustomModalProvider onModalRendered={onModalRendered}>
          <CustomModal
            modalKey="PetEdit"
            onClose={jest.fn()}
            visible={isVisible}
          >
            <View />
          </CustomModal>
        </CustomModalProvider>
      );
      const { rerender } = await renderInHost(<Owner isVisible />);

      expect(onModalRendered).toHaveBeenCalledWith(
        expect.objectContaining({
          instanceId: expect.stringContaining('custom-modal'),
          modalKey: 'PetEdit',
        }),
      );
      const registration = onModalRendered.mock.calls[0]?.[0];
      expect(typeof registration?.handleRef.current?.dismissForTeardown).toBe(
        'function',
      );

      await rerender(<Owner isVisible={false} />);
      expect(cleanup).toHaveBeenCalledTimes(1);
    });

    it('reports the presentation state', async () => {
      const onPresentationStateChange = jest.fn();
      await renderInHost(
        <CustomModalProvider
          onPresentationStateChange={onPresentationStateChange}
        >
          <CustomModal modalKey="Notes" onClose={jest.fn()} visible>
            <View />
          </CustomModal>
        </CustomModalProvider>,
      );

      expect(onPresentationStateChange).toHaveBeenLastCalledWith({
        canInteract: true,
        isClosing: false,
        isLocked: false,
        isRendered: true,
        isTopModal: true,
        isVisible: true,
        modalKey: 'Notes',
        pageHost: 'scroll-view',
      });
    });

    it('gives the default close label to every modal', async () => {
      await renderInHost(
        <CustomModalProvider closeAccessibilityLabel="Închide">
          <CustomModal onClose={jest.fn()} visible>
            <View />
          </CustomModal>
        </CustomModalProvider>,
      );

      expect(screen.getByRole('button', { name: 'Închide' })).toBeTruthy();
    });
  });

  describe('FullScreenModal', () => {
    it('renders a non-scrolling sheet without a footer divider', async () => {
      const onClose = jest.fn();
      await renderInHost(
        <FullScreenModal
          closeAccessibilityLabel="Close"
          footer={<View testID="full-footer" />}
          onClose={onClose}
          title="Full"
          visible
        >
          <View testID="full-content" />
        </FullScreenModal>,
      );

      expect(screen.getByText('Full')).toBeTruthy();
      expect(
        findHostViews('custom-modal-page-scroll')[0]?.props.scrollEnabled,
      ).toBe(false);
      const footer = getHostView('full-footer').parent;
      expect(StyleSheet.flatten(footer?.props.style).borderTopWidth).toBe(
        undefined,
      );

      await fireEvent.press(screen.getByRole('button', { name: 'Close' }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
