import { clsx } from "clsx";
import { memo } from "react";
import {
  getPlaceholderTimeDisplay,
  secondsToText,
  secondsToTimeDisplay,
} from "@utils/timeDisplayUtils";
import styles from "../styles/Input.module.css";

type Props = {
  value: number;
  max?: number;
  size?: "big" | "small";
  color?: "teal" | "autumn" | "graysky";
};

const DurationDisplay = memo(function DurationDisplay({
  value,
  max = 100,
  size = "big",
  color = "teal",
}: Props) {
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

  const placeholder = getPlaceholderTimeDisplay(max);
  const displayValue = secondsToTimeDisplay(value);

  return (
    <div
      className={clsx(styles.metalSlant, "metalSlantIndent")}
      role="timer"
      aria-valuetext={secondsToText(value)}
    >
      <div className={clsx(styles.container, themeClassNames)}>
        <div className={styles.display} role="presentation">
          {placeholder}
        </div>

        <span className={styles.durationValue}>{displayValue}</span>
      </div>
    </div>
  );
});

export default DurationDisplay;
