import { create } from "zustand";
import { createTimerConfigSlice } from "./timerConfigSlice";
import type { TimerConfigSlice } from "./timerConfigSlice.types";

export const useTimerConfigStore = create<TimerConfigSlice>((...a) => ({
  ...createTimerConfigSlice(...a)
}))