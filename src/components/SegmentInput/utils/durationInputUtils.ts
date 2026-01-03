/**
 * "1" => 1s, "12" => 12s, "123" => 83s
 * @param durationDigits
 * @returns
 */
export function convertDurationDigitsToSeconds(durationDigits: number) {
  if (durationDigits / 100 < 1) {
    // Just seconds: "1" or "12"
    return durationDigits;
  }

  // Minutes and seconds: "123" => 1m23s
  const seconds = durationDigits % 100;
  const minutes = Math.floor(durationDigits / 100);
  return minutes * 60 + seconds;
}

/**
 * 1s => "1", 12s => "12", 67s => "107"
 * @param seconds
 */
export function convertSecondsToDurationDigits(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0
    ? `${mins}${secs.toString().padStart(2, "0")}`
    : secs.toString();
}
