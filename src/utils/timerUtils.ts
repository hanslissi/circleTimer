import type { TimerStep } from "@app-types/Timer.types";

export function calcCurrentTimerStep(secondsPassed: number, timerStep: TimerStep) {
  const { workSeconds, restSeconds, repetitions } = timerStep;

  const secondsPerRep = workSeconds + restSeconds;
  const repetitionsDone = Math.floor(secondsPassed / secondsPerRep);
  const repetitionsLeft = Math.max(repetitions - repetitionsDone, 0);

  const secondsIntoCurrentRep = repetitionsLeft > 0 ? (secondsPassed % secondsPerRep) : Infinity;

  const workSecondsLeft = Math.max(workSeconds - secondsIntoCurrentRep, 0);
  const restSecondsLeft = workSecondsLeft > 0
    ? restSeconds
    : Math.max(restSeconds - (secondsIntoCurrentRep - workSeconds), 0);

  return {
    workSecondsLeft,
    restSecondsLeft,
    repetitionsLeft,
  };
}