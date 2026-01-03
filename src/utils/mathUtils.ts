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
