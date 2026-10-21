# @tessera/ui-kit

## 0.1.0

### Minor Changes

- [`11aac01`](https://github.com/TailDayDev/ui-kit/commit/11aac018cb34bff7227c0fb378c6475cc4036337) - Add `AccordionGroup`, `AccordionItem` and `CloseSection`.

- [`1027a9f`](https://github.com/TailDayDev/ui-kit/commit/1027a9fe5fd7a503c3b8c0a68e20bc093954f7c2) - Add `ActionListRow` with all row variants (Figma TaskSheetRow = trailing-icon).

- [`f92345b`](https://github.com/TailDayDev/ui-kit/commit/f92345b8148072870d7f1afb2d35d3b33bb25327) - Add `AdditionalNotes` (inline or modal notes field); texts via props, keyboard handling via `fieldRef`/`onInputFocus`.

- [`16365d2`](https://github.com/TailDayDev/ui-kit/commit/16365d25b8cbbf3436295d229919e0202f0f7ba2) - Add `BaseSkeleton` shimmer (Figma BaseSkeleton), gradient drawn with react-native-svg.

- [`6e57164`](https://github.com/TailDayDev/ui-kit/commit/6e57164ca78a4d1877788a4773a54d3a0a12031e) - Add `Button` with all app styles and sizes. `style="danger"` now matches the Figma red button (red fill, white label). Telemetry moved out: use `onPressIn`/`onPress` in the app wrapper.

- [`d437aed`](https://github.com/TailDayDev/ui-kit/commit/d437aedffce8326aad2c00218026196d998b7318) - Add `CalendarModal` (date/range picker in a modal) without moment; labels, weekday names and locale via props.

- [`0ad6e4a`](https://github.com/TailDayDev/ui-kit/commit/0ad6e4a274f37942027e3f0c98fd61c297f8b379) - Add `CardLocked`: locked card variant with a padlock icon.

- [`951629f`](https://github.com/TailDayDev/ui-kit/commit/951629fc5b1dbd83805023319a2879626defbb5c) - Add `Card`: bordered surface with optional title row, tappable when `onPress` is set; `withShadow` uses the Figma `shadow/block` effect.

- [`decaa02`](https://github.com/TailDayDev/ui-kit/commit/decaa021bd34df96d0b190ac3aeb5dd2129fbfdd) - Add `CenteredScreenHeader`. Adds peer dependency `react-native-safe-area-context`.

- [`fa18abd`](https://github.com/TailDayDev/ui-kit/commit/fa18abd4e56e50631d302a6ba852e4d86950b20f) - Add `CheckBox` with checkbox role and optional disabled state.

- [`67b28ba`](https://github.com/TailDayDev/ui-kit/commit/67b28bafb3607acb7777afadb908e3f35bc1c105) - Add `ChipGroup` and `ChipGroupSkeleton` (Figma Chip / ChipGroup / ChipGroupSkeleton); `allLabel` required when `showAll`.

- [`ba55650`](https://github.com/TailDayDev/ui-kit/commit/ba55650ac15bd5c1cecf105fe13128901afb931c) - Add `ConfirmationModal`: `confirmText`, `closeText` and `errorText` required; icon as a React node; confirm uses the red `danger` button.

- [`7c16d61`](https://github.com/TailDayDev/ui-kit/commit/7c16d61d42ebfeba90057f56d0bf9c83d0389ef8) - Add `ContactDetailsCard`.

- [`b427b11`](https://github.com/TailDayDev/ui-kit/commit/b427b11d8a4d4dbe93573f3cb93146585f9137a5) - Add `CustomCalendar` on react-native-calendars without moment; locale and month title via props. Adds peer dependency `react-native-calendars`.

- [`6bb5953`](https://github.com/TailDayDev/ui-kit/commit/6bb5953953fa3507704cb78014ccd09d11f22638) - Add `CustomModal`, `FullScreenModal`, `DeclarativeAlertProvider` and `CustomModalProvider` (app registry/telemetry/labels wired through the provider; inline alert via `inlineAlert`).

- [`5641912`](https://github.com/TailDayDev/ui-kit/commit/564191252e941a7aa6496e91fcba835a54680363) - Add `DashedBorder` (SVG dashed outline).

- [`fbf8b5a`](https://github.com/TailDayDev/ui-kit/commit/fbf8b5a03c3e7585ff76fdcd32deb6ec5a980121) - Add `DashedButton`.

- [`03bb5da`](https://github.com/TailDayDev/ui-kit/commit/03bb5dafbe96fe7cbd5bb9b6d7d8bf96d519586a) - Add `DatePicker` (named export); month names via `monthLabels`.

- [`c563008`](https://github.com/TailDayDev/ui-kit/commit/c5630089376bdd27ab32900f1dac71ea2f69b9b9) - Add `DateRangeField` and `DateFieldRow`.

- [`1a9ebe3`](https://github.com/TailDayDev/ui-kit/commit/1a9ebe3f86a970e4984ce8736fb96538c1a3c56c) - Add `EditPercentageModal`; slider via `renderSlider`, unsaved-changes confirmation via `requestConfirmation`.

- [`8ad349e`](https://github.com/TailDayDev/ui-kit/commit/8ad349e04eacdff8decca811e37918de3bdbac17) - Add `EditPriceModal`: price input and validation in the kit, price formatting via `formatMaxError` from the app.

- [`686ee94`](https://github.com/TailDayDev/ui-kit/commit/686ee94186b7875c0b97716cd8e1699c7dfd7b43) - Add `EmptyList`: `message` required, image via `illustration`.

- [`b369311`](https://github.com/TailDayDev/ui-kit/commit/b369311b9d8240c21f9fd72802b544914e45a2c5) - Add `EmptyProfileImage` (Figma EmptyProfileImage): initials fallback, image via optional `renderImage`.

- [`b897eab`](https://github.com/TailDayDev/ui-kit/commit/b897eab0ff46cb3a92d01e4ed78a5b7ee8301ab8) - Add `EmptyState`: `title` required, texts and `illustration` come from props.

- [`af9ac1f`](https://github.com/TailDayDev/ui-kit/commit/af9ac1f8ff3c6df797d9d1dba66f8ed7e58b9d1a) - Add `ErrorCard` with optional `closeAccessibilityLabel`.

- [`a66d016`](https://github.com/TailDayDev/ui-kit/commit/a66d01617608357b927414582d76961cda39b30d) - Add `Fab` (Figma Fab): 56pt round action button with the fab shadow; positioning stays with the caller.

- [`c708584`](https://github.com/TailDayDev/ui-kit/commit/c7085840ca4f07ac3c768aca50369653ee192472) - Add `FAQ` with accessible expand/collapse.

- [`437ed1a`](https://github.com/TailDayDev/ui-kit/commit/437ed1a253b50dd314b386aefaa17030e60554a0) - Add `FieldRow` (Figma FieldRow) with accessible action button.

- [`b3bba65`](https://github.com/TailDayDev/ui-kit/commit/b3bba650e3805c1af2a5903a974642e05bd4c6d4) - Add `FilterTrigger`.

- [`3f2881d`](https://github.com/TailDayDev/ui-kit/commit/3f2881d64c3c6bcacd943d7d670ed0ac749b4d2c) - Add `FiltersSelectionModal` with checkbox semantics; option images via `renderOptionImage`.

- [`cc102ca`](https://github.com/TailDayDev/ui-kit/commit/cc102ca23ad4b2ced28d7d63e8ee87c191ce39fb) - Add `FloatingButton`: animated floating pill action.

- [`e74eca5`](https://github.com/TailDayDev/ui-kit/commit/e74eca5b27099a0d3ffc90dee5ad947a48bacd02) - Add `FullScreenLoader` with the loading illustration as an SVG component.

- [`a7cdfff`](https://github.com/TailDayDev/ui-kit/commit/a7cdffffa2e7824e025d865c145678c60195af56) - Add `IconRoundButton` and `IconSquareButton` (Figma IconRoundButton / IconSquareButton) with optional `loading`; `IconButton` is a deprecated alias of `IconRoundButton`.

- [`539ac5d`](https://github.com/TailDayDev/ui-kit/commit/539ac5d233ff2a6ab3fcc59e87d7452c1f798252) - Export the icon set (`src/icons`) from the package root.

- [`b2fbb28`](https://github.com/TailDayDev/ui-kit/commit/b2fbb28025e37ef7dccb88a4634687b29c9340f8) - Add `InfoCard`. `icon` is a React node (the app passes its image component).

- [`c994af0`](https://github.com/TailDayDev/ui-kit/commit/c994af0d1f8a696a5e1f982c0b1cde50099c1ccc) - Add `InfoRow`.

- [`ae07ffc`](https://github.com/TailDayDev/ui-kit/commit/ae07ffc89a4e0f1661750a6e86fabbd4822b6edb) - Add `InfoStep`; the image comes from `renderImage(size)`.

- [`3b4d5a6`](https://github.com/TailDayDev/ui-kit/commit/3b4d5a6e06c6b5ce3c78bba06d9dbc4e583ea895) - First release: design tokens generated from Figma (colors, semantic roles, spacing, radius, stroke, typography, shadows), `ThemeProvider` / `useTheme` / `useThemedStyles`, and the primitives `Box`, `Text`, `Icon`, `Pressable`.

- [`d314bca`](https://github.com/TailDayDev/ui-kit/commit/d314bcaa1bce782691220ebd0aabe6dfd7215f95) - Add `InputClearButton`.

- [`400242c`](https://github.com/TailDayDev/ui-kit/commit/400242c8f04f0e575275efc227b6eeb0808e986e) - Add `InputMaxHeight`; the keyboard accessory height is now the `keyboardAccessoryHeight` prop.

- [`8747803`](https://github.com/TailDayDev/ui-kit/commit/874780315620b322aa4465c2ab44abfa12bbe0a5) - Add `Input` with label, validation rules, error/success states, password toggle and clear button.

- [`6b8eb59`](https://github.com/TailDayDev/ui-kit/commit/6b8eb5930a6652984a6c50915597eeea0f89e7c9) - Add `LabeledDetailRow`.

- [`f8825ee`](https://github.com/TailDayDev/ui-kit/commit/f8825ee84b1dc83b5d8496df8316aaa1ed06c04e) - Add `LimitedListCard`: "+N more" text via `formatMoreLabel`.

- [`a2c18fd`](https://github.com/TailDayDev/ui-kit/commit/a2c18fdc86d0bf1d48ad8c57ce5e71df3fb867cc) - Add `LoadingWrapper` (skeleton/content cross-fade).

- [`7ed4da2`](https://github.com/TailDayDev/ui-kit/commit/7ed4da21c984a8d9b0b8a29d6e49b640e1d3a96f) - Add `ModalLayer`: layer store, host, portal and root that render nested modals reliably on iOS. Adds peer dependencies `react-native-gesture-handler` and `its-fine`.

- [`99f4b61`](https://github.com/TailDayDev/ui-kit/commit/99f4b612b55139bb691f3ce82d61df579a4a2b9c) - Add `ModalWithFooterActions`.

- [`3aa9aa5`](https://github.com/TailDayDev/ui-kit/commit/3aa9aa53b9986910c364cbb2996ce20a120e951d) - Add `MultiSelect` and `MultiSelectCard`; icons via `renderIcon`, description codes via `resolveDescriptionCode`.

- [`0c47479`](https://github.com/TailDayDev/ui-kit/commit/0c474796b053c1c4fe9ced5e10e43de71e5f8b69) - Add `MultipleResultsList`: presentational list of priced stay rows; dates, prices and labels arrive pre-formatted.

- [`99b892b`](https://github.com/TailDayDev/ui-kit/commit/99b892b5ee220f037f3f0a7834f3028450efd7b9) - Add `NativePicker`. Adds peer dependency `@react-native-picker/picker`.

- [`e2d5d12`](https://github.com/TailDayDev/ui-kit/commit/e2d5d1218c9afde9c233ebd5f6c8bdccecd36781) - Add `NetworkFallback`: network state via `isOffline` and `refreshNetwork` props.

- [`f054ff2`](https://github.com/TailDayDev/ui-kit/commit/f054ff27ad3939b2e43c2c68f8447b1003d2e053) - Add `NoImagePlaceholder` frame; artwork via `renderImage`.

- [`1ce4d34`](https://github.com/TailDayDev/ui-kit/commit/1ce4d3472b58f681aa572de06b0d452f3db2302e) - Add `OfflineDataBar`.

- [`7ad6e20`](https://github.com/TailDayDev/ui-kit/commit/7ad6e2003b0aedc829a042417835ec80dc870c74) - Add `OTPInput`; clipboard paste via the optional `onRequestClipboardText` prop.

- [`265bf6e`](https://github.com/TailDayDev/ui-kit/commit/265bf6ee63c0fa3c07ed9975dcabff4013505430) - Add `PercentageValueField`; the slider is supplied through `renderSlider`.

- [`23dc8ce`](https://github.com/TailDayDev/ui-kit/commit/23dc8ce94e13413479d548d73be2d33a20785201) - Add `PetAvatar` and `OverlappingPetAvatars`; image loading via optional `renderImage`.

- [`d06eb05`](https://github.com/TailDayDev/ui-kit/commit/d06eb050e46ad4117799f5349002f2994966d96b) - Add `PetOwnerAvatar` (Figma PetOwnerAvatar).

- [`7e05f4d`](https://github.com/TailDayDev/ui-kit/commit/7e05f4da78c9a21efa12c15335ea198a34b55770) - Add `PhotoUploadPreview`; image rendering and prefetch via props.

- [`58902f6`](https://github.com/TailDayDev/ui-kit/commit/58902f67fec38abadab622e125ee151c7ecde43c) - Add `PhotosPreviewCard`; image via optional `renderImage`.

- [`4a3aace`](https://github.com/TailDayDev/ui-kit/commit/4a3aaced69b18f14bf97882535818cc3ad1c4659) - Add `PullToRefreshErrorState` (Figma PullToRefreshErrorState): `title`, `description` and `illustration` via props.

- [`e3b3184`](https://github.com/TailDayDev/ui-kit/commit/e3b3184d5a3b623ae7b2cd1dea22dcfbefd80a49) - Add `Radio` indicator (sizes via `size`/`dotSize`).

- [`76394d9`](https://github.com/TailDayDev/ui-kit/commit/76394d99b8ce587c4e0d95e696e7509d74c8ef28) - Add `ScheduleOverview`; texts via `labels`.

- [`b7cc101`](https://github.com/TailDayDev/ui-kit/commit/b7cc1017ad24ddfd51a141248f95fe3251f208bb) - Add `ScheduleRadioRow` (Figma `ScheduleRadioRow`).

- [`8f98eac`](https://github.com/TailDayDev/ui-kit/commit/8f98eac46ef4bcad7899dbe4ee509240bca2f7d0) - Add `ScreenNav` (named export; back action via `goBack`).

- [`61349a6`](https://github.com/TailDayDev/ui-kit/commit/61349a63fb579414cb1f43e4a2ec93c6e992d81f) - Add `SegmentedControl` (generic segmented tabs, scroll-linked or Reanimated pill). Adds peer dependencies `react-native-reanimated` and `react-native-worklets`.

- [`ec5ddc3`](https://github.com/TailDayDev/ui-kit/commit/ec5ddc3374e5675a7f8564b8d82d6cc4aacf3823) - Add `SelectTimeModal`; labels and hour format via props, unsaved-changes prompt via `onUnsavedCloseRequest`.

- [`3a22089`](https://github.com/TailDayDev/ui-kit/commit/3a220891f580680ba6951ca02fc831e9beb29c58) - Add `Select`; `placeholder`, `cancelLabel` and `saveLabel` via props.

- [`aca9aac`](https://github.com/TailDayDev/ui-kit/commit/aca9aac8b6448aef53abfc8dc86a21bba84433df) - Add `SelectableOptionCard`.

- [`2736db0`](https://github.com/TailDayDev/ui-kit/commit/2736db03a8d959dc501e3e8a3382e16b11073ebd) - Add `SourceActionSheet` content.

- [`465e528`](https://github.com/TailDayDev/ui-kit/commit/465e528971bc0ffc062c13490f8f9518cc0cafd8) - Add `StatusBadge` (keeps the legacy props used by entities).

- [`57283d4`](https://github.com/TailDayDev/ui-kit/commit/57283d40386f565475d8196051c7337941682b5d) - Add `StickySegmentedControl`.

- [`3142586`](https://github.com/TailDayDev/ui-kit/commit/314258677c972c3ca8fdffbd12b55210857111f8) - Add `StickyTabs` (sticky tab bar with animated content switching).

- [`7cc27ea`](https://github.com/TailDayDev/ui-kit/commit/7cc27ea08348aeb2ce95a71ac6f5500a80a232fc) - Add `SyncedTextInput`: TextInput that keeps typed text in sync inside modals; base of every kit text field.

- [`f808914`](https://github.com/TailDayDev/ui-kit/commit/f808914b65d7317bd2a7a61d15044586d7de9776) - Add `Tag`: selectable tag with selected accessibility state.

- [`da252fa`](https://github.com/TailDayDev/ui-kit/commit/da252fa08aa3c4151d7617109ea079c404bd45ff) - Add `Textarea` (Figma Textarea) with label and counter.

- [`2da41a5`](https://github.com/TailDayDev/ui-kit/commit/2da41a5b547f0b2fd840a61ec03c38b63d617123) - Add `Tips`. `icon` is a React node (the app passes its image component).

- [`4937ffa`](https://github.com/TailDayDev/ui-kit/commit/4937ffa3b2c2199494f6cc86786bac7a529d6094) - Add `Toggle` switch.

- [`742a145`](https://github.com/TailDayDev/ui-kit/commit/742a145992f64eab27673aec774e842176c3219f) - Add `UserDetailsCard`; avatar photo via `renderAvatarImage`.

- [`9a777f0`](https://github.com/TailDayDev/ui-kit/commit/9a777f09f9ec5e55cdde1ecf0ec2f8ddd3473072) - Add `WheelPicker` (date, time, weight and list modes) and `DateWheel` (Figma WheelPicker); month and unit names via props.
