import { TICKING_INTERVAL } from "./stopwatchSlice.constants";
import type { StopwatchState } from "./stopwatchSlice.types";

export function createStopwatchTimer(onTick: (secondsPassed: number) => void) {
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let startTime = Date.now();
  let timeLastUpdated = startTime;

  return {
    start() {
      startTime = Date.now();
      timeLastUpdated = startTime;
      intervalId = setInterval(() => {
        timeLastUpdated = updateSecondsPassed(startTime, timeLastUpdated, onTick);
      }, TICKING_INTERVAL);
    },
    stop() {
      if (intervalId === null) {
        return;
      }

      clearInterval(intervalId);
      intervalId = null;

      // Update one last time, could be that some time has elapsed
      updateSecondsPassed(startTime, timeLastUpdated, onTick);
    },
  };
}

export function updateSecondsPassed(
  startTime: ReturnType<typeof Date.now>,
  timeLastUpdated: ReturnType<typeof Date.now>,
  onTick: (secondsPassed: number) => void,
) {
  const currentTime = Date.now();
  const msElapsedSinceUpdate = currentTime - timeLastUpdated;
  if (msElapsedSinceUpdate < 1_000) {
    return timeLastUpdated;
  }

  const updatedSecondsPassed = Math.floor((currentTime - startTime) / 1_000);
  onTick(updatedSecondsPassed);
  return startTime + updatedSecondsPassed * 1_000;
}

export function applyStart(state: StopwatchState): StopwatchState {
  return {
    ...state,
    secondsPassed: 0,
    isRunning: true,
  };
}

export function applyStop(state: StopwatchState): StopwatchState {
  return {
    ...state,
    isRunning: false,
  };
}

export function applySetSecondsPassed(state: StopwatchState, seconds: number): StopwatchState {
  return {
    ...state,
    secondsPassed: seconds,
  };
}
