import { useCallback, useState } from "react";
import { timerAudio } from "@audio/timerAudios";
import { TimerStepDisplay } from "@components/TimerStep";
import { calcStepDuration } from "@utils/timerUtils";
import { useStopwatchStore } from "@state/stopwatch/useStopwatchStore";
import styles from "./CircleTimerSteps.module.css";
import type { TimerStep } from "@app-types/Timer.types";

type Props = Readonly<{
  timerSteps: TimerStep[];
}>;

const CircleTimerDisplay = ({ timerSteps }: Props) => {
  const isStopwatchRunning = useStopwatchStore((state) => state.isRunning);
  const secondsPassed = useStopwatchStore((state) => state.secondsPassed);
  const resetStopWatch = useStopwatchStore((state) => state.reset);
  const [activeTimerStepIdx, setActiveTimerStepIdx] = useState(0);

  const handleStepEnd = useCallback(() => {
    if (activeTimerStepIdx >= timerSteps.length - 1) {
      setActiveTimerStepIdx(0);
      resetStopWatch();
    } else {
      setActiveTimerStepIdx((prev) => prev + 1);
    }
    timerAudio.playRest();
  }, [activeTimerStepIdx, setActiveTimerStepIdx, timerSteps.length, resetStopWatch]);

  const handleWorkEnd = useCallback(() => {
    timerAudio.playWork();
  }, []);

  const handleRestEnd = useCallback(() => {
    timerAudio.playRest();
  }, []);

  return (
    <div className={styles.circleTimerContainer}>
      {timerSteps.map((timerStep, stepIdx) => {
        // TODO: This is not efficient at all just shitty API design...
        const secondsBeforeThisStep = timerSteps
          .slice(0, stepIdx)
          .reduce((acc, s) => acc + calcStepDuration(s), 0);

        const secondsPassedForStep = Math.max(
          Math.min(secondsPassed - secondsBeforeThisStep, calcStepDuration(timerStep)),
          0,
        );

        const isStepActive = isStopwatchRunning && stepIdx === activeTimerStepIdx;
        return (
          <TimerStepDisplay
            key={stepIdx}
            active={isStepActive}
            timerStep={timerStep}
            secondsPassed={secondsPassedForStep}
            onStepEnd={handleStepEnd}
            onWorkEnd={handleWorkEnd}
            onRestEnd={handleRestEnd}
          />
        );
      })}
    </div>
  );
};

export default CircleTimerDisplay;
