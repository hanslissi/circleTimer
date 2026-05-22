import { initialState } from "./stopwatchSlice.constants";
import {
  applyStart,
  applyStop,
  applySetSecondsPassed,
  createStopwatchTimer,
} from "./stopwatchSlice.bl";
import type { StateCreator } from "zustand";
import type { StopwatchSlice } from "./stopwatchSlice.types";

export const createStopwatchSlice: StateCreator<StopwatchSlice> = (set, get) => {
  const stopwatchTimer = createStopwatchTimer((secondsPassed) => get().setSecondsPassed(secondsPassed));

  return {
    ...initialState,
    start() {
      if (get().isRunning) {
        return;
      }

      stopwatchTimer.start();
      set((state) => applyStart(state));
    },
    stop() {
      if (!get().isRunning) {
        return;
      }

      stopwatchTimer.stop();
      set((state) => applyStop(state));
    },
    setSecondsPassed(seconds: number) {
      set((state) => applySetSecondsPassed(state, seconds));
    },
  };
};
