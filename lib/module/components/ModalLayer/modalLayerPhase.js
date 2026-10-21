"use strict";

/**
 * Lifecycle of one modal layer. Every transition is driven by an event
 * (visibility change or an animation callback), never by a timer.
 *
 *   closed ──show──▶ entering ──enterFinished──▶ open
 *     ▲                 │  ▲                       │
 *     │               hide show                   hide
 *     │                 ▼  │                       │
 *     └──exitFinished── exiting ◀──────────────────┘
 */

const TRANSITIONS = {
  closed: {
    show: 'entering'
  },
  entering: {
    hide: 'exiting',
    enterFinished: 'open'
  },
  open: {
    hide: 'exiting'
  },
  exiting: {
    show: 'entering',
    exitFinished: 'closed'
  }
};

/** Returns the next phase, or the same phase when the event does not apply. */
export const transitionModalLayerPhase = (phase, event) => TRANSITIONS[phase][event] ?? phase;

/** A layer in these phases is on screen and owns the touches beneath it. */
export const isModalLayerPhaseActive = phase => phase === 'entering' || phase === 'open';
//# sourceMappingURL=modalLayerPhase.js.map