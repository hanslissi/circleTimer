import TIMER_CONFIG from "@configs/timer.config.json";
import { clamp } from "@utils/mathUtils";
import { initialDraftStep } from "./timerConfigSlice.constants";
import type { TimerStep } from "@app-types/Timer.types";
import type { TimerConfigState } from "./timerConfigSlice.types";

export function updateStep(
  steps: TimerStep[],
  stepIdx: number,
  partial: Partial<TimerStep>,
): TimerStep[] {
  return [
    ...steps.slice(0, stepIdx),
    { ...steps[stepIdx], ...partial },
    ...steps.slice(stepIdx + 1),
  ];
}

export function deleteStep(steps: TimerStep[], stepIdx: number): TimerStep[] {
  return [...steps.slice(0, stepIdx), ...steps.slice(stepIdx + 1)];
}

export function appendStep(steps: TimerStep[], newStep: TimerStep): TimerStep[] {
  return [...steps, { ...newStep }];
}

export function isEditingDraft(editingStepIdx: number | undefined): editingStepIdx is undefined {
  return editingStepIdx === undefined;
}

export function adjustRepetitions(
  step: TimerStep,
  repetitionsDelta: number,
): Pick<TimerStep, "repetitions"> {
  return { repetitions: step.repetitions + repetitionsDelta };
}

export function applyPersistDraft(state: TimerConfigState): TimerConfigState {
  const editingStepIdx = state.editingStepIdx;

  // drafting => commit draft to steps and reset draft
  if (isEditingDraft(editingStepIdx)) {
    return {
      ...state,
      steps: appendStep(state.steps, state.draftStep),
      draftStep: { ...initialDraftStep },
    };
  }

  return state;
}

export function applyDeleteStep(state: TimerConfigState, step: TimerStep): TimerConfigState {
  const deleteStepIdx = state.steps.findIndex((s) => s === step);

  if (deleteStepIdx === -1) {
    return state;
  }

  return {
    ...state,
    steps: deleteStep(state.steps, deleteStepIdx),
  };
}

export function applySelectEditingStep(
  state: TimerConfigState,
  step: TimerStep | undefined,
): TimerConfigState {
  let updatedEditingStepIdx: number | undefined = undefined;

  if (step !== undefined) {
    updatedEditingStepIdx = state.steps.findIndex((s) => s === step);

    // if step doesn't exist => no selection
    if (updatedEditingStepIdx === -1) {
      updatedEditingStepIdx = undefined;
    }
  }

  return {
    ...state,
    editingStepIdx: updatedEditingStepIdx,
  };
}

export function applyToggleEditingStep(state: TimerConfigState, step: TimerStep): TimerConfigState {
  let updatedEditingStepIdx: number | undefined = state.steps.findIndex((s) => s === step);

  // if step doesn't exist or already editing => no selection
  if (updatedEditingStepIdx < 0 || updatedEditingStepIdx === state.editingStepIdx) {
    updatedEditingStepIdx = undefined;
  }

  return {
    ...state,
    editingStepIdx: updatedEditingStepIdx,
  };
}

export function applySetWorkSeconds(state: TimerConfigState, seconds: number): TimerConfigState {
  const editingStepIdx = state.editingStepIdx;
  const clampedSeconds = clamp(seconds, TIMER_CONFIG.minSeconds, TIMER_CONFIG.maxSeconds);

  // drafting => set seconds of draft
  if (isEditingDraft(editingStepIdx)) {
    return {
      ...state,
      draftStep: { ...state.draftStep, workSeconds: clampedSeconds },
    };
  }

  if (state.steps[editingStepIdx] === undefined) return state;

  // editing => set seconds of step that's being edited
  return {
    ...state,
    steps: updateStep(state.steps, editingStepIdx, {
      workSeconds: clampedSeconds,
    }),
  };
}

export function applySetRestSeconds(state: TimerConfigState, seconds: number): TimerConfigState {
  const editingStepIdx = state.editingStepIdx;
  const clampedSeconds = clamp(seconds, TIMER_CONFIG.minSeconds, TIMER_CONFIG.maxSeconds);

  // drafting => set seconds of draft
  if (isEditingDraft(editingStepIdx)) {
    return {
      ...state,
      draftStep: { ...state.draftStep, restSeconds: clampedSeconds },
    };
  }

  if (state.steps[editingStepIdx] === undefined) return state;

  // editing => set seconds of step that's being edited
  return {
    ...state,
    steps: updateStep(state.steps, editingStepIdx, {
      restSeconds: clampedSeconds,
    }),
  };
}

export function applySetRepetitions(
  state: TimerConfigState,
  repetitions: number,
): TimerConfigState {
  const editingStepIdx = state.editingStepIdx;
  const clampedRepetitions = clamp(
    repetitions,
    TIMER_CONFIG.minRepetitions,
    TIMER_CONFIG.maxRepetitions,
  );

  // drafting => set repetitions of draft
  if (isEditingDraft(editingStepIdx)) {
    return {
      ...state,
      draftStep: { ...state.draftStep, repetitions: clampedRepetitions },
    };
  }

  if (state.steps[editingStepIdx] === undefined) return state;

  // editing => set repetitions of step that's being edited
  return {
    ...state,
    steps: updateStep(state.steps, editingStepIdx, {
      repetitions: clampedRepetitions,
    }),
  };
}
