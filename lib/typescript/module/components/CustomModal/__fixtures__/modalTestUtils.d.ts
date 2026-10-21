import { screen } from '@testing-library/react-native';
type HostView = ReturnType<typeof screen.container.queryAll>[number];
/**
 * Host views with a testID, hidden ones included (layers below the top one
 * and the covered background are hidden from accessibility).
 */
export declare const findHostViews: (testID: string) => HostView[];
/** The single host view with this testID. */
export declare const getHostView: (testID: string) => HostView;
/** Host views of one native type (e.g. 'RCTScrollView'). */
export declare const findHostViewsByType: (type: string) => HostView[];
export declare const flattenStyle: (view: HostView) => any;
export {};
//# sourceMappingURL=modalTestUtils.d.ts.map