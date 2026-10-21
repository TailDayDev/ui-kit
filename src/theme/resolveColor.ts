import type { ColorRole } from '../tokens';
import type { Theme } from './theme';

/** Resolves a semantic role such as `'text.primary'` to its color value. */
export const resolveColor = (theme: Theme, role: ColorRole): string => {
  const [group, name] = role.split('.') as [keyof Theme['colors'], string];
  const groupColors: Record<string, string> = theme.colors[group];
  const value = groupColors[name];
  if (value === undefined) {
    throw new Error(`Unknown color role "${role}"`);
  }
  return value;
};
