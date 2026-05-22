import { clsx } from "clsx";
import { memo, useEffect, useRef } from "react";
import { DurationDisplay } from "@components/input/Duration";
import { Diode } from "@components/Diode";
import TIMER_CONFIG from "@configs/timer.config.json";
import { LightProgressBar } from "@components/LightProgressBar";
import { calcCurrentTimerStep } from "@utils/timerUtils";
import { NumberDisplay } from "@components/input/Number";
import styles from "./TimerStep.module.css";
import type { TimerStep } from "@app-types/Timer.types";

type Props = Readonly<{
  active: boolean;
  timerStep: TimerStep;
  secondsPassed: number;
  onWorkEnd?: () => void;
  onRestEnd?: () => void;
  onStepEnd?: () => void;
}>;

const TimerStepDisplay = memo(function TimerStepDisplay({
  active,
  timerStep,
  secondsPassed,
  onWorkEnd,
  onRestEnd,
  onStepEnd,
}: Props) {
  const { workSecondsLeft, restSecondsLeft, repetitionsLeft, phaseKey } = calcCurrentTimerStep(
    secondsPassed,
    timerStep,
  );
  const prevPhaseKey = useRef<string>(phaseKey);

  useEffect(() => {
    if (phaseKey === prevPhaseKey.current) {
      return;
    }
    prevPhaseKey.current = phaseKey;

    switch (phaseKey) {
      case "work":
        onRestEnd?.();
        break;
      case "rest":
        onWorkEnd?.();
        break;
      case "done":
        onStepEnd?.();
        break;
    }
  }, [phaseKey, onWorkEnd, onRestEnd, onStepEnd]);

  return (
    <div className={clsx(styles.metalSlant, "metalSlantOutdent")}>
      <div className={clsx(styles.platform, "litPlatform")}>
        <div className={styles.valueDisplay}>
          <Diode on={active} />

          <div className={styles.valueDisplayGroup}>
            <DurationDisplay size="small" max={TIMER_CONFIG.maxSeconds} value={workSecondsLeft} />
            <LightProgressBar
              min={0}
              max={timerStep.workSeconds}
              value={workSecondsLeft}
              variant="horizontal"
            />
          </div>
          <div className={styles.valueDisplayGroup}>
            <DurationDisplay
              color="autumn"
              size="small"
              max={TIMER_CONFIG.maxSeconds}
              value={restSecondsLeft}
            />
            <LightProgressBar
              min={0}
              max={timerStep.restSeconds}
              value={restSecondsLeft}
              color="autumn"
              variant="horizontal"
            />
          </div>
        </div>

        <div className={styles.valueDisplay}>
          <div className={styles.valueDisplayGroup}>
            <NumberDisplay
              color="graysky"
              size="small"
              max={TIMER_CONFIG.maxRepetitions}
              value={repetitionsLeft}
            />
            <LightProgressBar
              min={0}
              max={timerStep.repetitions}
              value={repetitionsLeft}
              color="graysky"
              variant="horizontal"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default TimerStepDisplay;
