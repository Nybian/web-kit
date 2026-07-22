// src/tokens/cssVars.ts
function tokenToCssVar(name) {
  return `--${name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}`;
}
function tokensToCssVars(tokens) {
  const out = {};
  for (const [k, v] of Object.entries(tokens)) {
    out[tokenToCssVar(k)] = v;
  }
  return out;
}
function tokensToCssText(tokens) {
  return Object.entries(tokensToCssVars(tokens)).map(([name, value]) => `  ${name}: ${value};`).join("\n");
}
function buildBrandStyle(light, dark) {
  const blocks = [`:root {
${tokensToCssText(light)}
}`];
  if (dark && Object.keys(dark).length > 0) {
    blocks.push(`:root.dark {
${tokensToCssText(dark)}
}`);
  }
  return blocks.join("\n\n");
}

export { buildBrandStyle, tokenToCssVar, tokensToCssText, tokensToCssVars };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map