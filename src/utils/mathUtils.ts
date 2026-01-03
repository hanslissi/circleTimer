export function snapToValue(
  value: number,
  snapValue: number,
  threshold: number
) {
  const rest = Math.abs(value % snapValue);
  const isSnapDown = rest <= threshold;
  const isSnapUp = snapValue - rest <= threshold;
  if (isSnapDown) {
    return Math.floor(value / snapValue) * snapValue;
  }
  if (isSnapUp) {
    return (Math.floor(value / snapValue) + 1) * snapValue;
  }

  return value;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculates the percentage (0.0-1.0) that a value is in the given range [min, max].
 * It will always be >= 0.0 and <= 1.0
 *
 * @param value the value for which the progress should be calculated
 * @param min start of range, can be < 0
 * @param max end of range, can be < 0 (if smaller than min, 0.0 will be returned)
 */
export function progressOf(value: number, min: number, max: number) {
  if (max < min) {
    return 0.0;
  }
  const range = max - min;
  const shiftedValue = value - min;
  return clamp(shiftedValue / range, 0, 1);
}
