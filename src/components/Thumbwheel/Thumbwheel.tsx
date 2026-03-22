import { clsx } from "clsx";
import styles from "./Thumbwheel.module.css";
import { WheelIndents } from "./WheelIndents/WheelIndents";
import { useThumbwheel } from "./hooks/useThumbwheel";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  stepSize?: number;
  color?: "teal" | "autumn";
};

export const Thumbwheel = ({
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
    <div className={clsx(styles.container, "litPlatform")}>
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
  );
};
