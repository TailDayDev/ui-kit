# @tessera/ui-kit — instructions for agents

Presentational React Native UI kit (RN 0.79, React 19, TypeScript strict). Single source of UI for the mobile app; the app consumes it as a git-tag dependency. Maintained here, never inside the app.

## Read before working

- Syncing components/tokens from Figma or updating the Storybook → **[docs/figma-to-storybook.md](docs/figma-to-storybook.md)** (the full process, Russian).
- Figma ↔ kit coverage and deliberate differences → [docs/figma-components.md](docs/figma-components.md).
- Component rules (tokens only, props instead of app dependencies, file layout, tests) → [docs/migration-guide.md](docs/migration-guide.md).
- Install, theme, tokens, releases, deprecation → [README.md](README.md).

## Hard rules

- Presentational only: no network, store, navigation, i18n, image loading or business logic. Texts, data, images and callbacks come through props.
- Every color/size/radius/shadow/text style comes from the theme (`useTheme` / `useThemedStyles`). No hex/rgb literals (ESLint enforces).
- One folder per component: `src/components/<Name>/{<Name>.tsx,<Name>.types.ts,<Name>.stories.tsx,<Name>.test.tsx,index.ts}`; public exports only through `src/index.ts`.
- Only Figma components whose description says **`Статус: stable`** are built (`npm run figma:status`); anything else (`beta`, …) is a draft — leave it.
- Generated files are not edited by hand: `src/tokens/generated/*`, `src/icons/figma/*`, `figma/components/specs/*`.
- The Storybook site (`TailDayDev/ui-kit-storybook`, GitHub Pages) is a build artifact published by CI on merge to `main`; never edit it.
- Do not modify the app repository (`frontend-mobile`).
- Never write access tokens into files, command arguments, commits or messages; use `read -s VAR && export VAR`.

## Commands

| Command                               | What                                                                             |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| `npm run check`                       | lint + typecheck + tests + build (must be green before a PR)                     |
| `npm run storybook`                   | local Storybook on :6006                                                         |
| `npm run figma:export-components`     | export Figma page "01 Components" (needs `FIGMA_TOKEN` in env)                   |
| `npm run figma:specs` / `figma:icons` | regenerate component specs / Figma icons                                         |
| `npm run figma:status`                | what is NEW / CHANGED / SYNCED / DRAFT; `-- --mark-synced <Name>` after building |
| `npm run tokens:build`                | regenerate tokens from `tokens/figma-export.json`                                |
| `npm run changeset`                   | describe the change for the release (required when `src/` changes)               |

## Workflow

Branch → one commit per component → changeset → PR (screenshots Figma | Storybook) → CI green → CODEOWNERS review → merge. The public Storybook updates itself a few minutes after merge; the release happens when the "chore: version packages" PR is merged.
