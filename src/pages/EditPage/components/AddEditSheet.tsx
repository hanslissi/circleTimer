import { clsx } from "clsx";
import { Sheet } from "@components/Sheet";
import { TimerStepEdit } from "@components/TimerStep";
import Thumbwheel from "@components/Thumbwheel";
import Button from "@components/Button";
import { useTimerConfigStore } from "@state/timerConfig/useTimerConfigStore";
import { getEditingStep, getIsEditingDraft } from "@state/timerConfig/timerConfigSlice.selectors";
import TIMER_CONFIG from "@configs/timer.config.json";
import pageStyles from "../EditPage.module.css";
import styles from "./AddEditSheet.module.css";

type Props = Readonly<{
  show: boolean;
  onDismiss: () => void;
}>;

const AddEditSheet = ({ show, onDismiss }: Props) => {
  const editingStep = useTimerConfigStore(getEditingStep);
  const isEditingDraft = useTimerConfigStore(getIsEditingDraft);
  const setWorkSeconds = useTimerConfigStore((state) => state.setWorkSeconds);
  const setRestSeconds = useTimerConfigStore((state) => state.setRestSeconds);
  const setRepetitions = useTimerConfigStore((state) => state.setRepetitions);
  const persistDraft = useTimerConfigStore((state) => state.persistDraft);
  const deleteStep = useTimerConfigStore((state) => state.deleteStep);

  const sheetTitle = isEditingDraft ? "Add timer step" : "Edit timer step";

  const handleClickDiscard = () => {
    onDismiss();
  };

  const handleClickAddStep = () => {
    persistDraft();
    onDismiss();
  };

  const handleClickDeleteStep = () => {
    deleteStep(editingStep);
    onDismiss();
  };

  const handleClickSave = () => {
    onDismiss();
  };

  return (
    <Sheet title={sheetTitle} show={show}>
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
        <div className={pageStyles.buttonsSection}>
          {isEditingDraft ? (
            <>
              <Button onClick={handleClickDiscard}>Discard</Button>
              <Button onClick={handleClickAddStep} className={styles.addButton}>
                Add
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleClickDeleteStep}>Delete Step</Button>
              <Button onClick={handleClickSave} className={styles.addButton}>
                Save
              </Button>
            </>
          )}
        </div>
      </div>
    </Sheet>
  );
};

export default AddEditSheet;
