"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalLayerErrorBoundary = void 0;
var _react = require("react");
/**
 * Keeps a crash inside one modal from taking the app down: the layer renders
 * nothing and asks its owner to close it. Content is rendered in the root
 * host, away from the screen's own boundaries, so each layer needs its own.
 */
class ModalLayerErrorBoundary extends _react.Component {
  state = {
    hasError: false
  };
  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }
  componentDidCatch(error, info) {
    console.warn('[ModalLayer] modal content crashed', error, info.componentStack);
    this.props.onError?.();
  }
  componentDidUpdate(previousProps) {
    // A layer opened again gets a fresh attempt at rendering its content.
    if (this.state.hasError && previousProps.phase === 'exiting' && this.props.phase === 'entering') {
      this.setState({
        hasError: false
      });
    }
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
exports.ModalLayerErrorBoundary = ModalLayerErrorBoundary;
//# sourceMappingURL=ModalLayerErrorBoundary.js.map