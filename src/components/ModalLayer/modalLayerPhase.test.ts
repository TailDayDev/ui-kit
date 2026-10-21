import {
  isModalLayerPhaseActive,
  transitionModalLayerPhase,
} from './modalLayerPhase';

describe('transitionModalLayerPhase', () => {
  it('walks the full open/close cycle on events', () => {
    expect(transitionModalLayerPhase('closed', 'show')).toBe('entering');
    expect(transitionModalLayerPhase('entering', 'enterFinished')).toBe('open');
    expect(transitionModalLayerPhase('open', 'hide')).toBe('exiting');
    expect(transitionModalLayerPhase('exiting', 'exitFinished')).toBe('closed');
  });

  it('reverses a leaving layer instead of re-creating it', () => {
    expect(transitionModalLayerPhase('exiting', 'show')).toBe('entering');
  });

  it('lets an entering layer leave before it finished opening', () => {
    expect(transitionModalLayerPhase('entering', 'hide')).toBe('exiting');
  });

  it('ignores stale animation events', () => {
    expect(transitionModalLayerPhase('exiting', 'enterFinished')).toBe(
      'exiting',
    );
    expect(transitionModalLayerPhase('entering', 'exitFinished')).toBe(
      'entering',
    );
    expect(transitionModalLayerPhase('closed', 'hide')).toBe('closed');
    expect(transitionModalLayerPhase('open', 'show')).toBe('open');
  });

  it('treats only entering and open layers as active', () => {
    expect(isModalLayerPhaseActive('entering')).toBe(true);
    expect(isModalLayerPhaseActive('open')).toBe(true);
    expect(isModalLayerPhaseActive('exiting')).toBe(false);
    expect(isModalLayerPhaseActive('closed')).toBe(false);
  });
});
