import type { StorybookConfig } from '@storybook/react-native-web-vite';
import type { Plugin } from 'vite';

/**
 * react-native-calendars ships ES modules that still call require() (xdate,
 * lodash, its own files, arrow images). Metro accepts that; Vite/Rollup on the
 * web does not. Rewrite those calls to imports for that package only.
 * `require('moment')` stays: the library wraps it in try/catch as optional.
 */
const calendarsRequireToImport = (): Plugin => ({
  name: 'storybook:react-native-calendars-require',
  enforce: 'pre',
  transform(code, id) {
    if (!/node_modules\/react-native-calendars\/src\/.+\.js$/.test(id)) {
      return null;
    }
    const imports: string[] = [];
    const transformed = code.replace(
      /require\((['"])([^'"]+)\1\)/g,
      (match, _quote: string, specifier: string) => {
        if (specifier === 'moment') return match;
        const name = `__rnc_require_${imports.length}`;
        imports.push(`import * as ${name} from '${specifier}';`);
        return `(${name}.default ?? ${name})`;
      },
    );
    return imports.length
      ? { code: `${imports.join('\n')}\n${transformed}`, map: null }
      : null;
  },
});

const config: StorybookConfig = {
  stories: ['../docs/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  staticDirs: ['./public'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
  viteFinal: viteConfig => ({
    ...viteConfig,
    plugins: [calendarsRequireToImport(), ...(viteConfig.plugins ?? [])],
    optimizeDeps: {
      ...viteConfig.optimizeDeps,
      // Pre-bundling would skip the plugin above in dev mode.
      exclude: [
        ...(viteConfig.optimizeDeps?.exclude ?? []),
        'react-native-calendars',
      ],
    },
  }),
};

export default config;
