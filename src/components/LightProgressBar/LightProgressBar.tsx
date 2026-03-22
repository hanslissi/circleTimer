import { clsx } from "clsx";
import { progressOf } from "../../utils/mathUtils";
import styles from "./LightProgressBar.module.css";
import type { CSSProperties } from "react";

type Props = {
  value: number;
  min: number;
  max: number;
  color?: "teal" | "autumn";
};

const LightProgressBar = ({
  value,
  min,
  max,
  color = "teal",
}: Props) => {
  const progress = progressOf(value, min, max) * 100;
  const lightStripClassNames = clsx(styles.lightstrip, {
    [styles.glowingTeal]: color === "teal",
    [styles.glowingAutumn]: color === "autumn",
  });

  return (
    <div className={clsx(styles.container, "litPlatform")}>
      <div
        className={lightStripClassNames}
        style={{ "--progress": `${progress}%` } as CSSProperties}
      />
    </div>
  );
};

export default LightProgressBar;
