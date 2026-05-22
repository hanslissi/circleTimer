import { clsx } from "clsx";
import { progressOf } from "../../utils/mathUtils";
import styles from "./LightProgressBar.module.css";
import type { CSSProperties } from "react";

type Props = Readonly<{
  value: number;
  min: number;
  max: number;
  color?: "teal" | "autumn" | "graysky";
  variant?: "vertical" | "horizontal";
}>;

const LightProgressBar = ({
  value,
  min,
  max,
  color = "teal",
  variant = "vertical",
}: Props) => {
  const progress = progressOf(value, min, max) * 100;
  const lightStripClassNames = clsx(styles.lightstrip, {
    [styles.glowingTeal]: color === "teal",
    [styles.glowingAutumn]: color === "autumn",
    [styles.glowingGraySky]: color === "graysky",
  });
  const variantClassName = variant === "vertical" ? styles.variantVertical : styles.variantHorizontal;

  return (
    <div className={clsx("litPlatform", styles.container, variantClassName)}>
      <div
        className={lightStripClassNames}
        style={{ "--progress": `${progress}%` } as CSSProperties}
      />
    </div>
  );
};

export default LightProgressBar;
