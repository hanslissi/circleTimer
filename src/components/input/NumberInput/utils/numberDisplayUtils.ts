/**
 * Returns a zero-padded placeholder string matching the width of max.
 * e.g. max=99 => "00", max=999 => "000"
 */
export function getPlaceholderDisplay(max: number): string {
  return String(max).replace(/[0-9]/g, "0");
}
