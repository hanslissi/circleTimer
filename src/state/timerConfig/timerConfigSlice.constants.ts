import TIMER_CONFIG from "@configs/timer.config.json";
import type { TimerStep } from "@app-types/Timer.types";
import type { TimerConfigState } from "./timerConfigSlice.types";

export const initialDraftStep: TimerStep = {
  workSeconds: TIMER_CONFIG.minSeconds,
  restSeconds: TIMER_CONFIG.minSeconds,
  repetitions: TIMER_CONFIG.minRepetitions,
};

const demoConfigSteps: TimerStep[] = [
  {
    workSeconds: 30,
    restSeconds: 10,
    repetitions: 1,
  },
  {
    workSeconds: 20,
    restSeconds: 10,
    repetitions: 2,
  },
  {
    workSeconds: 20,
    restSeconds: 0,
    repetitions: 1,
  },
];

export const initialState: TimerConfigState = {
  steps: demoConfigSteps,
  editingStepIdx: undefined,
  draftStep: { ...initialDraftStep },
};
