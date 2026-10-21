import { FOOTER_HEIGHT, KEYBOARD_FOOTER_GAP } from '../CustomModal.constants';

import {
  resolveModalLayout,
  type IModalLayoutParams,
} from './resolveModalLayout';

const BASE: IModalLayoutParams = {
  screenHeight: 800,
  topInset: 50,
  bottomInset: 30,
  layerIndex: 0,
  isAutoHeight: false,
  hasFooter: false,
  isWithoutContainerFooter: false,
  keyboardHeight: 0,
  keyboardInsetBottomOffset: 24,
  isAvoidingKeyboard: false,
  isFooterLiftedOnKeyboard: false,
  isAdjustingScrollContent: false,
  platform: 'ios',
};

describe('resolveModalLayout', () => {
  it('fills the area under the top inset, a step lower per layer below', () => {
    expect(resolveModalLayout(BASE)).toMatchObject({
      topOffset: 50,
      availableHeight: 750,
      sheetHeight: 750,
      contentMaxHeight: 750,
    });
    expect(resolveModalLayout({ ...BASE, layerIndex: 2 }).topOffset).toBe(90);
    expect(resolveModalLayout({ ...BASE, modalTopOffset: 10 }).topOffset).toBe(
      10,
    );
  });

  it('caps a fixed height to the available space', () => {
    expect(resolveModalLayout({ ...BASE, modalHeight: 400 }).sheetHeight).toBe(
      400,
    );
    expect(resolveModalLayout({ ...BASE, modalHeight: 2000 }).sheetHeight).toBe(
      750,
    );
  });

  it('reserves the footer under the content', () => {
    const layout = resolveModalLayout({ ...BASE, hasFooter: true });

    // 24 grab + 30 safe area.
    expect(layout.footerPaddingBottom).toBe(54);
    expect(layout.contentMaxHeight).toBe(750 - FOOTER_HEIGHT - 54);
  });

  it('lifts the footer of a short sheet above the keyboard', () => {
    const layout = resolveModalLayout({
      ...BASE,
      hasFooter: true,
      isAutoHeight: true,
      isAvoidingKeyboard: true,
      keyboardHeight: 300,
    });

    expect(layout.isFooterLiftedForKeyboard).toBe(true);
    expect(layout.footerPaddingBottom).toBe(300 + KEYBOARD_FOOTER_GAP);
  });

  it('does not lift the footer of a full-height sheet', () => {
    const layout = resolveModalLayout({
      ...BASE,
      hasFooter: true,
      isAvoidingKeyboard: true,
      keyboardHeight: 300,
    });

    expect(layout.isFooterLiftedForKeyboard).toBe(false);
  });

  it('pads an avoiding sheet without a footer above the keyboard', () => {
    expect(
      resolveModalLayout({
        ...BASE,
        isAvoidingKeyboard: true,
        keyboardHeight: 300,
      }).contentPaddingBottom,
    ).toBe(300 - 30 + 24);
    expect(
      resolveModalLayout({ ...BASE, isAvoidingKeyboard: true })
        .contentPaddingBottom,
    ).toBe(0);
  });

  it('offsets scroll content by platform: inset on iOS, padding on Android', () => {
    const params = {
      ...BASE,
      isAdjustingScrollContent: true,
      keyboardHeight: 300,
    };

    expect(resolveModalLayout(params)).toMatchObject({
      scrollContentInsetBottom: 324,
      scrollContentPaddingBottom: 0,
    });
    expect(
      resolveModalLayout({ ...params, platform: 'android' }),
    ).toMatchObject({
      scrollContentInsetBottom: 0,
      scrollContentPaddingBottom: 324,
    });
  });
});
