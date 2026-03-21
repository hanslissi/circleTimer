/**
 * Nudges a value by a fixed amount, optionally snapping to detents.
 *
 * When `useDetents` is `true`, the function aligns to the nearest step
 * boundary in the nudge direction, which is useful for stepped inputs.
 *
 * @param value Current numeric value.
 * @param nudgeAmount Step amount to apply (positive or negative).
 * @param useDetents Whether to snap to detent boundaries.
 * @returns The nudged value.
 *
 * @example
 * // Nudge forward by 5 with detents enabled.
 * const result = nudge(12, 5, true);
 * // result === 15
 * 
 * // Nudge backward by 5 with detents enabled.
 * const result = nudge(-12, -5, true);
 * // result === 10
 */
export function nudge(value: number, nudgeAmount: number, useDetents = true) {
  const remainder = value % nudgeAmount;

  if (!useDetents || remainder === 0) {
    return value + nudgeAmount;
  }
  // snap to nearest boundary
  let newValue = value - remainder;

  // Only advance to next boundary if moving in the same direction as the value's sign
  if (Math.sign(value) === Math.sign(nudgeAmount)) {
    newValue += nudgeAmount;
  }

  // Otherwise, we already snapped to the correct boundary
  return newValue;
}