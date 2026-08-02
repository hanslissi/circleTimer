import { useNavigate } from "react-router";
import { clsx } from "clsx";
import Button from "@components/Button";
import { useTimerConfigStore } from "@state/timerConfig/useTimerConfigStore";
import { PageLayoutWrapper } from "@layouts/PageLayoutWrapper/PageLayoutWrapper";
import CircleTimerStepsDisplay from "@components/CircleTimerSteps/CircleTimerStepsDisplay";
import { useStopwatchStore } from "@state/stopwatch/useStopwatchStore";
import { ROUTE_PATHS } from "@pages/constants";
import { secondsToText } from "@utils/timeDisplayUtils";
import { calcTimerDuration } from "@utils/timerUtils";
import pageStyles from "../PageStyles.module.css";
import styles from "./TimerPage.module.css";

const TimerPage = () => {
  const navigate = useNavigate();
  const isStopwatchRunning = useStopwatchStore((state) => state.isRunning);
  const secondsPassed = useStopwatchStore((state) => state.secondsPassed);
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
    if (isStopwatchRunning) {
      resetStopwatch();
    }
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
        <div className={clsx(pageStyles.bottomFloating, pageStyles.actionBox)}>
          <h4 className={clsx(pageStyles.durationDisplay, "shinyTextLight")}>
            {secondsToText(calcTimerDuration(timerSteps) - secondsPassed)}
          </h4>
          <div className={pageStyles.buttonsSection}>
            <Button onClick={handleClickEdit}>Edit</Button>
            <Button onClick={handleClickStartStop} className={pageStyles.primaryButton}>
              {isStopwatchRunning ? "Stop" : "Start"}
            </Button>
          </div>
        </div>
      </div>
    </PageLayoutWrapper>
  );
};

export default TimerPage;
