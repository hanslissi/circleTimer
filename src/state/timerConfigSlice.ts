import { clamp } from "../utils/mathUtils";
import type { CircleTimer, TimerStep } from "@app-types/Timer.types";
import type { StateCreator } from "zustand";

type TimerConfigState = {
  timer: CircleTimer;
};

type TimerConfigActions = {
  addStep: (step: TimerStep) => void;
  adjustRepetitions: (stepIdx: number, numRepetitions: number) => void;
  adjustWorkSeconds: (stepIdx: number, seconds: number) => void;
  adjustRestSeconds: (stepIdx: number, seconds: number) => void;
};

export type TimerConfigSlice = TimerConfigState & TimerConfigActions;

export const createTimerConfigSlice: StateCreator<TimerConfigSlice> = (
  set,
  get,
) => ({
  timer: {
    steps: [],
  },
  addStep(step) {
    set((state) => ({
      timer: {
        ...state.timer,
        steps: [...state.timer.steps, step],
      },
    }));
  },
  adjustRepetitions(stepIdx, numRepetitions) {
    const stepToAdjust = get().timer.steps[stepIdx];
    if (!stepToAdjust) {
      return;
    }
    const adjustedStep: TimerStep = {
      ...stepToAdjust,
      repetitions: clamp(stepToAdjust.repetitions + numRepetitions, 0, 99),
    };
    set((state) => ({
      timer: {
        ...state.timer,
        steps: [
          ...state.timer.steps.slice(0, stepIdx),
          adjustedStep,
          ...state.timer.steps.slice(stepIdx + 1),
        ],
      },
    }));
  },
  adjustWorkSeconds(stepIdx, seconds) {
    const stepToAdjust = get().timer.steps[stepIdx];
    if (!stepToAdjust) {
      return;
    }
    const adjustedStep: TimerStep = {
      ...stepToAdjust,
      workSeconds: seconds,
    };
    set((state) => ({
      timer: {
        ...state.timer,
        steps: [
          ...state.timer.steps.slice(0, stepIdx),
          adjustedStep,
          ...state.timer.steps.slice(stepIdx + 1),
        ],
      },
    }));
  },
  adjustRestSeconds(stepIdx, seconds) {
    const stepToAdjust = get().timer.steps[stepIdx];
    if (!stepToAdjust) {
      return;
    }
    const adjustedStep: TimerStep = {
      ...stepToAdjust,
      restSeconds: seconds,
    };
    set((state) => ({
      timer: {
        ...state.timer,
        steps: [
          ...state.timer.steps.slice(0, stepIdx),
          adjustedStep,
          ...state.timer.steps.slice(stepIdx + 1),
        ],
      },
    }));
  },
});
