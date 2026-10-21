/**
 * What the sheet renders: the live props while `visible`, and the props of the
 * last committed visible render while it animates out, so a leaving sheet
 * keeps its title, content and footer even if the owner clears them on close.
 */
export declare const useModalRenderConfig: <TConfig>(isVisible: boolean, liveConfig: TConfig) => TConfig;
//# sourceMappingURL=useModalRenderConfig.d.ts.map