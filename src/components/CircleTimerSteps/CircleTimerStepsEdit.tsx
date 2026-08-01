import { TimerStepEdit } from "@components/TimerStep";
import { useTimerConfigStore } from "@state/timerConfig/useTimerConfigStore";
import styles from "./CircleTimerSteps.module.css";
import type { TimerStep } from "@app-types/Timer.types";

type Props = Readonly<{
  onEditStep: (timerStep: TimerStep) => void;
}>;

const CircleTimerEdit = ({ onEditStep }: Props) => {
  const timerSteps = useTimerConfigStore((state) => state.steps);
  const selectEditingStep = useTimerConfigStore((state) => state.selectEditingStep);
  const setWorkSeconds = useTimerConfigStore((state) => state.setWorkSeconds);
  const setRestSeconds = useTimerConfigStore((state) => state.setRestSeconds);
  const setRepetitions = useTimerConfigStore((state) => state.setRepetitions);

  return (
    <div className={styles.circleTimerContainer}>
      {timerSteps.map((step) => (
        <TimerStepEdit
          timerStep={step}
          showEditButton
          onEditStep={onEditStep}
          onSelect={selectEditingStep}
          onWorkSecondsChange={setWorkSeconds}
          onRestSecondsChange={setRestSeconds}
          onRepetitionsChange={setRepetitions}
        />
      ))}
    </div>
  );
};

export default CircleTimerEdit;
