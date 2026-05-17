import { clsx } from "clsx";
import { memo } from "react";
import { Diode } from "@components/Diode";
import { DurationInput } from "@components/Duration";
import { useTimerConfigStore } from "@state/useTimerConfigStore";
import { LightProgressBar } from "@components/LightProgressBar";
import TIMER_CONFIG from "@configs/timer.config.json";
import styles from "./TimerStep.module.css";
import type { TimerStep } from "@app-types/Timer.types";

type Props = Readonly<{
  timerStep: TimerStep;
  selected: boolean;
  onSelect: (timerStep: TimerStep) => void;
  onToggleSelect: (timerStep: TimerStep) => void;
}>;

const TimerStepEdit = memo(function TimerStepEdit({
  timerStep,
  selected,
  onSelect,
  onToggleSelect
}: Props) {
  const setWorkSeconds = useTimerConfigStore((state) => state.setWorkSeconds);
  const setRestSeconds = useTimerConfigStore((state) => state.setRestSeconds);

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
      >
        <div className={styles.valueDisplay}>
          <button onClick={handleToggleSelect}>toggle select</button>
          <Diode on={selected} />

          <div className={styles.valueDisplayGroup}>
            <DurationInput
              min={0}
              max={TIMER_CONFIG.maxSeconds}
              label="Work time"
              value={timerStep.workSeconds}
              onChange={setWorkSeconds}
              onFocus={handleSelect}
            />
            <LightProgressBar min={0} max={100} value={100} variant="horizontal"/>
          </div>
          <div className={styles.valueDisplayGroup}>
            <DurationInput
              min={0}
              max={TIMER_CONFIG.maxSeconds}
              color="autumn"
              label="Rest time"
              value={timerStep.restSeconds}
              onChange={setRestSeconds}
              onFocus={handleSelect}
            />
            <LightProgressBar min={0} max={100} value={40} color="autumn" variant="horizontal"/>
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
