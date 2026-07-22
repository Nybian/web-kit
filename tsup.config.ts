import { defineConfig } from 'tsup'

/**
 * Builds each public subpath to `dist/<subpath>/index.{js,d.ts}`, mirroring the
 * `exports` map in package.json. Entries live under `src/`, so tsup preserves
 * that structure relative to `src` (e.g. src/portal/index.ts → dist/portal/index.js).
 *
 * react / react/jsx-runtime / lucide-react are peer deps — kept external so
 * consumers dedupe on their own single copy.
 */
export default defineConfig({
  entry: [
    'src/index.ts',
    'src/portal/index.ts',
    'src/tokens/index.ts',
    'src/formatters/index.ts',
    'src/components/index.ts',
    'src/widgets/index.ts',
  ],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react'],
})
