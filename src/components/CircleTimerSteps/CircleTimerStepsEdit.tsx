import { TimerStepEdit } from "@components/TimerStep";
import { useTimerConfigStore } from "@state/timerConfig/useTimerConfigStore";
import styles from "./CircleTimerSteps.module.css";

const CircleTimerEdit = () => {
  const timerSteps = useTimerConfigStore((state) => state.steps);
  const editingStepIdx = useTimerConfigStore((state) => state.editingStepIdx);
  const toggleEditingStep = useTimerConfigStore((state) => state.toggleEditingStep);
  const selectEditingStep = useTimerConfigStore((state) => state.selectEditingStep);
  const setWorkSeconds = useTimerConfigStore((state) => state.setWorkSeconds);
  const setRestSeconds = useTimerConfigStore((state) => state.setRestSeconds);
  const setRepetitions = useTimerConfigStore((state) => state.setRepetitions);

  return (
    <div className={styles.circleTimerContainer}>
      {timerSteps.map((step, stepIdx) => (
        <TimerStepEdit
          timerStep={step}
          selected={editingStepIdx === stepIdx}
          onSelect={selectEditingStep}
          onToggleSelect={toggleEditingStep}
          onWorkSecondsChange={setWorkSeconds}
          onRestSecondsChange={setRestSeconds}
          onRepetitionsChange={setRepetitions}
        />
      ))}
    </div>
  );
};

export default CircleTimerEdit;
