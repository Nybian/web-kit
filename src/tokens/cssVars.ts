/**
 * Brand theme-token → CSS custom property helpers.
 *
 * Nybian brand tokens are HSL channels in `"H S% L%"` form (e.g. `"150 60% 40%"`)
 * keyed by camelCase names (e.g. `primaryForeground`). These helpers convert a
 * flat token map into `--kebab-case` CSS variables and build a stylesheet body.
 */

/** `primaryForeground` → `--primary-foreground`. */
export function tokenToCssVar(name: string): string {
  return `--${name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`
}

/** Flat token map → `{ "--primary": "150 60% 40%", ... }`. */
export function tokensToCssVars(tokens: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(tokens)) {
    out[tokenToCssVar(k)] = v
  }
  return out
}

/** Render a token map as a CSS declaration block body (no selector). */
export function tokensToCssText(tokens: Record<string, string>): string {
  return Object.entries(tokensToCssVars(tokens))
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n')
}

/**
 * Build a full stylesheet body applying `light` tokens under `:root` and
 * optional `dark` tokens under `:root.dark`. Pass a single flat map as `light`
 * for brands that don't split light/dark.
 */
export function buildBrandStyle(
  light: Record<string, string>,
  dark?: Record<string, string>
): string {
  const blocks = [`:root {\n${tokensToCssText(light)}\n}`]
  if (dark && Object.keys(dark).length > 0) {
    blocks.push(`:root.dark {\n${tokensToCssText(dark)}\n}`)
  }
  return blocks.join('\n\n')
}
