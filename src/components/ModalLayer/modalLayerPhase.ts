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
export type ModalLayerPhase = 'closed' | 'entering' | 'open' | 'exiting';

export type ModalLayerPhaseEvent =
  'show' | 'hide' | 'enterFinished' | 'exitFinished';

const TRANSITIONS: Record<
  ModalLayerPhase,
  Partial<Record<ModalLayerPhaseEvent, ModalLayerPhase>>
> = {
  closed: { show: 'entering' },
  entering: { hide: 'exiting', enterFinished: 'open' },
  open: { hide: 'exiting' },
  exiting: { show: 'entering', exitFinished: 'closed' },
};

/** Returns the next phase, or the same phase when the event does not apply. */
export const transitionModalLayerPhase = (
  phase: ModalLayerPhase,
  event: ModalLayerPhaseEvent,
): ModalLayerPhase => TRANSITIONS[phase][event] ?? phase;

/** A layer in these phases is on screen and owns the touches beneath it. */
export const isModalLayerPhaseActive = (phase: ModalLayerPhase): boolean =>
  phase === 'entering' || phase === 'open';
