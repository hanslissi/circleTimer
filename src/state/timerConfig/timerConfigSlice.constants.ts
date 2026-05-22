import TIMER_CONFIG from "@configs/timer.config.json";
import type { TimerStep } from "@app-types/Timer.types";
import type { TimerConfigState } from "./timerConfigSlice.types";

export const initialDraftStep: TimerStep = {
  workSeconds: TIMER_CONFIG.minSeconds,
  restSeconds: TIMER_CONFIG.minSeconds,
  repetitions: TIMER_CONFIG.minRepetitions,
};

export const initialState: TimerConfigState = {
  steps: [{ ...initialDraftStep }],
  editingStepIdx: undefined,
  draftStep: { ...initialDraftStep },
};
