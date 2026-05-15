import { isEditingDraft } from "./timerConfigSlice.bl";
import type { TimerStep } from "@app-types/Timer.types";
import type { TimerConfigState } from "./timerConfigSlice.types";

export function getEditingStep(state: TimerConfigState): TimerStep {
  const editingStepIdx = state.editingStepIdx;

  if (isEditingDraft(editingStepIdx) || state.steps[editingStepIdx] === undefined) {
    return state.draftStep;
  }

  return state.steps[editingStepIdx];
}
