import { clsx } from "clsx";
import styles from "./Diode.module.css";

type Props = {
  on?: boolean;
  color?: "teal" | "autumn" | "graysky";
};

const Diode = ({ on = false, color = "teal" }: Props) => {
  const themeClassName = clsx({
    [styles.glowingTeal]: color === "teal",
    [styles.glowingAutumn]: color === "autumn",
    [styles.glowingGraySky]: color === "graysky",
  });
  return (
    <div className={clsx(styles.container, themeClassName, "litPlatform")}>
      <div className={clsx(styles.diode, on && styles.on)} />
    </div>
  );
};

export default Diode;
