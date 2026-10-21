---
'@tessera/ui-kit': patch
---

Fix `BaseSkeleton` restarting the shimmer loop on every JS-driven frame (infinite re-render on web): the shared animation is now retained in an effect.
