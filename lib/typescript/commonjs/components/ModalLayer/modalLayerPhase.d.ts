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
export type ModalLayerPhaseEvent = 'show' | 'hide' | 'enterFinished' | 'exitFinished';
/** Returns the next phase, or the same phase when the event does not apply. */
export declare const transitionModalLayerPhase: (phase: ModalLayerPhase, event: ModalLayerPhaseEvent) => ModalLayerPhase;
/** A layer in these phases is on screen and owns the touches beneath it. */
export declare const isModalLayerPhaseActive: (phase: ModalLayerPhase) => boolean;
//# sourceMappingURL=modalLayerPhase.d.ts.map