import { clsx } from "clsx";
import WheelIndents from "./WheelIndents";
import styles from "./Thumbwheel.module.css";
import { useThumbwheel } from "./hooks/useThumbwheel";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  stepSize?: number;
  color?: "teal" | "autumn";
};

const Thumbwheel = ({
  value,
  onChange,
  min = 0,
  max = 100,
  stepSize = 10,
  color = "teal",
}: Props) => {
  const { indentsRef, handlePointerDown } = useThumbwheel({
    value,
    onChange,
    min,
    max,
    stepSize,
  });

  return (
    <div className={clsx(styles.metalSlant, "metalSlateOutdent")}>
      <div className={clsx(styles.platform, "litPlatform")}>
        <div className={styles.thumbwheel}>
          <div
            className={styles.wheelInteractContainer}
            onPointerDown={handlePointerDown}
          >
            <div ref={indentsRef} className={styles.indentsContainer}>
              <div className={styles.indents}>
                <WheelIndents color={color} />
                <WheelIndents color={color} />
                <WheelIndents color={color} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thumbwheel;
