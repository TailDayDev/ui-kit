import { render, screen } from '@testing-library/react-native';

import { Icon } from '../primitives';
import { lightTheme } from '../theme';
import * as FigmaIcons from './figma';

describe('Figma icon set', () => {
  const entries = Object.entries(FigmaIcons);

  it('exports every Figma icon', () => {
    expect(entries.length).toBe(27);
  });

  it.each(entries)(
    '%s renders at the requested size and color',
    async (name, IconSvg) => {
      await render(
        <Icon icon={IconSvg} size={20} color="accent" testID={name} />,
      );
      const svg = screen.getByTestId(name, { includeHiddenElements: true })
        .children[0];
      expect(svg).toBeTruthy();
      const json = JSON.stringify(screen.toJSON());
      expect(json).toContain(lightTheme.colors.icon.accent);
      expect(json).toContain('"width":20');
    },
  );
});
