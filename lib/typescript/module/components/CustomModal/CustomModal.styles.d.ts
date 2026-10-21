import type { Theme } from '../../theme/index.js';
export declare const createStyles: (theme: Theme) => {
    backButton: {
        alignItems: "center";
        backgroundColor: string;
        borderRadius: number;
        height: number;
        justifyContent: "center";
        left: number;
        position: "absolute";
        width: number;
    };
    backdrop: {
        backgroundColor: string;
        position: "absolute";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    };
    closeButton: {
        position: "absolute";
        right: number;
    };
    container: {
        backgroundColor: string;
        borderTopLeftRadius: number;
        borderTopRightRadius: number;
        overflow: "hidden";
    };
    footer: {
        backgroundColor: string;
        borderTopColor: string;
        borderTopWidth: number;
        paddingBottom: number;
        paddingHorizontal: number;
        paddingTop: number;
    };
    footerWithoutDivider: {
        borderTopWidth: number;
    };
    footerSurface: {
        backgroundColor: string;
    };
    header: {
        alignItems: "center";
        backgroundColor: string;
        flexDirection: "row";
        gap: number;
        height: number;
        justifyContent: "center";
        paddingHorizontal: number;
        paddingVertical: number;
    };
    scrollContainer: {
        flexGrow: number;
    };
    title: {
        color: string;
        flex: number;
        marginHorizontal: number;
        textAlign: "center";
        fontFamily: string;
        fontWeight: "600" | "700" | "500" | "400" | "bold" | "semibold" | "medium" | "regular" | "normal" | "100" | "200" | "300" | "800" | "900" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | "ultralight" | "thin" | "light" | "condensedBold" | "condensed" | "heavy" | "black";
        fontSize: number;
        lineHeight: number;
        letterSpacing: number;
    };
};
export type CustomModalStyles = ReturnType<typeof createStyles>;
/** Layout styles that do not depend on the theme. */
export declare const layoutStyles: {
    fill: {
        flex: number;
    };
    noGrow: {
        flexGrow: number;
    };
    pagesClip: {
        overflow: "hidden";
    };
    pagesRow: {
        flexDirection: "row";
    };
    sheetWrapper: {
        flex: number;
        justifyContent: "flex-end";
    };
};
//# sourceMappingURL=CustomModal.styles.d.ts.map