import { clsx } from "clsx";
import { memo } from "react";
import { Diode } from "@components/Diode";
import { DurationInput } from "@components/input/Duration";
import { LightProgressBar } from "@components/LightProgressBar";
import TIMER_CONFIG from "@configs/timer.config.json";
import styles from "./TimerStep.module.css";
import type { TimerStep } from "@app-types/Timer.types";

type Props = Readonly<{
  timerStep: TimerStep;
  selected: boolean;
  onSelect: (timerStep: TimerStep) => void;
  onToggleSelect: (timerStep: TimerStep) => void;
  onWorkSecondsChange: (seconds: number) => void;
  onRestSecondsChange: (seconds: number) => void;
}>;

const TimerStepEdit = memo(function TimerStepEdit({
  timerStep,
  selected,
  onSelect,
  onToggleSelect,
  onWorkSecondsChange,
  onRestSecondsChange
}: Props) {
  const handleSelect = () => {
    onSelect(timerStep);
  }

  const handleToggleSelect = () => {
    onToggleSelect(timerStep);
  }

  return (
    <div className={clsx(styles.metalSlant, "metalSlantOutdent")}>
      <div
        className={clsx(styles.platform, "litPlatform")}
        onClick={handleToggleSelect}
      >
        <div className={styles.valueDisplay}>
          <Diode on={selected} />

          <div className={styles.valueDisplayGroup}>
            <DurationInput
              min={0}
              max={TIMER_CONFIG.maxSeconds}
              label="Work time"
              value={timerStep.workSeconds}
              onChange={onWorkSecondsChange}
              onFocus={handleSelect}
            />
            <LightProgressBar min={0} max={1} value={1} variant="horizontal"/>
          </div>
          <div className={styles.valueDisplayGroup}>
            <DurationInput
              min={0}
              max={TIMER_CONFIG.maxSeconds}
              color="autumn"
              label="Rest time"
              value={timerStep.restSeconds}
              onChange={onRestSecondsChange}
              onFocus={handleSelect}
            />
            <LightProgressBar min={0} max={1} value={1} color="autumn" variant="horizontal"/>
          </div>
        </div>

        <div className={styles.valueDisplay}>
          <span className={"shinyTextLight"}>
            Repetitions: {timerStep.repetitions}
          </span>
          <div className={styles.valueDisplayGroup}></div>
        </div>
      </div>
    </div>
  );
});

export default TimerStepEdit;
