import { useNavigate } from "react-router";
import { useState } from "react";
import { clsx } from "clsx";
import Button from "@components/Button";
import { PageLayoutWrapper } from "@layouts/PageLayoutWrapper/PageLayoutWrapper";
import CircleTimerStepsEdit from "@components/CircleTimerSteps/CircleTimerStepsEdit";
import { Sheet } from "@components/Sheet";
import { ROUTE_PATHS } from "@pages/constants";
import { useTimerConfigStore } from "@state/timerConfig/useTimerConfigStore";
import { TimerStepEdit } from "@components/TimerStep";
import { getEditingStep } from "@state/timerConfig/timerConfigSlice.selectors";
import TIMER_CONFIG from "@configs/timer.config.json";
import Thumbwheel from "@components/Thumbwheel";
import styles from "./EditPage.module.css";

function EditPage() {
  const navigate = useNavigate();
  const editingStep = useTimerConfigStore(getEditingStep);
  const selectEditingStep = useTimerConfigStore((state) => state.selectEditingStep);
  const setWorkSeconds = useTimerConfigStore((state) => state.setWorkSeconds);
  const setRestSeconds = useTimerConfigStore((state) => state.setRestSeconds);
  const setRepetitions = useTimerConfigStore((state) => state.setRepetitions);
  const addStep = useTimerConfigStore((state) => state.add);

  const [showAddSheet, setShowAddSheet] = useState(false);

  const handleClickSave = () => {
    navigate(ROUTE_PATHS.HOME);
  };

  const handleClickOpenAddSheet = () => {
    selectEditingStep(undefined);
    setShowAddSheet(true);
  };

  const handleClickDiscard = () => {
    setShowAddSheet(false);
  };

  const handleClickAddStep = () => {
    addStep();
    setShowAddSheet(false);
  };

  return (
    <PageLayoutWrapper>
      <div className={styles.circleTimerEdit}>
        <div className={styles.stepsList}>
          <CircleTimerStepsEdit />
          <Button onClick={handleClickOpenAddSheet}>Add Step</Button>
        </div>
        <div className={styles.buttonsSection}>
          <Button onClick={handleClickSave} className={styles.saveButton}>
            Save
          </Button>
        </div>
      </div>
      <Sheet title="Add timer step" show={showAddSheet}>
        <div className={styles.addSheetContent}>
          <div className={styles.legendHeader}>
            <h3 className={clsx(styles.workRestHeader, "shinyTextTeal")}>Work</h3>
            <h3 className={clsx(styles.workRestHeader, "shinyTextAutumn")}>Rest</h3>
            <h3 className={clsx(styles.repetitionsHeader, "shinyTextLight")}>Repetitions</h3>
          </div>
          <TimerStepEdit
            timerStep={editingStep}
            onWorkSecondsChange={setWorkSeconds}
            onRestSecondsChange={setRestSeconds}
            onRepetitionsChange={setRepetitions}
          />
          <div className={styles.thumbwheelsSection}>
            <div className={styles.thumbwheelWorkRest}>
              <Thumbwheel
                min={TIMER_CONFIG.minSeconds}
                max={TIMER_CONFIG.maxSeconds}
                value={editingStep.workSeconds}
                onChange={setWorkSeconds}
              />
              <Thumbwheel
                min={TIMER_CONFIG.minSeconds}
                max={TIMER_CONFIG.maxSeconds}
                value={editingStep.restSeconds}
                onChange={setRestSeconds}
                color="autumn"
              />
            </div>
            <Thumbwheel
              min={TIMER_CONFIG.minSeconds}
              max={TIMER_CONFIG.maxSeconds}
              value={editingStep.repetitions}
              onChange={setRepetitions}
              color="graysky"
            />
          </div>
          <div className={styles.buttonsSection}>
            <Button onClick={handleClickDiscard}>Discard</Button>
            <Button onClick={handleClickAddStep} className={styles.addButton}>
              Add
            </Button>
          </div>
        </div>
      </Sheet>
    </PageLayoutWrapper>
  );
}

export default EditPage;
