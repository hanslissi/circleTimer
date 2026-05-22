import jazzRest from "@assets/sounds/jazz/Jazz_Initiate_Rest.mp3";
import jazzWork from "@assets/sounds/jazz/Jazz_Initiate_Work.mp3";

class TimerAudio {
  private audioRest: HTMLAudioElement;
  private audioWork: HTMLAudioElement;

  constructor() {
    this.audioRest = new Audio(jazzRest);
    this.audioWork = new Audio(jazzWork);
  }

  playRest() {
    this.audioWork.pause();
    this.audioRest.currentTime = 0;
    this.audioRest.play();
  }

  playWork() {
    this.audioRest.pause();
    this.audioWork.currentTime = 0;
    this.audioWork.play();
  }
}

export const timerAudio = new TimerAudio();