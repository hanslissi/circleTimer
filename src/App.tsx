import Thumbwheel from "@components/Thumbwheel";
import Button from "@components/Button";
import { LightProgressBar } from "@components/LightProgressBar";
import { useTimerConfigStore } from "@state/timerConfig/useTimerConfigStore";
import TIMER_CONFIG from "@configs/timer.config.json";
import { getEditingStep } from "@state/timerConfig/timerConfigSlice.selectors";
import { PageLayoutWrapper } from "@layouts/PageLayoutWrapper/PageLayoutWrapper";
import { DurationInput } from "@components/input/Duration";
import CircleTimerStepsEdit from "@components/CircleTimerSteps/CircleTimerStepsEdit";
import CircleTimerStepsDisplay from "@components/CircleTimerSteps/CircleTimerStepsDisplay";
import { useStopwatchStore } from "@state/stopwatch/useStopwatchStore";
import styles from "./App.module.css";

function App() {
  const isStopwatchRunning = useStopwatchStore((state) => state.isRunning);
  const startStopwatch = useStopwatchStore((state) => state.start);
  const stopStopwatch = useStopwatchStore((state) => state.stop);
  const timerSteps = useTimerConfigStore((state) => state.steps);
  const editingStep = useTimerConfigStore(getEditingStep);
  const addAction = useTimerConfigStore((state) => state.add);
  const removeAction = useTimerConfigStore((state) => state.remove);
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
        <div className={styles.timerStepsSection}>
          {isStopwatchRunning ? (
            <CircleTimerStepsDisplay timerSteps={timerSteps} />
          ) : (
            <CircleTimerStepsEdit />
          )}
        </div>
        <div className={styles.interfaceSection}>
          <div className={styles.timeDisplaysSection}>
            <DurationInput
              min={TIMER_CONFIG.minSeconds}
              max={TIMER_CONFIG.maxSeconds}
              label="Work time"
              value={editingStep.workSeconds}
              onChange={handleChangeWorkSeconds}
            />
            <DurationInput
              min={TIMER_CONFIG.minSeconds}
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
                min={TIMER_CONFIG.minSeconds}
                max={TIMER_CONFIG.maxSeconds}
                value={editingStep.workSeconds}
                onChange={handleChangeWorkSeconds}
              />
              <LightProgressBar
                min={TIMER_CONFIG.minSeconds}
                max={TIMER_CONFIG.maxSeconds}
                value={editingStep.workSeconds}
              />
            </div>
            <div className={styles.thumbwheelContainer}>
              <LightProgressBar
                min={TIMER_CONFIG.minSeconds}
                max={TIMER_CONFIG.maxSeconds}
                color="autumn"
                value={editingStep.restSeconds}
              />
              <Thumbwheel
                min={TIMER_CONFIG.minSeconds}
                max={TIMER_CONFIG.maxSeconds}
                value={editingStep.restSeconds}
                onChange={handleChangeRestSeconds}
                color="autumn"
              />
            </div>
          </div>
          <div className={styles.buttonsSection}>
            <Button onClick={addAction}>Add</Button>
            <Button onClick={removeAction}>Remove</Button>
            <Button onClick={isStopwatchRunning ? stopStopwatch : startStopwatch}>
              {isStopwatchRunning ? "Stop" : "Start"}
            </Button>
          </div>
        </div>
      </div>
    </PageLayoutWrapper>
  );
}

export default App;
