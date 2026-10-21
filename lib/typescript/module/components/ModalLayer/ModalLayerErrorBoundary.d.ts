import { Component, type ErrorInfo, type ReactNode } from 'react';
import type { ModalLayerPhase } from './modalLayerPhase.js';
interface IModalLayerErrorBoundaryProps {
    children: ReactNode;
    phase: ModalLayerPhase;
    onError?: () => void;
}
interface IModalLayerErrorBoundaryState {
    hasError: boolean;
}
/**
 * Keeps a crash inside one modal from taking the app down: the layer renders
 * nothing and asks its owner to close it. Content is rendered in the root
 * host, away from the screen's own boundaries, so each layer needs its own.
 */
export declare class ModalLayerErrorBoundary extends Component<IModalLayerErrorBoundaryProps, IModalLayerErrorBoundaryState> {
    state: IModalLayerErrorBoundaryState;
    static getDerivedStateFromError(): IModalLayerErrorBoundaryState;
    componentDidCatch(error: Error, info: ErrorInfo): void;
    componentDidUpdate(previousProps: IModalLayerErrorBoundaryProps): void;
    render(): ReactNode;
}
export {};
//# sourceMappingURL=ModalLayerErrorBoundary.d.ts.map