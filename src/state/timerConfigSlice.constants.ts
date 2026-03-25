import type { TimerStep } from "@app-types/Timer.types";
import type { TimerConfigState } from "./timerConfigSlice.types";

export const initialDraftStep: TimerStep = {
  workSeconds: 0,
  restSeconds: 0,
  repetitions: 0,
};

export const initialState: TimerConfigState = {
  steps: [{ ...initialDraftStep }],
  editingStepIdx: undefined,
  draftStep: { ...initialDraftStep },
};
