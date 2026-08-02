import { initialState } from "./timerConfigSlice.constants";
import {
  applyPersistDraft,
  applyDeleteStep,
  applySetRestSeconds,
  applySetWorkSeconds,
  applySelectEditingStep,
  applyToggleEditingStep,
  applySetRepetitions,
} from "./timerConfigSlice.bl";
import type { StateCreator } from "zustand";
import type { TimerConfigSlice } from "./timerConfigSlice.types";
import type { TimerStep } from "@app-types/Timer.types";

export const createTimerConfigSlice: StateCreator<TimerConfigSlice> = (set) => ({
  ...initialState,
  persistDraft() {
    set((state) => applyPersistDraft(state));
  },
  deleteStep(step: TimerStep) {
    set((state) => applyDeleteStep(state, step));
  },
  selectEditingStep(step: TimerStep | undefined) {
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
  setRepetitions(repetitions) {
    set((state) => applySetRepetitions(state, repetitions));
  },
});
