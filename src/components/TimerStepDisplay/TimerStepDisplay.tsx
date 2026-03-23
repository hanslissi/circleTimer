import { clsx } from "clsx";
import Diode from "@components/Diode";
import DurationInput from "@components/DurationInput";
import { useTimerConfigStore } from "@state/useTimerConfigStore";
import TIMER_CONFIG from "@configs/timer.config.json";
import styles from "./TimerStepDisplay.module.css";

type Props = {
  stepIdx: number;
  selected: boolean;
  onSelect: (stepIdx: number) => void;
};

const TimerStepDisplay = ({ stepIdx, selected, onSelect }: Props) => {
  const timerStep = useTimerConfigStore((state) => state.timer.steps[stepIdx]);
  const setWorkSeconds = useTimerConfigStore((state) => state.setWorkSeconds);
  const setRestSeconds = useTimerConfigStore((state) => state.setRestSeconds);

  return (
    <div className={clsx(styles.metalSlant, "metalSlantOutdent")}>
      <div
        className={clsx(styles.platform, "litPlatform")}
        onClick={() => onSelect(stepIdx)}
      >
        <div className={styles.valueDisplay}>
          <Diode on={selected} />

          <div className={styles.valueDisplayGroup}>
            <DurationInput
              min={0}
              max={TIMER_CONFIG.maxSeconds}
              label="Work time"
              value={timerStep.workSeconds}
              onChange={(value) => setWorkSeconds(stepIdx, value)}
            />
          </div>
          <div className={styles.valueDisplayGroup}>
            <DurationInput
              min={0}
              max={TIMER_CONFIG.maxSeconds}
              color="autumn"
              label="Rest time"
              value={timerStep.restSeconds}
              onChange={(value) => setRestSeconds(stepIdx, value)}
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
};

export default TimerStepDisplay;
