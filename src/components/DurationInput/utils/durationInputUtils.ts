

/**
 * "1" => 1s, "12" => 12s, "123" => 83s, "10615" => 3975s
 * @param durationDigits
 * @returns
 */
export function durationDigitsToSeconds(durationDigits: string) {
  const s = durationDigits.padStart(5, "0");

  const h = Number(s.slice(0, -4));
  const m = Number(s.slice(-4, -2));
  const sec = Number(s.slice(-2));

  return h * 3600 + m * 60 + sec;
}

/**
 * 1s => "1", 12s => "12", 67s => "107", 3975s => "10615"
 * @param seconds
 */
export function secondsToDurationDigits(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds / 60) % 60;
  const s = seconds % 60;

  if (h > 0)
    return `${h}${String(m).padStart(2, "0")}${String(s).padStart(2, "0")}`;
  if (m > 0) return `${m}${String(s).padStart(2, "0")}`;
  return String(s);
}

export function toTimeDisplay(seconds: number) {
  return insertTimeColons(secondsToDurationDigits(seconds));
}

export function toSeconds(timeDisplay: string) {
  return durationDigitsToSeconds(timeDisplay.replaceAll(":", ""));
}

export function insertTimeColons(durationDigits: string) {
  if (durationDigits.length <= 2) {
    return durationDigits;
  }

  return durationDigits
    .split("")
    .reverse()
    .join("")
    .match(/.{1,2}/g)!
    .join(":")
    .split("")
    .reverse()
    .join("");
}
