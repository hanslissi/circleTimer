import { useState } from "react";
import { Thumbwheel } from "./components/Thumbwheel/Thumbwheel";
import { LightProgressBar } from "./components/LightProgressBar/LightProgressBar";
import { SegmentInput } from "./components/SegmentInput/SegmentInput";
import { Diode } from "./components/Diode/Diode";

function App() {
  const [hours, setHours] = useState(0);

  return (
    <div>
      <h1>{hours} hours</h1>
      <Thumbwheel color={"teal"} onChange={(v) => setHours(v)} stepSize={25} />
      <Thumbwheel
        color={"autumn"}
        onChange={(v) => setHours(v)}
        stepSize={25}
      />
      <LightProgressBar value={hours} min={0} max={60} />
      <LightProgressBar value={hours} min={-10} max={-5} color="autumn" />
      <SegmentInput isDuration={false} isDisplayOnly value={hours} />
      <SegmentInput
        isDuration
        onChange={(v) => {
          setHours(v);
          console.log(v);
        }}
        value={hours}
        color="autumn"
        size="small"
      />
      <SegmentInput isDuration isDisplayOnly value={hours} color="graysky" />
      <Diode on />
      <Diode />
    </div>
  );
}

export default App;
