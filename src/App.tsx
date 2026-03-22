import { useState } from "react";
import Thumbwheel from "@components/Thumbwheel";
import Button from "@components/Button";
import LightProgressBar from "@components/LightProgressBar";
import DurationInput from "@components/DurationInput";
import { PageLayoutWrapper } from "./layouts/PageLayoutWrapper/PageLayoutWrapper";
import styles from "./App.module.css";

function App() {
  const [secondsWork, setSecondsWork] = useState(0);
  const [secondsRest, setSecondsRest] = useState(0);

  return (
    <PageLayoutWrapper>
      <div className={styles.circleTimer}>
        <div className={styles.circleTimerDisplay}></div>
        <div className={styles.interfaceSection}>
          <div className={styles.timeDisplaysSection}>
            <DurationInput
              min={0}
              max={3599}
              label="Work time"
              value={secondsWork}
              onChange={setSecondsWork}
            />
            <DurationInput
              min={0}
              max={3599}
              color="autumn"
              label="Rest time"
              value={secondsRest}
              onChange={setSecondsRest}
            />
          </div>
          <div className={styles.thumbwheelsSection}>
            <div className={styles.thumbwheelContainer}>
              <Thumbwheel
                min={0}
                max={3599}
                value={secondsWork}
                onChange={setSecondsWork}
              />
              <LightProgressBar min={0} max={3599} value={secondsWork} />
            </div>
            <div className={styles.thumbwheelContainer}>
              <LightProgressBar
                min={0}
                max={3599}
                color="autumn"
                value={secondsRest}
              />
              <Thumbwheel
                min={0}
                max={3599}
                value={secondsRest}
                onChange={setSecondsRest}
                color="autumn"
              />
            </div>
          </div>
          <div className={styles.buttonsSection}>
            <Button
              onClick={() => setSecondsWork(50)}
              className={styles.button}
            >
              Add
            </Button>
            <Button
              onClick={() => console.log("Remove")}
              className={styles.button}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </PageLayoutWrapper>
  );
}

export default App;
