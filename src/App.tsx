import { useState } from "react";
import { clsx } from "clsx";
import Thumbwheel from "@components/Thumbwheel";
import Button from "@components/Button";
import LightProgressBar from "@components/LightProgressBar";
import DurationInput from "@components/DurationInput";
import { useTimerConfigStore } from "@state/useTimerConfigStore";
import TimerStepDisplay from "@components/TimerStepDisplay";
import TIMER_CONFIG from "@configs/timer.config.json";
import { PageLayoutWrapper } from "./layouts/PageLayoutWrapper/PageLayoutWrapper";
import styles from "./App.module.css";

function App() {
  const timerSteps = useTimerConfigStore((state) => state.timer.steps);
  const addTimerStep = useTimerConfigStore((state) => state.addStep);
  const removeTimerStep = useTimerConfigStore((state) => state.removeStep);
  const adjustRepetitions = useTimerConfigStore(
    (state) => state.adjustRepetitions,
  );
  const setTimerStepWorkSec = useTimerConfigStore(
    (state) => state.setWorkSeconds,
  );
  const setTimerStepRestSec = useTimerConfigStore(
    (state) => state.setRestSeconds,
  );
  const [workSeconds, setWorkSeconds] = useState(0);
  const [restSeconds, setRestSeconds] = useState(0);
  const [selectedStepIdx, setSelectedStepIdx] = useState<number | undefined>();
  const workSecondsInputValue = selectedStepIdx === undefined ? workSeconds : timerSteps[selectedStepIdx].workSeconds;
  const restSecondsInputValue = selectedStepIdx === undefined ? restSeconds : timerSteps[selectedStepIdx].restSeconds;

  const handleSelectStep = (stepIdx: number) => {
    if (selectedStepIdx === stepIdx) {
      setSelectedStepIdx(undefined);
    } else {
      setSelectedStepIdx(stepIdx);
      setWorkSeconds(timerSteps[stepIdx].workSeconds);
      setRestSeconds(timerSteps[stepIdx].restSeconds);
    }
  };

  const handleClickAdd = () => {
    if (selectedStepIdx === undefined) {
      addTimerStep({ repetitions: 1, workSeconds, restSeconds });
    } else {
      adjustRepetitions(selectedStepIdx, 1);
    }
  };

  const handleClickRemove = () => {
    const affectedStepIdx = selectedStepIdx ?? timerSteps.length - 1;
    const adjustedRepetitons = adjustRepetitions(affectedStepIdx, -1);

    if (adjustedRepetitons !== undefined && adjustedRepetitons <= 0) {
      removeTimerStep(affectedStepIdx);
      setSelectedStepIdx(undefined);
    }
  };

  const handleChangeWorkSeconds = (seconds: number) => {
    if (selectedStepIdx !== undefined) {
      setTimerStepWorkSec(selectedStepIdx, seconds);
    }
    setWorkSeconds(seconds);
  };

  const handleChangeRestSeconds = (seconds: number) => {
    if (selectedStepIdx !== undefined) {
      setTimerStepRestSec(selectedStepIdx, seconds);
    }
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
                onSelect={handleSelectStep}
                selected={selectedStepIdx === stepIdx}
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
              value={workSecondsInputValue}
              onChange={handleChangeWorkSeconds}
            />
            <DurationInput
              min={0}
              max={TIMER_CONFIG.maxSeconds}
              color="autumn"
              label="Rest time"
              value={restSecondsInputValue}
              onChange={handleChangeRestSeconds}
            />
          </div>
          <div className={styles.thumbwheelsSection}>
            <div className={styles.thumbwheelContainer}>
              <Thumbwheel
                min={0}
                max={TIMER_CONFIG.maxSeconds}
                value={workSecondsInputValue}
                onChange={handleChangeWorkSeconds}
              />
              <LightProgressBar
                min={0}
                max={TIMER_CONFIG.maxSeconds}
                value={workSecondsInputValue}
              />
            </div>
            <div className={styles.thumbwheelContainer}>
              <LightProgressBar
                min={0}
                max={TIMER_CONFIG.maxSeconds}
                color="autumn"
                value={restSecondsInputValue}
              />
              <Thumbwheel
                min={0}
                max={TIMER_CONFIG.maxSeconds}
                value={restSecondsInputValue}
                onChange={handleChangeRestSeconds}
                color="autumn"
              />
            </div>
          </div>
          <div className={styles.buttonsSection}>
            <Button onClick={handleClickAdd} className={styles.button}>
              Add
            </Button>
            <Button onClick={handleClickRemove} className={styles.button}>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </PageLayoutWrapper>
  );
}

export default App;
