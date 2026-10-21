import { resetDeprecationWarnings, warnDeprecated } from './deprecate';

describe('warnDeprecated', () => {
  beforeEach(() => resetDeprecationWarnings());

  it('warns once per key in development', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    warnDeprecated('Button.style.edit', 'Use variant="soft".');
    warnDeprecated('Button.style.edit', 'Use variant="soft".');
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]?.[0]).toContain('Button.style.edit');
    warn.mockRestore();
  });
});
