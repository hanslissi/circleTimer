import { clsx } from "clsx";
import { useCallback, useState } from "react";
import { timerAudio } from "@audio/timerAudios";
import { TimerStepDisplay } from "@components/TimerStep";
import { calcStepDuration } from "@utils/timerUtils";
import { useStopwatchStore } from "@state/stopwatch/useStopwatchStore";
import styles from "./CircleTimer.module.css";
import type { TimerStep } from "@app-types/Timer.types";

type Props = Readonly<{
  timerSteps: TimerStep[];
}>;

const CircleTimerDisplay = ({ timerSteps }: Props) => {
  const secondsPassed = useStopwatchStore((state) => state.secondsPassed);
  const stopStopwatch = useStopwatchStore((state) => state.stop);
  const [activeTimerStepIdx, setActiveTimerStepIdx] = useState(0);

  const handleStepEnd = useCallback(() => {
    if (activeTimerStepIdx >= timerSteps.length - 1) {
      setActiveTimerStepIdx(0);
      stopStopwatch();
    } else {
      setActiveTimerStepIdx((prev) => prev + 1);
    }
    timerAudio.playRest();
  }, [activeTimerStepIdx, setActiveTimerStepIdx, timerSteps.length, stopStopwatch]);

  const handleWorkEnd = useCallback(() => {
    timerAudio.playWork();
  }, []);

  const handleRestEnd = useCallback(() => {
    timerAudio.playRest();
  }, []);

  return (
    <div className={clsx(styles.metalSlant, "metalSlantIndent")}>
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

          return (
            <TimerStepDisplay
              key={stepIdx}
              active={stepIdx === activeTimerStepIdx}
              timerStep={timerStep}
              secondsPassed={secondsPassedForStep}
              onStepEnd={handleStepEnd}
              onWorkEnd={handleWorkEnd}
              onRestEnd={handleRestEnd}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CircleTimerDisplay;
