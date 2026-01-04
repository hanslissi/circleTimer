import { useState, type ChangeEvent } from "react";
import { clsx } from "clsx";
import {
  convertDurationDigitsToSeconds,
  convertSecondsToDurationDigits,
} from "./utils/durationInputUtils";
import styles from "./SegmentInput.module.css";
import type { Predicate } from "../../utils/types";

type Props = {
  value: number;
  isDuration: boolean;
  isDisplayOnly?: boolean;
  onChange?: Predicate<number>;
  label?: string;
  size?: "big" | "small";
  color?: "teal" | "autumn" | "graysky";
};

export const SegmentInput = ({
  value,
  isDuration = false,
  isDisplayOnly = false,
  onChange,
  label = "value",
  size = "big",
  color = "teal",
}: Props) => {
  const [inputValue, setInputValue] = useState("");
  const themeClassNames = clsx(
    {
      [styles.glowingTeal]: color === "teal",
      [styles.glowingAutumn]: color === "autumn",
      [styles.glowingGraySky]: color === "graysky",
    },
    {
      [styles.variantBig]: size === "big",
      [styles.variantSmall]: size === "small",
    }
  );

  const formatDuration = (seconds: number): [number, number] => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return [mins, secs];
  };

  const handleDurationInput = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    const seconds = convertDurationDigitsToSeconds(parseInt(val) || 0);
    onChange?.(seconds);
  };

  const handleFocus = () => {
    if (isDuration) {
      // Convert current seconds back to digit format for editing
      const formatted = convertSecondsToDurationDigits(value);
      setInputValue(formatted);
    }
  };

  const handleBlur = () => {
    if (isDuration) {
      setInputValue("");
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isDuration) {
      handleDurationInput(e);
    } else {
      onChange?.(parseInt(e.target.value) || 0);
    }
  };

  const displayValues = isDuration ? formatDuration(value) : [value];

  return (
    <div className={clsx(styles.container, themeClassNames)}>
      {!isDisplayOnly && (
        <input
          type={"number"}
          inputMode={"numeric"}
          value={isDuration ? inputValue : value}
          onChange={handleOnChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label={label}
          className={styles.numberInput}
        />
      )}

      <div className={styles.display}>
        <div className={styles.doubleDigit}>
          <span>00</span>
          <span>{displayValues[0]}</span>
        </div>
        {isDuration && (
          <>
            <span className={styles.digitSeparator}>:</span>
            <div className={styles.doubleDigit}>
              <span>00</span>
              <span>{displayValues[1]}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
