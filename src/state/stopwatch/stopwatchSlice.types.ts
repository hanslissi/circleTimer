export type StopwatchState = {
  secondsPassed: number;
  isRunning: boolean;
};

export type StopwatchActions = {
  start: () => void;
  stop: () => void;
  reset: () => void;
  setSecondsPassed: (seconds: number) => void;
};

export type StopwatchSlice = StopwatchState & StopwatchActions;