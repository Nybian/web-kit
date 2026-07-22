# @nybian/web-kit

Shared, framework-light building blocks for the Nybian frontends — the **single
source of truth** that replaces the per-app vendored `common/` copies in
`web-app` and `admin-web-app`.

It carries:

- **`/portal`** — per-tenant resolved-config types + mapping/resolve helpers
- **`/tokens`** — design tokens → CSS variables
- **`/formatters`** — locale-agnostic formatting helpers
- **`/widgets`** — the widget **manifest** (`WIDGET_MANIFEST`): the one registry
  of every dashboard widget code
- **`/components`** — the presentational widget cores (`Nyb*`, e.g. `NybKpiCard`,
  `NybHeroBalance`, `NybListRow`), the mobile bottom bar, **and `NybWidgetPreview`**
  — the full-fidelity preview renderer that draws each widget from the package's
  own **per-widget mock data**. The admin config preview re-exports this, so
  preview and production can't drift.

Auth and HTTP deliberately stay per-app — they're not here.

## Why this package exists

The two apps previously each carried a byte-identical `common/` folder kept in
sync by hand (`cp`). They had already drifted. This package makes it one
versioned artifact both apps depend on.

## Layout

```
src/
  index.ts            # re-exports portal + tokens + formatters (react-free root)
  portal/             # config resolution types + helpers
  tokens/             # design tokens
  formatters/         # formatting helpers
  widgets/            # WIDGET_MANIFEST + codes (+ coverage test)
  components/         # Nyb* presenters, NybMobileBottomBar, NybWidgetPreview (+ mock data)
```

`react` and `lucide-react` are **peer dependencies** — consumers provide their
single copy; the build keeps them external.

## Develop

```bash
yarn install
yarn type-check     # tsc --noEmit
yarn test           # vitest — asserts every manifest code has a preview sample
yarn build          # tsup -> dist/<subpath>/index.{js,d.ts}
```

## Local development (iterating from an app)

You do **not** publish or cut a tag to see changes locally. An app pinned to a
git tag (`#vX.Y.Z`) resolves a **frozen commit** (and Yarn caches it), so it will
NOT reflect your local edits — the tag is for CI/shared reproducibility. To
iterate, point the app at your local checkout instead:

```bash
# in web-app and/or admin-web-app — LOCAL ONLY, do NOT commit this change:
yarn add @nybian/web-kit@portal:../web-kit
```

`portal:` symlinks the app to this folder. Because the package's `exports` point
at `dist`, run the watcher here so `dist` rebuilds on every save:

```bash
# in web-kit:
yarn dev            # tsup --watch
```

Now: edit web-kit → save → tsup rebuilds `dist` → the app's Vite HMR picks it up.
No commit, no tag, no publish. When done, switch the app back to the pinned tag
so CI/teammates stay reproducible (never commit the `portal:` ref):

```bash
yarn add @nybian/web-kit@https://github.com/Nybian/web-kit.git#v0.1.0
```

## Release (git-only — no npm registry)

Versions are **git tags**; `dist` is committed so a clone needs no build step.
To ship a change to CI / other people:

```bash
# edit src/, then:
yarn build                              # regenerate dist
git commit -am "feat: …"                # include the rebuilt dist/
git tag v0.1.1 && git push && git push --tags
```

Then bump the ref in each consuming app:

```bash
yarn add @nybian/web-kit@https://github.com/Nybian/web-kit.git#v0.1.1
```

## Consume

Both apps depend on this package via a git ref (git-only, no registry):

```jsonc
"@nybian/web-kit": "https://github.com/Nybian/web-kit.git#v0.1.0"
```

Subpaths: `@nybian/web-kit/{portal,tokens,formatters,components,widgets}`.
`react` and `lucide-react` are peer deps (the app provides them). Apps pick up
the package's Tailwind classes by scanning `./node_modules/@nybian/web-kit/dist/**/*.js`.
