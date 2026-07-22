/**
 * Small, dependency-free display formatters shared across Nybian frontends.
 * These operate on primitives only; app-specific currency/locale wiring stays
 * in each app.
 */

/**
 * Format an integer amount in minor units (cents) as a localized currency
 * string. `250000` + `USD` → `"$2,500.00"`. Assumes 2-decimal currencies.
 */
export function formatMinorUnits(
  amountMinor: number,
  currency: string,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amountMinor / 100)
}

/** Resolve a per-tenant term override, falling back to a default label. */
export function resolveTerm(
  termOverrides: Record<string, string> | null | undefined,
  key: string,
  fallback: string
): string {
  const value = termOverrides?.[key]
  return value && value.length > 0 ? value : fallback
}
