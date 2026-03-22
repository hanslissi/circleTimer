export type CircleTimer = {
  steps: TimerStep[];
}

export type TimerStep = {
  repetitions: number;
  workSeconds: number;
  restSeconds: number;
}

