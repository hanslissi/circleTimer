import { clsx } from "clsx";
import { useEffect, useState } from "react";
import styles from "./CircleTimerEdit.module.css";
import type { TimerStep } from "@app-types/Timer.types";

type Props = Readonly<{
  timerSteps: TimerStep[];
}>;

const CircleTimerDisplay = ({ timerSteps }: Props) => {
  const [remainingSeconds, setRemainingSeconds] = useState(() => timerSteps.reduce((total, step) =>
    total + (step.workSeconds + step.restSeconds) * step.repetitions, 0))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={clsx(styles.metalSlant, "metalSlantIndent")}>
      <div className={styles.circleTimerContainer}>
        {remainingSeconds}
      </div>
    </div>

  );
}

export default CircleTimerDisplay;