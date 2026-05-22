import { clsx } from "clsx";
import {
  getPlaceholderTimeDisplay,
  secondsToTimeDisplay,
  timeDisplayToText,
} from "@utils/timeDisplayUtils";
import styles from "./Duration.module.css";

type Props = {
  value: number;
  min?: number;
  max?: number;
  size?: "big" | "small";
  color?: "teal" | "autumn" | "graysky";
};

const DurationDisplay = ({
  value,
  min = 0,
  max = 100,
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

  const placeholder = getPlaceholderTimeDisplay(max);
  const displayValue = secondsToTimeDisplay(value);

  return (
    <div
      className={clsx(styles.metalSlant, "metalSlantIndent")}
      role="timer"
      aria-valuetext={timeDisplayToText(displayValue)}
    >
      <div className={clsx(styles.container, themeClassNames)}>
        <div className={styles.display} role="presentation">
          <span className={styles.doubleDigit}>{placeholder}</span>
        </div>

        <span className={styles.durationValue}>{displayValue}</span>
      </div>
    </div>
  );
};

export default DurationDisplay;
