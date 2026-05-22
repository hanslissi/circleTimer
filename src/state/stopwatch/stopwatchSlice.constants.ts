import type { StopwatchState } from "./stopwatchSlice.types";

export const initialState: StopwatchState = {
  secondsPassed: 0,
  isRunning: false,
};

export const TICKING_INTERVAL = 200;