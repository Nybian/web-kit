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
- **`/components`** — the presentational widget cores (`Portal*`), the mobile
  bottom bar, **and `WidgetPreview`** — the full-fidelity preview renderer that
  draws each widget from the package's own **per-widget mock data**. This is
  what the admin config preview renders, so preview and production can't drift.

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
  components/         # Portal* presenters, MobileBottomBar, WidgetPreview (+ mock data)
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

## Publish (private)

`publishConfig.access` is `restricted`. Configure a private registry via
`.npmrc` (see `.npmrc.example`), bump `version`, then:

```bash
yarn build && npm publish   # prepublishOnly rebuilds automatically
```

## Consume (migration — not yet wired)

Once published, each app replaces its vendored `common/` folder + the
`@nybian/web-kit/*` path aliases (in `vite.config.ts` / `tsconfig.app.json`)
with a real dependency:

```bash
yarn add @nybian/web-kit@<version>
```

Then delete `web-app/common/` and `admin-web-app/common/`, drop the aliases, and
point the admin config preview at `WidgetPreview` from `@nybian/web-kit/components`.
