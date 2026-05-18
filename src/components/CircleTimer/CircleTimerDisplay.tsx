import { clsx } from "clsx";
import { useCallback, useState } from "react";
import { jazzWorkAudio, jazzRestAudio } from "@audio/timerAudios";
import { TimerStepDisplay } from "@components/TimerStep";
import styles from "./CircleTimer.module.css";
import type { TimerStep } from "@app-types/Timer.types";

type Props = Readonly<{
  timerSteps: TimerStep[];
}>;

const CircleTimerDisplay = ({ timerSteps }: Props) => {
  const [activeTimerStepIdx, setActiveTimerStepIdx] = useState(0);

  const handleStepEnd = useCallback(() => {
    console.log("Yup ended");
    setActiveTimerStepIdx((prev) => prev + 1);
    jazzRestAudio.play();
  }, [setActiveTimerStepIdx]);

  const handleWorkEnd = useCallback(() => {
    console.log("doing it work")
    jazzWorkAudio.play();
  }, []);

  const handleRestEnd = useCallback(() => {
    console.log("doing it rest")
    jazzRestAudio.play();
  }, []);

  return (
    <div className={clsx(styles.metalSlant, "metalSlantIndent")}>
      <div className={styles.circleTimerContainer}>
        {timerSteps.map((timerStep, stepIdx) => (
          <TimerStepDisplay
            active={stepIdx === activeTimerStepIdx}
            timerStep={timerStep}
            onStepEnd={handleStepEnd}
            onWorkEnd={handleWorkEnd}
            onRestEnd={handleRestEnd}
          />
        ))}
      </div>
    </div>

  );
}

export default CircleTimerDisplay;