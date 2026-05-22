/**
 * "1" => 1s, "12" => 12s, "123" => 83s, "10615" => 3975s
 * @param durationDigits
 * @returns
 */
export function durationDigitsToSeconds(durationDigits: string): number {
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
export function secondsToDurationDigits(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds / 60) % 60;
  const s = seconds % 60;

  if (h > 0)
    return `${h}${String(m).padStart(2, "0")}${String(s).padStart(2, "0")}`;
  if (m > 0) return `${m}${String(s).padStart(2, "0")}`;
  return String(s);
}

export function durationDigitsToTimeDisplay(durationDigits: string) {
  if (durationDigits.length <= 2) {
    return durationDigits;
  }

  const timeParts = [
    durationDigits.substring(0, durationDigits.length - 4),
    durationDigits.substring(
      durationDigits.length - 4,
      durationDigits.length - 2,
    ),
    durationDigits.substring(durationDigits.length - 2, durationDigits.length),
  ].filter((v) => v !== "");
  return timeParts.join(":");
}

export function secondsToTimeDisplay(seconds: number): string {
  return durationDigitsToTimeDisplay(secondsToDurationDigits(seconds));
}

export function timeDisplayToSeconds(timeDisplay: string): number {
  return durationDigitsToSeconds(timeDisplay.replaceAll(":", ""));
}

export function timeDisplayToDurationDigits(timeDisplay: string): string {
  return timeDisplay.replaceAll(":", "");
}

export function timeDisplayToText(timeDisplay: string): string {
  const durationParts = timeDisplay
    .split(":")
    .map((v) => Number(v))
    .reverse();

  const textParts = [];
  if (durationParts[2] > 0) {
    textParts.push(`${durationParts[2]} ${getHoursSuffix(durationParts[2])}`);
  }
  if (durationParts[1] > 0) {
    textParts.push(`${durationParts[1]} ${getMinutesSuffix(durationParts[1])}`);
  }
  textParts.push(`${durationParts[0]} ${getSecondsSuffix(durationParts[0])}`);

  return textParts.join(" ");
}

export function secondsToText(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds / 60) % 60;
  const s = seconds % 60;

  const textParts = [];
  if (h > 0) textParts.push(`${h} ${getHoursSuffix(h)}`);
  if (m > 0) textParts.push(`${m} ${getMinutesSuffix(m)}`);
  textParts.push(`${s} ${getSecondsSuffix(s)}`);

  return textParts.join(" ");
}

export function getHoursSuffix(hours: number): string {
  return hours === 1 ? "hour" : "hours";
}

export function getMinutesSuffix(minutes: number): string {
  return minutes === 1 ? "minute" : "minutes";
}

export function getSecondsSuffix(seconds: number): string {
  return seconds === 1 ? "second" : "seconds";
}

export function getPlaceholderTimeDisplay(maxSeconds: number): string {
  return secondsToTimeDisplay(maxSeconds).replaceAll(/[0-9]/g, "0");
}
