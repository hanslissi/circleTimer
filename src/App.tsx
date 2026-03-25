import { clsx } from "clsx";
import Thumbwheel from "@components/Thumbwheel";
import Button from "@components/Button";
import LightProgressBar from "@components/LightProgressBar";
import DurationInput from "@components/DurationInput";
import { useTimerConfigStore } from "@state/useTimerConfigStore";
import TimerStepDisplay from "@components/TimerStepDisplay";
import TIMER_CONFIG from "@configs/timer.config.json";
import { selectEditingStep } from "@state/timerConfigSlice.selectors";
import { PageLayoutWrapper } from "@layouts/PageLayoutWrapper/PageLayoutWrapper";
import styles from "./App.module.css";

function App() {
  const timerSteps = useTimerConfigStore((state) => state.steps);
  const editingStepIdx = useTimerConfigStore((state) => state.editingStepIdx);
  const editingStep = useTimerConfigStore(selectEditingStep);
  const addAction = useTimerConfigStore((state) => state.add);
  const removeAction = useTimerConfigStore((state) => state.remove);
  const toggleEditingStep = useTimerConfigStore(
    (state) => state.toggleEditingStep,
  );
  const setWorkSeconds = useTimerConfigStore((state) => state.setWorkSeconds);
  const setRestSeconds = useTimerConfigStore((state) => state.setRestSeconds);

  const handleChangeWorkSeconds = (seconds: number) => {
    setWorkSeconds(seconds);
  };

  const handleChangeRestSeconds = (seconds: number) => {
    setRestSeconds(seconds);
  };

  return (
    <PageLayoutWrapper>
      <div className={styles.circleTimer}>
        <div className={clsx(styles.metalSlant, "metalSlantIndent")}>
          <div className={styles.circleTimerDisplay}>
            {timerSteps.map((_, stepIdx) => (
              <TimerStepDisplay
                stepIdx={stepIdx}
                onSelect={toggleEditingStep}
                selected={editingStepIdx === stepIdx}
              />
            ))}
          </div>
        </div>
        <div className={styles.interfaceSection}>
          <div className={styles.timeDisplaysSection}>
            <DurationInput
              min={0}
              max={TIMER_CONFIG.maxSeconds}
              label="Work time"
              value={editingStep.workSeconds}
              onChange={handleChangeWorkSeconds}
            />
            <DurationInput
              min={0}
              max={TIMER_CONFIG.maxSeconds}
              color="autumn"
              label="Rest time"
              value={editingStep.restSeconds}
              onChange={handleChangeRestSeconds}
            />
          </div>
          <div className={styles.thumbwheelsSection}>
            <div className={styles.thumbwheelContainer}>
              <Thumbwheel
                min={0}
                max={TIMER_CONFIG.maxSeconds}
                value={editingStep.workSeconds}
                onChange={handleChangeWorkSeconds}
              />
              <LightProgressBar
                min={0}
                max={TIMER_CONFIG.maxSeconds}
                value={editingStep.workSeconds}
              />
            </div>
            <div className={styles.thumbwheelContainer}>
              <LightProgressBar
                min={0}
                max={TIMER_CONFIG.maxSeconds}
                color="autumn"
                value={editingStep.restSeconds}
              />
              <Thumbwheel
                min={0}
                max={TIMER_CONFIG.maxSeconds}
                value={editingStep.restSeconds}
                onChange={handleChangeRestSeconds}
                color="autumn"
              />
            </div>
          </div>
          <div className={styles.buttonsSection}>
            <Button onClick={addAction} className={styles.button}>
              Add
            </Button>
            <Button onClick={removeAction} className={styles.button}>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </PageLayoutWrapper>
  );
}

export default App;
