import { clsx }  from "clsx";
import TimerStepEdit from "@components/TimerStepEdit";
import { useTimerConfigStore } from "@state/useTimerConfigStore";
import styles from "./CircleTimerEdit.module.css"; 

const CircleTimerEdit = () => {
  const timerSteps = useTimerConfigStore((state) => state.steps);
  const editingStepIdx = useTimerConfigStore((state) => state.editingStepIdx);
  const toggleEditingStep = useTimerConfigStore(
    (state) => state.toggleEditingStep,
  );
  const selectEditingStep = useTimerConfigStore((state) => state.selectEditingStep);

  return (
    <div className={clsx(styles.metalSlant, "metalSlantIndent")}>
      <div className={styles.circleTimerContainer}>
        {timerSteps.map((step, stepIdx) => (
          <TimerStepEdit
            timerStep={step}
            selected={editingStepIdx === stepIdx}
            onSelect={selectEditingStep}
            onToggleSelect={toggleEditingStep}
          />
        ))}
      </div>
    </div>

  );
}

export default CircleTimerEdit;