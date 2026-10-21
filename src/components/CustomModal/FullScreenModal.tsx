import { forwardRef } from 'react';

import { CustomModal } from './CustomModal';
import type {
  CustomModalHandle,
  FullScreenModalProps,
} from './CustomModal.types';

/** A full-height CustomModal: no footer divider, the page does not scroll. */
export const FullScreenModal = forwardRef<
  CustomModalHandle,
  FullScreenModalProps
>(
  (
    {
      visible,
      onClose,
      onDismissed,
      isLocked,
      title,
      header,
      footer,
      nestedOverlays,
      children,
      modalKey,
      handleBackBtn,
      headerStyles,
      closeAccessibilityLabel,
    },
    ref,
  ) => (
    <CustomModal
      ref={ref}
      closeAccessibilityLabel={closeAccessibilityLabel}
      modalKey={modalKey}
      title={title}
      onClose={onClose}
      onDismissed={onDismissed}
      isLocked={isLocked}
      divider={false}
      withoutContainerFooter
      scrollEnabled={false}
      visible={visible}
      footer={footer}
      nestedOverlays={nestedOverlays}
      header={header}
      handleBackBtn={handleBackBtn}
      headerStyles={headerStyles}
    >
      {children}
    </CustomModal>
  ),
);

FullScreenModal.displayName = 'FullScreenModal';
