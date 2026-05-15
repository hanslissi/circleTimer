import { useState } from "react";
import Thumbwheel from "@components/Thumbwheel";
import Button from "@components/Button";
import LightProgressBar from "@components/LightProgressBar";
import { useTimerConfigStore } from "@state/useTimerConfigStore";
import TIMER_CONFIG from "@configs/timer.config.json";
import { getEditingStep } from "@state/timerConfigSlice.selectors";
import { PageLayoutWrapper } from "@layouts/PageLayoutWrapper/PageLayoutWrapper";
import { DurationInput } from "@components/Duration";
import CircleTimerEdit from "@components/CircleTimer/CircleTimerEdit";
import CircleTimerDisplay from "@components/CircleTimer/CircleTimerDisplay";
import styles from "./App.module.css";

function App() {
  const [isStarted, setIsStarted] = useState(false);
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

  const handleToggleTimer = () => {
    setIsStarted((prev) => !prev);
  };

  return (
    <PageLayoutWrapper>
      <div className={styles.circleTimer}>
        {isStarted ? <CircleTimerDisplay timerSteps={timerSteps} /> : <CircleTimerEdit />}
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
            <Button onClick={handleToggleTimer} className={styles.button}>
              {isStarted ? "Stop" : "Start"}
            </Button>
          </div>
        </div>
      </div>
    </PageLayoutWrapper>
  );
}

export default App;
