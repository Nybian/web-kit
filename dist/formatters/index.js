// src/formatters/index.ts
function formatMinorUnits(amountMinor, currency, locale = "en-US") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amountMinor / 100);
}
function resolveTerm(termOverrides, key, fallback) {
  const value = termOverrides?.[key];
  return value && value.length > 0 ? value : fallback;
}

export { formatMinorUnits, resolveTerm };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map