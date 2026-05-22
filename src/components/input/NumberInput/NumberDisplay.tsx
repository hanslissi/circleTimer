import { memo } from "react";
import { clsx } from "clsx";
import styles from "../styles/Input.module.css";
import { getPlaceholderDisplay } from "./utils/numberDisplayUtils";

type Props = {
  value: number;
  max?: number;
  size?: "big" | "small";
  color?: "teal" | "autumn" | "graysky";
};

const NumberInput = memo(function NumberInput({
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

  const placeholder = getPlaceholderDisplay(max);

  return (
    <div className={clsx(styles.metalSlant, "metalSlantIndent")}>
      <div className={clsx(styles.container, themeClassNames)}>
        <div className={styles.display} role="presentation">
          {placeholder}
        </div>

        <span className={styles.durationValue}>{value}</span>
      </div>
    </div>
  );
});

export default NumberInput;
