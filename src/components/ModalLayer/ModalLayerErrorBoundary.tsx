import { Component, type ErrorInfo, type ReactNode } from 'react';

import type { ModalLayerPhase } from './modalLayerPhase';

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
export class ModalLayerErrorBoundary extends Component<
  IModalLayerErrorBoundaryProps,
  IModalLayerErrorBoundaryState
> {
  override state: IModalLayerErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): IModalLayerErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.warn(
      '[ModalLayer] modal content crashed',
      error,
      info.componentStack,
    );
    this.props.onError?.();
  }

  override componentDidUpdate(
    previousProps: IModalLayerErrorBoundaryProps,
  ): void {
    // A layer opened again gets a fresh attempt at rendering its content.
    if (
      this.state.hasError &&
      previousProps.phase === 'exiting' &&
      this.props.phase === 'entering'
    ) {
      this.setState({ hasError: false });
    }
  }

  override render(): ReactNode {
    return this.state.hasError ? null : this.props.children;
  }
}
