import { initialState } from "./timerConfigSlice.constants";
import {
  applyAdd,
  applyRemove,
  applySetRestSeconds,
  applySetRestSecondsStep,
  applySetWorkSeconds,
  applySetWorkSecondsStep,
  applyToggleEditingStep,
} from "./timerConfigSlice.bl";
import type { StateCreator } from "zustand";
import type { TimerConfigSlice } from "./timerConfigSlice.types";

export const createTimerConfigSlice: StateCreator<TimerConfigSlice> = (
  set,
) => ({
  ...initialState,
  add() {
    set((state) => applyAdd(state));
  },
  remove() {
    set((state) => applyRemove(state));
  },
  toggleEditingStep(stepIdx: number) {
    set((state) => applyToggleEditingStep(state, stepIdx));
  },
  setWorkSeconds(seconds) {
    set((state) => applySetWorkSeconds(state, seconds));
  },
  setRestSeconds(seconds) {
    set((state) => applySetRestSeconds(state, seconds));
  },
  setWorkSecondsStep(stepIdx, seconds) {
    set((state) => applySetWorkSecondsStep(state, stepIdx, seconds));
  },
  setRestSecondsStep(stepIdx, seconds) {
    set((state) => applySetRestSecondsStep(state, stepIdx, seconds));
  },
});
