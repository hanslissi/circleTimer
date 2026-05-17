import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { DurationDisplay } from "@components/Duration";
import { Diode } from "@components/Diode";
import TIMER_CONFIG from "@configs/timer.config.json";
import { LightProgressBar } from "@components/LightProgressBar";
import { calcCurrentTimerStep } from "@utils/timerUtils";
import styles from "./TimerStep.module.css";
import type { TimerStep } from "@app-types/Timer.types";

type Props = Readonly<{
  timerStep: TimerStep;
  active: boolean;
  onWorkEnd?: () => void;
  onRestEnd?: () => void;
  onStepEnd?: () => void;
}>;

const TimerStepDisplay = ({ timerStep, active, onWorkEnd, onRestEnd, onStepEnd }: Props) => {
  const [secondsPassed, setSecondsPassed] = useState(0);
  const { workSecondsLeft, restSecondsLeft, repetitionsLeft } = calcCurrentTimerStep(secondsPassed, timerStep);

  useEffect(() => {
    if (!active) {
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsPassed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [active]);

  useEffect(() => {
    console.log(workSecondsLeft, restSecondsLeft, repetitionsLeft);
    if (repetitionsLeft === 0 && workSecondsLeft === 0 && restSecondsLeft === 0) {
      onStepEnd?.();
    } else if (workSecondsLeft === 0) {
      onWorkEnd?.();
    } else if (restSecondsLeft === 0) {
      onRestEnd?.();
    }
  }, [workSecondsLeft, restSecondsLeft, repetitionsLeft, onStepEnd, onWorkEnd, onRestEnd]);


  return (
    <div className={clsx(styles.metalSlant, "metalSlantOutdent")}>
      <div
        className={clsx(styles.platform, "litPlatform")}
      >
        <div className={styles.valueDisplay}>
          <Diode on={active} />

          <div className={styles.valueDisplayGroup}>
            <DurationDisplay
              min={0}
              max={TIMER_CONFIG.maxSeconds}
              value={workSecondsLeft}
            />
            <LightProgressBar min={0} max={timerStep.workSeconds} value={workSecondsLeft} variant="horizontal" />
          </div>
          <div className={styles.valueDisplayGroup}>
            <DurationDisplay
              min={0}
              max={TIMER_CONFIG.maxSeconds}
              color="autumn"
              value={restSecondsLeft}
            />
            <LightProgressBar min={0} max={timerStep.restSeconds} value={restSecondsLeft} color="autumn" variant="horizontal" />
          </div>
        </div>

        <div className={styles.valueDisplay}>
          <span className={"shinyTextLight"}>
            Repetitions: {repetitionsLeft}/{timerStep.repetitions}
          </span>
          <div className={styles.valueDisplayGroup}></div>
        </div>
      </div>
    </div>
  )
}

export default TimerStepDisplay; 