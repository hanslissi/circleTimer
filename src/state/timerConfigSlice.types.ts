import type { TimerStep } from "@app-types/Timer.types";

export type TimerConfigState = {
  steps: TimerStep[];
  editingStepIdx: number | undefined;
  draftStep: TimerStep;
};

export type TimerConfigActions = {
  add: () => void;
  remove: () => void;
  toggleEditingStep: (stepIdx: number) => void;
  setWorkSeconds: (seconds: number) => void;
  setRestSeconds: (seconds: number) => void;
  setWorkSecondsStep: (stepIdx: number, seconds: number) => void;
  setRestSecondsStep: (stepIdx: number, seconds: number) => void;
};

export type TimerConfigSlice = TimerConfigState & TimerConfigActions;
