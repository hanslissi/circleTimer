import { clsx } from "clsx";
import styles from "./Diode.module.css";

type Props = {
  on?: boolean;
  color?: "teal" | "autumn" | "graysky";
  onClick?: () => void;
};

const Diode = ({ on = false, color = "teal", onClick }: Props) => {
  const themeClassName = clsx({
    [styles.glowingTeal]: color === "teal",
    [styles.glowingAutumn]: color === "autumn",
    [styles.glowingGraySky]: color === "graysky",
  });
  return (
    <button
      className={clsx(styles.metalSlant, styles.container, themeClassName, "metalSlantIndent")}
      onClick={onClick}
    >
      <div className={clsx(styles.diode, on && styles.on)} />
    </button>
  );
};

export default Diode;
