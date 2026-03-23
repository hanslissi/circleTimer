import TIMER_CONFIG from "@configs/timer.config.json";
import { clamp } from "../utils/mathUtils";
import type { CircleTimer, TimerStep } from "@app-types/Timer.types";
import type { StateCreator } from "zustand";

type TimerConfigState = {
  timer: CircleTimer;
};

type TimerConfigActions = {
  addStep: (step: TimerStep) => void;
  removeStep: (stepIdx: number) => void;
  adjustRepetitions: (stepIdx: number, numRepetitions: number) => number | undefined;
  setWorkSeconds: (stepIdx: number, seconds: number) => void;
  setRestSeconds: (stepIdx: number, seconds: number) => void;
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
  removeStep(stepIdx) {
    set((state) => ({
      timer: {
        ...state.timer,
        steps: [
          ...state.timer.steps.slice(0, stepIdx),
          ...state.timer.steps.slice(stepIdx + 1),
        ],
      },
    }));
  },
  adjustRepetitions(stepIdx, repetitionsDelta) {
    const stepToAdjust = get().timer.steps[stepIdx];
    if (!stepToAdjust) {
      return;
    }
    const adjustedRepetitions = stepToAdjust.repetitions + repetitionsDelta;

    const adjustedStep: TimerStep = {
      ...stepToAdjust,
      repetitions: clamp(
        adjustedRepetitions,
        0,
        TIMER_CONFIG.maxRepetitions,
      ),
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

    return adjustedRepetitions;
  },
  setWorkSeconds(stepIdx, seconds) {
    const stepToAdjust = get().timer.steps[stepIdx];
    if (!stepToAdjust) {
      return;
    }
    const adjustedStep: TimerStep = {
      ...stepToAdjust,
      workSeconds: clamp(seconds, 0, TIMER_CONFIG.maxSeconds),
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
  setRestSeconds(stepIdx, seconds) {
    const stepToAdjust = get().timer.steps[stepIdx];
    if (!stepToAdjust) {
      return;
    }
    const adjustedStep: TimerStep = {
      ...stepToAdjust,
      restSeconds: clamp(seconds, 0, TIMER_CONFIG.maxSeconds),
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
