import { useNavigate } from "react-router";
import { useState } from "react";
import { clsx } from "clsx";
import Button from "@components/Button";
import { PageLayoutWrapper } from "@layouts/PageLayoutWrapper/PageLayoutWrapper";
import CircleTimerStepsEdit from "@components/CircleTimerSteps/CircleTimerStepsEdit";
import { ROUTE_PATHS } from "@pages/constants";
import { useTimerConfigStore } from "@state/timerConfig/useTimerConfigStore";
import { secondsToText } from "@utils/timeDisplayUtils";
import { calcTimerDuration } from "@utils/timerUtils";
import pageStyles from "../PageStyles.module.css";
import styles from "./EditPage.module.css";
import AddEditSheet from "./components/AddEditSheet";
import type { TimerStep } from "@app-types/Timer.types";

function EditPage() {
  const navigate = useNavigate();
  const selectEditingStep = useTimerConfigStore((state) => state.selectEditingStep);
  const timerSteps = useTimerConfigStore((state) => state.steps);

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
        <div className={clsx(pageStyles.bottomFloating, pageStyles.actionBox)}>
          <h4 className={clsx(pageStyles.durationDisplay, "shinyTextLight")}>
            {secondsToText(calcTimerDuration(timerSteps))}
          </h4>
          <div className={pageStyles.buttonsSection}>
            <Button onClick={handleClickSave} className={pageStyles.primaryButton}>
              Save
            </Button>
          </div>
        </div>
      </div>
      <AddEditSheet show={showAddEditSheet} onDismiss={handleClickDismissSheet} />
    </PageLayoutWrapper>
  );
}

export default EditPage;
