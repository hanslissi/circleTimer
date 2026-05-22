import { create } from "zustand";
import { createStopwatchSlice } from "./stopwatchSlice";
import type { StopwatchSlice } from "./stopwatchSlice.types";

export const useStopwatchStore = create<StopwatchSlice>((...a) => ({
  ...createStopwatchSlice(...a),
}));
