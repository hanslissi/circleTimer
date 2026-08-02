import { useNavigate } from "react-router";
import { useState } from "react";
import { clsx } from "clsx";
import Button from "@components/Button";
import { PageLayoutWrapper } from "@layouts/PageLayoutWrapper/PageLayoutWrapper";
import CircleTimerStepsEdit from "@components/CircleTimerSteps/CircleTimerStepsEdit";
import { ROUTE_PATHS } from "@pages/constants";
import { useTimerConfigStore } from "@state/timerConfig/useTimerConfigStore";
import styles from "./EditPage.module.css";
import AddEditSheet from "./components/AddEditSheet";
import type { TimerStep } from "@app-types/Timer.types";

function EditPage() {
  const navigate = useNavigate();
  const selectEditingStep = useTimerConfigStore((state) => state.selectEditingStep);

  const [showAddEditSheet, setShowAddEditSheet] = useState(false);

  const handleClickSave = () => {
    navigate(ROUTE_PATHS.HOME);
  };

  const handleClickAddStep = () => {
    selectEditingStep(undefined);
    setShowAddEditSheet(true);
  };

  const handleClickEditStep = (timerStep: TimerStep) => {
    selectEditingStep(timerStep);
    setShowAddEditSheet(true);
  };

  const handleClickDismissSheet = () => {
    setShowAddEditSheet(false);
  };

  return (
    <PageLayoutWrapper>
      <div className={styles.circleTimerEdit}>
        <div className={styles.stepsList}>
          <CircleTimerStepsEdit onEditStep={handleClickEditStep} />
          <Button onClick={handleClickAddStep}>Add Step</Button>
        </div>
        <div className={clsx(styles.buttonsSection, styles.bottomFloading)}>
          <Button onClick={handleClickSave} className={styles.saveButton}>
            Save
          </Button>
        </div>
      </div>
      <AddEditSheet show={showAddEditSheet} onDismiss={handleClickDismissSheet} />
    </PageLayoutWrapper>
  );
}

export default EditPage;
