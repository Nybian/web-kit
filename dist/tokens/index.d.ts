/**
 * Brand theme-token → CSS custom property helpers.
 *
 * Nybian brand tokens are HSL channels in `"H S% L%"` form (e.g. `"150 60% 40%"`)
 * keyed by camelCase names (e.g. `primaryForeground`). These helpers convert a
 * flat token map into `--kebab-case` CSS variables and build a stylesheet body.
 */
/** `primaryForeground` → `--primary-foreground`. */
declare function tokenToCssVar(name: string): string;
/** Flat token map → `{ "--primary": "150 60% 40%", ... }`. */
declare function tokensToCssVars(tokens: Record<string, string>): Record<string, string>;
/** Render a token map as a CSS declaration block body (no selector). */
declare function tokensToCssText(tokens: Record<string, string>): string;
/**
 * Build a full stylesheet body applying `light` tokens under `:root` and
 * optional `dark` tokens under `:root.dark`. Pass a single flat map as `light`
 * for brands that don't split light/dark.
 */
declare function buildBrandStyle(light: Record<string, string>, dark?: Record<string, string>): string;

export { buildBrandStyle, tokenToCssVar, tokensToCssText, tokensToCssVars };
