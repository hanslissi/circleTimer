import { useState } from "react";
import { Thumbwheel } from "./components/Thumbwheel/Thumbwheel";
import { LightProgressBar } from "./components/LightProgressBar/LightProgressBar";

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
      <LightProgressBar value={hours} min={-10} max={-5} color="autumn"/>
    </div>
  );
}

export default App;
