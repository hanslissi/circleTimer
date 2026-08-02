import type { TimerStep } from "@app-types/Timer.types";

export type TimerConfigState = {
  steps: TimerStep[];
  editingStepIdx: number | undefined;
  draftStep: TimerStep;
};

export type TimerConfigActions = {
  persistDraft: () => void;
  deleteStep: (step: TimerStep) => void;
  selectEditingStep: (step: TimerStep | undefined) => void;
  toggleEditingStep: (step: TimerStep) => void;
  setWorkSeconds: (seconds: number) => void;
  setRestSeconds: (seconds: number) => void;
  setRepetitions: (repetitions: number) => void;
};

export type TimerConfigSlice = TimerConfigState & TimerConfigActions;
