---
'@tessera/ui-kit': minor
---

Figma design decisions of 23.10:

- `PetOwnerAvatar`: default size 64 (radius 12); owner initials in regular weight at the app size (`body/regular`, 14pt) instead of bold 10pt; without a pet photo and without `petPlaceholder` it shows a grey paw on `bg.subtle`. `size={56}` keeps the old compact look.
- `PullToRefreshErrorState`: 48 between the image and the texts (was 16), 40 on the sides.
- `Textarea`: label in `text.secondary`; the field is 120 tall (104 + 16 counter space when `maxLength` is set), content aligned to the top.
- `BaseSkeleton`: default height 20 (was 22).
- `EmptyState`: the action is the shared `Button` (51pt, side padding 32) instead of a separate 44pt pill. `actionButtonStyle` / `actionTextStyle` go to `Button.restStyle` / `Button.textStyle`.
- Typography: `headline/medium` line height 20 (was 19).
