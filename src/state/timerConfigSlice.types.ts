import type { TimerStep } from "@app-types/Timer.types";

export type TimerConfigState = {
  steps: TimerStep[];
  editingStepIdx: number | undefined;
  draftStep: TimerStep;
};

export type TimerConfigActions = {
  add: () => void;
  remove: () => void;
  selectEditingStep: (step: TimerStep) => void;
  toggleEditingStep: (step: TimerStep) => void;
  setWorkSeconds: (seconds: number) => void;
  setRestSeconds: (seconds: number) => void;
};

export type TimerConfigSlice = TimerConfigState & TimerConfigActions;
