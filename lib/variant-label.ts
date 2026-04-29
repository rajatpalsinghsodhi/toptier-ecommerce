/** variantKey is `{size}-{color}` — color may contain spaces (e.g. "M-Light Wash"). */
export function formatVariantLabel(variantKey: string) {
  const i = variantKey.indexOf("-");
  if (i <= 0) return variantKey;
  return `${variantKey.slice(0, i)} / ${variantKey.slice(i + 1)}`;
}
