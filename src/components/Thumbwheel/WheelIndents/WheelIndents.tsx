import { clsx } from "clsx";
import styles from "./WheelIndents.module.css";

type Props = {
  color?: "teal" | "autumn" | "graysky";
};

const WheelIndents = ({ color = "teal" }: Props) => {
  const glowingIndentClassNames = clsx(styles.glowingIndent, {
    [styles.glowingTeal]: color === "teal",
    [styles.glowingAutumn]: color === "autumn",
    [styles.glowingGraysky]: color === "graysky",
  });

  return (
    <div className={styles.container}>
      <div className={styles.spacer} />
      <div className={glowingIndentClassNames} />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div className={glowingIndentClassNames} />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default WheelIndents;
