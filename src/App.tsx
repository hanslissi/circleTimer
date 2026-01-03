import { useState } from "react";
import { Thumbwheel } from "./components/Thumbwheel/Thumbwheel";

function App() {
  const [hours, setHours] = useState(0);

  return (
    <div>
      <h1>{hours} hours</h1>
      <Thumbwheel color={"teal"} onChange={(v) => setHours(v)} stepSize={25} />
      <Thumbwheel color={"autumn"} onChange={(v) => setHours(v)} stepSize={25} />
    </div>
  );
}

export default App;
