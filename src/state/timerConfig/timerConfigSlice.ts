import { initialState } from "./timerConfigSlice.constants";
import {
  applyAdd,
  applyRemove,
  applySetRestSeconds,
  applySetWorkSeconds,
  applySelectEditingStep,
  applyToggleEditingStep,
} from "./timerConfigSlice.bl";
import type { StateCreator } from "zustand";
import type { TimerConfigSlice } from "./timerConfigSlice.types";
import type { TimerStep } from "@app-types/Timer.types";

export const createTimerConfigSlice: StateCreator<TimerConfigSlice> = (set) => ({
  ...initialState,
  add() {
    set((state) => applyAdd(state));
  },
  remove() {
    set((state) => applyRemove(state));
  },
  selectEditingStep(step: TimerStep) {
    set((state) => applySelectEditingStep(state, step));
  },
  toggleEditingStep(step: TimerStep) {
    set((state) => applyToggleEditingStep(state, step));
  },
  setWorkSeconds(seconds) {
    set((state) => applySetWorkSeconds(state, seconds));
  },
  setRestSeconds(seconds) {
    set((state) => applySetRestSeconds(state, seconds));
  },
});
