import { useState } from "react";
import { Thumbwheel } from "./components/Thumbwheel/Thumbwheel";
import { LightProgressBar } from "./components/LightProgressBar/LightProgressBar";
import { SegmentInput } from "./components/SegmentInput/SegmentInput";
import { Button } from "./components/Button/Button";
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
            <SegmentInput
              isDuration
              label="Work time"
              value={secondsWork}
              onChange={setSecondsWork}
            />
            <SegmentInput
              isDuration
              color="autumn"
              label="Rest time"
              value={secondsRest}
              onChange={setSecondsRest}
            />
          </div>
          <div className={styles.thumbwheelsSection}>
            <div className={styles.thumbwheelContainer}>
              <Thumbwheel onChange={setSecondsWork} />
              <LightProgressBar value={secondsWork} min={0} max={659} />
            </div>
            <div className={styles.thumbwheelContainer}>
              <LightProgressBar color="autumn" value={secondsRest} min={0} max={659}/>
              <Thumbwheel color="autumn" onChange={setSecondsRest} />
            </div>
          </div>
          <div className={styles.buttonsSection}>
            <Button
              onClick={() => console.log("Add")}
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
