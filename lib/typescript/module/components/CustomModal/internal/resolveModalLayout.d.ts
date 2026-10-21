export interface IModalLayoutParams {
    /** Height of the area the layers are drawn in. */
    screenHeight: number;
    topInset: number;
    bottomInset: number;
    /** Open layers below this one: each pushes the sheet down a step. */
    layerIndex: number;
    modalTopOffset?: number;
    modalHeight?: number;
    isAutoHeight: boolean;
    hasFooter: boolean;
    isWithoutContainerFooter: boolean;
    footerBottomPadding?: number;
    /** The keyboard height covering the sheet (0 when hidden). */
    keyboardHeight: number;
    keyboardInsetBottomOffset: number;
    isAvoidingKeyboard: boolean;
    isFooterLiftedOnKeyboard: boolean;
    isAdjustingScrollContent: boolean;
    platform: string;
}
export interface IModalLayout {
    topOffset: number;
    /** Space from the top offset to the bottom of the area. */
    availableHeight: number;
    sheetHeight: number;
    /** Height left for the pages under the footer. */
    contentMaxHeight: number;
    contentPaddingBottom: number;
    footerPaddingBottom: number;
    isFooterLiftedForKeyboard: boolean;
    scrollContentPaddingBottom: number;
    scrollContentInsetBottom: number;
}
/** Sizes and keyboard offsets of a CustomModal sheet. Pure: no hooks. */
export declare const resolveModalLayout: ({ screenHeight, topInset, bottomInset, layerIndex, modalTopOffset, modalHeight, isAutoHeight, hasFooter, isWithoutContainerFooter, footerBottomPadding, keyboardHeight, keyboardInsetBottomOffset, isAvoidingKeyboard, isFooterLiftedOnKeyboard, isAdjustingScrollContent, platform, }: IModalLayoutParams) => IModalLayout;
//# sourceMappingURL=resolveModalLayout.d.ts.map