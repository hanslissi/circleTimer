import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createTimerConfigSlice } from "./timerConfigSlice";
import type { TimerConfigSlice } from "./timerConfigSlice.types";

export const useTimerConfigStore = create<TimerConfigSlice>()(
  persist((...a) => ({
    ...createTimerConfigSlice(...a),
  }), {
    name: 'timer-config'
  }),
);
