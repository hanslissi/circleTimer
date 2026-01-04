import { clsx } from "clsx";
import styles from "./Thumbwheel.module.css";
import { WheelIndents } from "./WheelIndents/WheelIndents";
import { useThumbwheel } from "./hooks/useThumbwheel";

type Props = {
  color?: "teal" | "autumn";
  onChange?: (value: number) => void;
  stepSize?: number;
};

export const Thumbwheel = ({
  color = "teal",
  onChange,
  stepSize = 10,
}: Props) => {
  const { indentsRef, handlePointerDown } = useThumbwheel({
    onChange,
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
