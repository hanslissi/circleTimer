import { create } from "zustand";
import { createTimerConfigSlice, type TimerConfigSlice } from "./timerConfigSlice";

export const useTimerConfigStore = create<TimerConfigSlice>((...a) => ({
  ...createTimerConfigSlice(...a)
}))