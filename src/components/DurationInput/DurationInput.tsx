import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { clsx } from "clsx";
import { clamp } from "../../utils/mathUtils";
import { useShiftToggle } from "../../hooks/useShiftToggle";
import {
  durationDigitsToTimeDisplay,
  getPlaceholderTimeDisplay,
  secondsToTimeDisplay,
  timeDisplayToSeconds,
  timeDisplayToText,
  trimToPlaceholder,
} from "../../utils/timeDisplayUtils";
import { nudge as nudgeDetent } from "../../utils/inputUtils";
import styles from "./DurationInput.module.css";
import type { Predicate } from "../../utils/types";

type Props = {
  value: number;
  onChange?: Predicate<number>;
  min?: number;
  max?: number;
  smallNudgeAmount?: number;
  bigNudgeAmount?: number;
  label?: string;
  size?: "big" | "small";
  color?: "teal" | "autumn" | "graysky";
};

export const DurationInput = ({
  value,
  onChange,
  min = 0,
  max = 100,
  smallNudgeAmount = 1,
  bigNudgeAmount = 10,
  label = "value",
  size = "big",
  color = "teal",
}: Props) => {
  const themeClassNames = clsx(
    {
      [styles.glowingTeal]: color === "teal",
      [styles.glowingAutumn]: color === "autumn",
      [styles.glowingGraySky]: color === "graysky",
    },
    {
      [styles.variantBig]: size === "big",
      [styles.variantSmall]: size === "small",
    },
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const isShiftToggledRef = useShiftToggle();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [raw, setRaw] = useState<string>(secondsToTimeDisplay(value));

  const placeholder = getPlaceholderTimeDisplay(max);
  const displayValue = isFocused ? raw : secondsToTimeDisplay(value);
  const displayValueTrimmed = trimToPlaceholder(displayValue, placeholder);
  const currentSeconds = isFocused ? timeDisplayToSeconds(raw) : value;

  const commit = (seconds: number) => {
    onChange?.(seconds);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newRawValue = durationDigitsToTimeDisplay(value);
    setRaw(newRawValue);
  };

  const nudge = (delta: number) => {
    const newValue = clamp(nudgeDetent(currentSeconds, delta), min, max);
    setRaw(secondsToTimeDisplay(newValue));
    commit(newValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const nudgeAmount = isShiftToggledRef.current
      ? bigNudgeAmount
      : smallNudgeAmount;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      nudge(nudgeAmount);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      nudge(-nudgeAmount);
    } else if (e.key === "Enter") {
      e.preventDefault();
      commit(timeDisplayToSeconds(displayValueTrimmed));
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setRaw(secondsToTimeDisplay(value));
  };

  const handleBlur = () => {
    setIsFocused(false);
    commit(timeDisplayToSeconds(displayValueTrimmed));
  };

  return (
    <div className={clsx(styles.container, themeClassNames)}>
      <div className={styles.display}>
        <span className={styles.doubleDigit}>{placeholder}</span>
      </div>

      <input
        className={styles.durationInput}
        ref={inputRef}
        aria-label={label}
        type="text"
        inputMode="numeric"
        value={displayValue}
        aria-valuetext={timeDisplayToText(displayValueTrimmed)}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
