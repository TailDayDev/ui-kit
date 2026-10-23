# Figma ↔ kit components

Source: Figma file **TailDay**, page **01 Components** (`JGXl0xHQB1XmQVG9qQgZbq`, node `10:3`).
Every Figma component (except device chrome and sample content) has a kit component with the same name, the same properties and the same look.

## How components are kept in sync

Full step-by-step process for agents (status `Статус: stable`, export, specs, story per variant, PR, publishing): **[figma-to-storybook.md](figma-to-storybook.md)**. `npm run figma:status` lists what is NEW / CHANGED since the last sync (`figma/components/sync.json`).

1. **Export** (Figma REST API). The token must come from a **full (Dev or Full) seat**: View and Collab seats get Tier 1 limits of ~6 requests per month to files and images, and one export makes about five (tree, two PNG batches, SVG). A full seat on Professional gets 15 requests per minute ([rate limits](https://developers.figma.com/docs/rest-api/rate-limits)).
   ```bash
   npm run figma:export-components   # token from the macOS Keychain item "figma-token", or FIGMA_TOKEN
   ```
   Writes `figma/components/nodes.json` (node tree, committed), `index.json`, and local renders `png/` + icon `svg/` (git-ignored).
2. **Specs**: `npm run figma:specs` — one readable spec per component: auto-layout, sizes, paddings, radii, strokes, effects, text styles, colors with the matching kit tokens, component properties, nested instances. Build and review a component from its spec + `png/` render.
3. **Icons**: `npm run figma:icons` regenerates `src/icons/figma/Icon*.tsx` from the SVG export (paths 1:1, color through the `color` prop).
4. Component rules: Figma property → prop (VARIANT → union, BOOLEAN → `is…/has…`, TEXT → string, INSTANCE_SWAP → icon or `ReactNode` slot); values only from tokens; raster artwork (task-type icons, pet photos, placement images, illustrations) is a slot the app fills — the kit never loads images.
5. Visual check: Storybook story per Figma variant, compared with the Figma render.

## Known differences (deliberate)

Every entry names the design decision and its date. Without such a decision Figma wins.

| Component                                             | Difference                                                                                                                                                               | Decision                                         |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| `WheelPicker` (used by `TodayManualDuePickerContent`) | Look follows the code: zero-padded hours, grey non-selected rows, 220pt. The Figma wheel only shows where it appears, as its description says.                           | Design, 2026-10-23                               |
| `IconSquareButton`                                    | Default 40 as in the app; 48 only on the task card, level with the «Готово!» slider.                                                                                     | Design, 2026-10-23                               |
| `PetOwnerAvatar`                                      | Without a pet photo: `paw-print` icon 12pt on `bg.subtle` instead of the app `NoImageIcon` artwork (the kit loads no images; the app can pass its own `petPlaceholder`). | Design, 2026-10-23 («значок лапы, как в макете») |

Tokens: `tokens/overrides.json` is empty since 2026-10-23 — Figma text styles were aligned with the app (fixed line heights, letter spacing 0, strikethrough 14).

Not design differences (rendering):

- Figma INSIDE strokes are subtracted from paddings in code (RN borders take layout space), so outer sizes match.
- Web Storybook can't show native wheel scrolling/initial position; check pickers on a device.

## Coverage (58 components, 28 icons)

| Figma                         | Node       | Kit                                      |
| ----------------------------- | ---------- | ---------------------------------------- |
| PetOwnerAvatar                | `127:9`    | `PetOwnerAvatar`                         |
| TodayTaskTypeBadge            | `78:53`    | `TodayTaskTypeBadge`                     |
| TodayTaskTime                 | `78:66`    | `TodayTaskTime`                          |
| TodayDoorButton               | `78:24`    | `TodayDoorButton`                        |
| Chip                          | `78:77`    | `Chip`                                   |
| IconRoundButton               | `83:14`    | `IconRoundButton` (folder `IconButton`)  |
| IconSquareButton              | `83:20`    | `IconSquareButton` (folder `IconButton`) |
| Fab                           | `257:3154` | `Fab`                                    |
| TodayCompletionSlider         | `84:17`    | `TodayCompletionSlider`                  |
| TabBarItem                    | `84:90`    | `TabBarItem`                             |
| StatusBar                     | `84:111`   | — (draws the OS, not the app)            |
| TodayPlacementList            | `126:12`   | `TodayPlacementList`                     |
| TaskSheetRow                  | `148:767`  | `TaskSheetRow`                           |
| Button                        | `255:288`  | `Button`                                 |
| Radio                         | `255:299`  | `Radio`                                  |
| OptionRow                     | `255:307`  | `OptionRow`                              |
| EmptyProfileImage             | `255:310`  | `EmptyProfileImage`                      |
| BaseSkeleton                  | `255:312`  | `BaseSkeleton`                           |
| Textarea                      | `255:328`  | `Textarea`                               |
| CustomModal · содержимое      | `255:330`  | — (sample content inside CustomModal)    |
| WheelPicker                   | `257:2965` | `WheelPicker`                            |
| TodaySkippedAction            | `257:2970` | `TodaySkippedAction`                     |
| TodayUndoToast                | `257:2976` | `TodayUndoToast`                         |
| ScrollToTodayButton           | `257:2985` | `ScrollToTodayButton`                    |
| ChipGroup                     | `88:65`    | `ChipGroup`                              |
| ServiceHeaderTrigger          | `88:76`    | `ServiceHeaderTrigger`                   |
| TodaySectionHeader            | `88:130`   | `TodaySectionHeader`                     |
| TodayTaskHeader               | `88:144`   | `TodayTaskHeader`                        |
| TodayPetIdentity              | `88:158`   | `TodayPetIdentity`                       |
| TodayMultiPetSummary          | `91:14`    | `TodayMultiPetSummary`                   |
| TodayTaskDetails              | `91:28`    | `TodayTaskDetails`                       |
| TodayDoorDetails              | `91:61`    | `TodayDoorDetails`                       |
| TodayTransferDetails          | `91:75`    | `TodayTransferDetails`                   |
| TodayTaskFooter               | `91:177`   | `TodayTaskFooter`                        |
| ModalHeader                   | `151:239`  | `ModalHeader`                            |
| CustomModalFooterActions      | `257:3018` | `CustomModalFooterActions`               |
| FieldRow                      | `257:3148` | `FieldRow`                               |
| ScheduleRadioRow              | `257:3176` | `ScheduleRadioRow`                       |
| PetPickerRow                  | `257:3258` | `PetPickerRow`                           |
| StaffPickerRow                | `257:3283` | `StaffPickerRow`                         |
| ChipGroupSkeleton             | `257:3293` | `ChipGroupSkeleton` (folder `ChipGroup`) |
| TodayScreenState              | `257:3363` | `TodayScreenState`                       |
| PullToRefreshErrorState       | `257:3371` | `PullToRefreshErrorState`                |
| TodayTaskCard                 | `94:163`   | `TodayTaskCard`                          |
| ServiceHeader                 | `259:3197` | `ServiceHeader`                          |
| CustomTabBar                  | `99:279`   | `CustomTabBar`                           |
| TaskSheet                     | `151:950`  | `TaskSheet`                              |
| CustomModal                   | `259:346`  | `CustomModal`                            |
| ConfirmationModalContent      | `262:398`  | `ConfirmationModalContent`               |
| TodaySkipReasonContent        | `263:481`  | `TodaySkipReasonContent`                 |
| TodayManualDuePickerContent   | `264:502`  | `TodayManualDuePickerContent`            |
| TaskSheetContent              | `264:561`  | `TaskSheetContent`                       |
| TodaySkeleton                 | `264:624`  | `TodaySkeleton`                          |
| ManualTaskSheetContent        | `266:556`  | `ManualTaskSheetContent`                 |
| TodayManualPetPickerContent   | `266:3414` | `TodayManualPetPickerContent`            |
| TodayManualStaffPickerContent | `266:3541` | `TodayManualStaffPickerContent`          |
| MultiActionDetailsContent     | `266:3927` | `MultiActionDetailsContent`              |
| TodaySearchModalContent       | `267:938`  | `TodaySearchModalContent`                |

Icons: 27 of 28 Figma icons are in `src/icons/figma` (`Icon<Name>`); `ios-status-indicators` is device chrome.
