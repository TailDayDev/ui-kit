# Changesets

Every PR that changes `src/` needs a changeset. Run `npm run changeset`, pick the bump and describe the change for app developers.

- **major** — breaking: a prop removed, renamed or changed in type/meaning; a deprecated API deleted.
- **minor** — new component, new optional prop, new token.
- **patch** — bug fix or visual fix that matches Figma, no API change.
