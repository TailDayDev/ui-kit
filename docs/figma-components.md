# Figma ↔ kit components

Source: Figma file **TailDay**, page **01 Components** (`JGXl0xHQB1XmQVG9qQgZbq`, node `10:3`).
Every Figma component (except device chrome and sample content) has a kit component with the same name, the same properties and the same look.

## How components are kept in sync

Full step-by-step process for agents (status «final», export, specs, story per variant, PR, publishing): **[figma-to-storybook.md](figma-to-storybook.md)**. `npm run figma:status` lists what is NEW / CHANGED since the last sync (`figma/components/sync.json`).

1. **Export** (Figma REST API, works with a View seat):
   ```bash
   read -s FIGMA_TOKEN && export FIGMA_TOKEN && npm run figma:export-components; unset FIGMA_TOKEN
   ```
   Writes `figma/components/nodes.json` (node tree, committed), `index.json`, and local renders `png/` + icon `svg/` (git-ignored).
2. **Specs**: `npm run figma:specs` — one readable spec per component: auto-layout, sizes, paddings, radii, strokes, effects, text styles, colors with the matching kit tokens, component properties, nested instances. Build and review a component from its spec + `png/` render.
3. **Icons**: `npm run figma:icons` regenerates `src/icons/figma/Icon*.tsx` from the SVG export (paths 1:1, color through the `color` prop).
4. Component rules: Figma property → prop (VARIANT → union, BOOLEAN → `is…/has…`, TEXT → string, INSTANCE_SWAP → icon or `ReactNode` slot); values only from tokens; raster artwork (task-type icons, pet photos, placement images, illustrations) is a slot the app fills — the kit never loads images.
5. Visual check: Storybook story per Figma variant, compared with the Figma render.

## Known differences (deliberate)

- Text line height: Figma uses AUTO, kit tokens use fixed app line heights (`tokens/overrides.json`) → some components are 1–2pt shorter/taller.
- Figma INSIDE strokes are subtracted from paddings in code (RN borders take layout space), so outer sizes match.
- `WheelPicker` (used by `TodayManualDuePickerContent`): hours are zero-padded and non-selected rows are grey, as in the app; Figma shows `8` and primary at 35% opacity.
- `PetOwnerAvatar`: default stays the app size 56; Figma components use `size={64}`.
- `TodayTaskCard`: the finished veil covers the whole card and opens the menu on tap — from the Figma description ("ждёт кода"), different from the current app.
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
