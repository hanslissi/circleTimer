import { clsx } from "clsx";
import Diode from "@components/Diode";
import { DurationInput } from "@components/Duration";
import { useTimerConfigStore } from "@state/useTimerConfigStore";
import TIMER_CONFIG from "@configs/timer.config.json";
import styles from "./TimerStepEdit.module.css";
import type { TimerStep } from "@app-types/Timer.types";
import { memo } from "react";

type Props = Readonly<{
  timerStep: TimerStep;
  selected: boolean;
  onSelect: (timerStep: TimerStep) => void;
}>;

const TimerStepEdit = memo(function TimerStepEdit({
  timerStep,
  selected,
  onSelect,
}: Props) {
  const setWorkSeconds = useTimerConfigStore((state) => state.setWorkSeconds);
  const setRestSeconds = useTimerConfigStore((state) => state.setRestSeconds);

  return (
    <div className={clsx(styles.metalSlant, "metalSlantOutdent")}>
      <div
        className={clsx(styles.platform, "litPlatform")}
        onClick={() => onSelect(timerStep)}
      >
        <div className={styles.valueDisplay}>
          <Diode on={selected} />

          <div className={styles.valueDisplayGroup}>
            <DurationInput
              min={0}
              max={TIMER_CONFIG.maxSeconds}
              label="Work time"
              value={timerStep.workSeconds}
              onChange={setWorkSeconds}
            />
          </div>
          <div className={styles.valueDisplayGroup}>
            <DurationInput
              min={0}
              max={TIMER_CONFIG.maxSeconds}
              color="autumn"
              label="Rest time"
              value={timerStep.restSeconds}
              onChange={setRestSeconds}
            />
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
