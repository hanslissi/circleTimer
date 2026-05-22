import { clsx } from "clsx";
import { memo } from "react";
import { Diode } from "@components/Diode";
import { DurationInput } from "@components/input/Duration";
import { LightProgressBar } from "@components/LightProgressBar";
import TIMER_CONFIG from "@configs/timer.config.json";
import { NumberInput } from "@components/input/Number";
import styles from "./TimerStep.module.css";
import type { TimerStep } from "@app-types/Timer.types";

type Props = Readonly<{
  timerStep: TimerStep;
  selected: boolean;
  onSelect: (timerStep: TimerStep) => void;
  onToggleSelect: (timerStep: TimerStep) => void;
  onWorkSecondsChange: (seconds: number) => void;
  onRestSecondsChange: (seconds: number) => void;
  onRepetitionsChange: (repetitions: number) => void;
}>;

const TimerStepEdit = memo(function TimerStepEdit({
  timerStep,
  selected,
  onSelect,
  onToggleSelect,
  onWorkSecondsChange,
  onRestSecondsChange,
  onRepetitionsChange,
}: Props) {
  const handleSelect = () => {
    onSelect(timerStep);
  };

  const handleToggleSelect = () => {
    onToggleSelect(timerStep);
  };

  return (
    <div className={clsx(styles.metalSlant, "metalSlantOutdent")}>
      <div className={clsx(styles.platform, "litPlatform")} onClick={handleToggleSelect}>
        <div className={styles.valueDisplay}>
          <Diode on={selected} />

          <div className={styles.valueDisplayGroup}>
            <DurationInput
              size="small"
              min={TIMER_CONFIG.minSeconds}
              max={TIMER_CONFIG.maxSeconds}
              label="Work time"
              value={timerStep.workSeconds}
              onChange={onWorkSecondsChange}
              onFocus={handleSelect}
            />
            <LightProgressBar
              min={TIMER_CONFIG.minSeconds}
              max={1}
              value={1}
              variant="horizontal"
            />
          </div>
          <div className={styles.valueDisplayGroup}>
            <DurationInput
              color="autumn"
              size="small"
              min={TIMER_CONFIG.minSeconds}
              max={TIMER_CONFIG.maxSeconds}
              label="Rest time"
              value={timerStep.restSeconds}
              onChange={onRestSecondsChange}
              onFocus={handleSelect}
            />
            <LightProgressBar min={0} max={1} value={1} color="autumn" variant="horizontal" />
          </div>
        </div>

        <div className={styles.valueDisplay}>
          <div className={styles.valueDisplayGroup}>
            <NumberInput
              color="graysky"
              size="small"
              min={TIMER_CONFIG.minRepetitions}
              max={TIMER_CONFIG.maxRepetitions}
              label="Repetitions"
              value={timerStep.repetitions}
              onChange={onRepetitionsChange}
              onFocus={handleSelect}
            />
            <LightProgressBar min={0} max={1} value={1} color="graysky" variant="horizontal" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default TimerStepEdit;
