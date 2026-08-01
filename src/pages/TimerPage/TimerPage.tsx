import { useNavigate } from "react-router";
import Button from "@components/Button";
import { useTimerConfigStore } from "@state/timerConfig/useTimerConfigStore";
import { PageLayoutWrapper } from "@layouts/PageLayoutWrapper/PageLayoutWrapper";
import CircleTimerStepsDisplay from "@components/CircleTimerSteps/CircleTimerStepsDisplay";
import { useStopwatchStore } from "@state/stopwatch/useStopwatchStore";
import { ROUTE_PATHS } from "@pages/constants";
import styles from "./TimerPage.module.css";

const TimerPage = () => {
  const navigate = useNavigate();
  const isStopwatchRunning = useStopwatchStore((state) => state.isRunning);
  const startStopwatch = useStopwatchStore((state) => state.start);
  const resetStopwatch = useStopwatchStore((state) => state.reset);
  const timerSteps = useTimerConfigStore((state) => state.steps);

  const handleClickStartStop = () => {
    if (isStopwatchRunning) {
      resetStopwatch();
    } else {
      startStopwatch();
    }
  };

  const handleClickEdit = () => {
    navigate(ROUTE_PATHS.EDIT);
  };

  return (
    <PageLayoutWrapper>
      <div className={styles.circleTimer}>
        <div className={styles.timerStepsSection}>
          <CircleTimerStepsDisplay
            timerSteps={timerSteps}
            key={isStopwatchRunning ? "running" : "idle"}
          />
        </div>
        <div className={styles.buttonsSection}>
          <Button onClick={handleClickEdit} className={styles.editButton}>
            Edit
          </Button>
          <Button onClick={handleClickStartStop} className={styles.startStopButton}>
            {isStopwatchRunning ? "Stop" : "Start"}
          </Button>
        </div>
      </div>
    </PageLayoutWrapper>
  );
};

export default TimerPage;
