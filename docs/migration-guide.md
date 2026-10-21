# Migrating a component from the app

How components move from `frontend-mobile/src/shared/ui` into the kit. Goal: **the same pixels, cleaner API, no app dependencies**.

## Ground rules

1. **No visual change** unless it is listed in "Agreed Figma fixes" below. Same sizes, colors, spacing, fonts, shadows, behaviour.
2. **Keep the public API** (prop names, defaults, variants) so the app swaps the import and nothing else. Only remove what ties the component to the app (see 4).
3. **Presentational only.** No `translate`, redux, RTK Query, navigation, `@shared/lib/*`, telemetry, app contexts. ESLint enforces part of this.
4. App dependency → prop:
   - `translate('key')` → a required/optional `string` prop (e.g. `confirmLabel`). No default texts inside the kit.
   - telemetry (`recordClientTelemetry`) → removed; expose `onPressIn` etc. so the app wrapper can record.
   - app helpers (`@shared/lib/...`) → move the pure helper into the component folder if it is UI logic; otherwise take the computed value via props.
   - app types (`@shared/types`) → own props interface in `Name.types.ts`.
   - app icons (`@app/shared/icons/*`) → copy the SVG component into `src/icons/<Name>Icon.tsx` (named export, props `IconComponentProps`, fills/strokes use the `color` prop, no hard-coded color). Reuse if the file already exists.

## Values → tokens

Read the theme with `useTheme()` or `useThemedStyles(createStyles)`; `createStyles` lives at module level.

| App (`theme.colors.*`)                                              | Kit                                                              | When                                            |
| ------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------- |
| `baseGray`                                                          | `colors.text.primary`                                            | text                                            |
| `mediumGray`                                                        | `colors.text.secondary` / `colors.icon.default`                  | text / icon                                     |
| `white`                                                             | `colors.bg.surface` / `colors.text.inverse`                      | background / text on accent                     |
| `primary`                                                           | `colors.bg.accent` / `colors.text.accent` / `colors.icon.accent` | fill / text / icon                              |
| `primaryLight`                                                      | `colors.bg.accentSoft`                                           |                                                 |
| `red`                                                               | `colors.text.error`                                              | text, border, fill of destructive               |
| `redLight`                                                          | `colors.bg.errorSoft`                                            |                                                 |
| `green`                                                             | `colors.text.success`                                            |                                                 |
| `secondaryLight`                                                    | `colors.bg.successSoft`                                          |                                                 |
| `warning`                                                           | `colors.bg.warningSoft`                                          |                                                 |
| `screenBackground`                                                  | `colors.bg.screen`                                               |                                                 |
| `softGray`                                                          | `colors.bg.subtle`                                               |                                                 |
| `paleGray`                                                          | `colors.border.default`                                          | borders, dividers (as fill: `palette.paleGray`) |
| `black50`                                                           | `colors.overlay.scrim`                                           |                                                 |
| anything else (`lightGray`, `darkGray`, `secondary`, badge colors…) | `palette.<same name>`                                            | no semantic role yet                            |

Values are identical, so the swap does not change pixels.

| Numbers                                                      | Kit                                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------------------- |
| 1 2 4 8 10 12 16 20 24 32 40 48 52 56 (padding, margin, gap) | `space[0.25] [0.5] [1] [2] [2.5] [3] [4] [5] [6] [8] [10] [12] [13] [14]` |
| radius 8 / 12 / 16 / 24 / fully round                        | `radius.sm / md / lg / xl / full`                                         |
| border 1 / 2 / 4                                             | `stroke[1] / [2] / [4]`                                                   |
| text styles                                                  | `typography.<group>.<weight>` (same values)                               |
| pressed opacity 0.85                                         | `opacity.pressed`                                                         |

A value with no token (e.g. a 51pt control height, a 14pt padding) stays as a **named constant** at the top of the file with a comment saying where it comes from (`// Figma Button height` or `// off-scale: not in Figma Spacing`). No bare numbers in style objects except 0, 1 for flex, and percentages.

Shadows: the app card shadow (`shadowColor rgba(0,0,0,.08)`, offset 0/4, `shadowRadius 12`, Android `elevation 5`) is drawn in Figma as `shadow/block` (0 4 12 #00000014). Use `boxShadow: [...theme.shadows.block]`: one definition for iOS and Android. iOS `shadowRadius` and CSS blur are not the same unit, so the shadow may look slightly tighter — this is checked visually when the app switches to the kit (stage 5). For a shadow with no Figma effect, keep the current look with a named constant and say so in the report.

## Files

```
src/components/<Name>/
  Name.tsx          component (named export)
  Name.types.ts     props interface, JSDoc on every prop
  Name.stories.tsx  every variant × state (default, pressed, disabled, loading, error where applicable)
  Name.test.tsx     render, press, disabled (+ loading/error if present)
  index.ts          `export { Name } from './Name'; export type { NameProps } from './Name.types';`
```

- Booleans `is…`/`has…`, except legacy names kept for API compatibility (`disabled`, `loading`, `withShadow`, `isRounded`).
- Accessibility: `accessibilityRole`, `accessibilityLabel` (or a prop that feeds it), `accessibilityState` (`disabled`, `selected`, `checked`, `busy`, `expanded`).
- Tests use `@testing-library/react-native` v14: `await render(...)`, `await fireEvent.press(...)`, queries by role/label first; add `{ includeHiddenElements: true }` for nodes hidden from accessibility.
- Stories: `import type { Meta, StoryObj } from '@storybook/react-native-web-vite'`, title `Components/<Name>`.

## Patterns settled during migration

- **Reuse kit components** instead of copying app ones. Available: `Button`, `Card`, `CardLocked`, `InfoCard`, `InfoRow`, `Tag`, `Tips`, `Radio`, `CheckBox`, `Toggle`, `ScheduleRadioRow`, `SelectableOptionCard`, `IconRoundButton`, `IconSquareButton`, `FloatingButton`, `DashedBorder`, `DashedButton`, `Fab`, `EmptyProfileImage`, `PetAvatar`, `OverlappingPetAvatars`, `PetOwnerAvatar`, `NoImagePlaceholder`, `BaseSkeleton`, `FullScreenLoader`, `SyncedTextInput`, `Input`, `Textarea`, `InputMaxHeight`, `InputClearButton`; primitives `Box`, `Text`, `Icon`, `Pressable`; icons in `src/icons/`. Import them by relative path (`../Button`), not via `src/index.ts`.
- **Images** (`DinamicImage`, imageContext, `getImage`): the kit never loads or caches images. Take a ready element (`illustration?: ReactNode`, `icon?: ReactNode`) or a render prop (`renderImage`), as `InfoCard`/`PetAvatar` do.
- **Texts** (`translate(...)`): string props, no defaults inside the kit. More than two strings → one `labels` object prop with a typed interface (`labels: { confirm: string; cancel: string }`). The app keeps a thin wrapper that fills them from translations.
- **Domain helpers** (`resolveStayDatePresentation`, `shared/ui/service/*`, price formatting): take the computed value via props. A generic UI piece hidden inside a domain folder (e.g. `service/uielements/SegmentedControl`) may be ported as its own kit component.
- **Interaction values that differ from kit tokens** (pressed 0.8, disabled 0.6…): keep the app value as a named constant and use RN `Pressable`/`TouchableOpacity`; don't force the kit `Pressable`.
- **Jest:** `react-native-svg`, `react-native-reanimated`, `react-native-gesture-handler` and `react-native-safe-area-context` are mocked globally in `jest.setup.ts`; don't re-mock them locally.
- **Peer dependencies available** (installed as dev deps at app versions): `react-native-safe-area-context`, `react-native-reanimated` + `react-native-worklets`, `react-native-gesture-handler`, `its-fine`, `react-native-calendars`, `@react-native-picker/picker`. Anything else (e.g. `moment`, clipboard, blur): don't add — refactor to props or report.

## Agreed Figma fixes

- `Button` `style="danger"` becomes the Figma `red` button: red fill, white text (was: white fill, red border, red text).

## Not migrated (stay in the app as wrappers)

`AppErrorBoundary`, `LoginSocial`, `UnauthorizedPlaceholder`, `StartupMaintenanceScreen`, `server-mutation-button`, `map-section`, `service`, `pet-types-list`, `resolveStayDatePresentation`, `DinamicImage` (image loading/caching).
