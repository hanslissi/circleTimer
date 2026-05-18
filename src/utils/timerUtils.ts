import type { TimerStep } from "@app-types/Timer.types";

export function calcCurrentTimerStep(secondsPassed: number, timerStep: TimerStep) {
  const { workSeconds, restSeconds, repetitions } = timerStep;

  const secondsPerRep = workSeconds + restSeconds;
  const repetitionsDone = Math.floor(secondsPassed / secondsPerRep);
  const repetitionsLeft = Math.max(repetitions - repetitionsDone, 0);
  const isDone = repetitionsLeft <= 0;

  const secondsIntoCurrentRep = !isDone ? (secondsPassed % secondsPerRep) : Infinity;

  const workSecondsLeft = Math.max(workSeconds - secondsIntoCurrentRep, 0);
  const isInWork = workSecondsLeft > 0;

  const restSecondsLeft = isInWork
    ? restSeconds
    : Math.max(restSeconds - (secondsIntoCurrentRep - workSeconds), 0);

  const phaseKey: "done" | "work" | "rest" = isDone ? "done" : `${isInWork ? "work" : "rest"}`;

  return {
    workSecondsLeft,
    restSecondsLeft,
    repetitionsLeft,
    phaseKey
  };
}