import jazzRest from "@assets/sounds/jazz/Jazz_Initiate_Rest.mp3";
import jazzWork from "@assets/sounds/jazz/Jazz_Initiate_Work.mp3";
import { fetchAudioBuffer } from "@utils/audioContextUtils";

class TimerAudio {
  private ctx: AudioContext | null = null;
  private buffers: Record<"rest" | "work", AudioBuffer | null> = {
    rest: null,
    work: null,
  };
  private currentSource: AudioBufferSourceNode | null = null;
  private unlockPromise: Promise<void> | null = null;

  unlock() {
    if (this.unlockPromise !== null) {
      return this.unlockPromise;
    }

    this.unlockPromise = this._doUnlock().catch((err) => {
      // Allows for silend retry
      this.unlockPromise = null;
      console.error("TimerAudio unlock failed:", err);
    });

    return this.unlockPromise;
  }

  private async _doUnlock() {
    const ctx = new AudioContext();

    // Safari sometimes starts in "suspended" state even inside a gesture
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    const [restBuffer, workBuffer] = await Promise.all([
      fetchAudioBuffer(ctx, jazzRest),
      fetchAudioBuffer(ctx, jazzWork),
    ]);

    this.buffers.rest = restBuffer;
    this.buffers.work = workBuffer;
    this.ctx = ctx;
  }

  private play(buffer: AudioBuffer | null) {
    if (this.ctx === null || buffer === null) return;

    // Stop whatever is currently playing
    this.currentSource?.stop();
    this.currentSource?.disconnect();

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.ctx.destination);
    source.start(0);

    this.currentSource = source;
  }

  playRest() {
    this.play(this.buffers.rest);
  }

  playWork() {
    this.play(this.buffers.work);
  }
}

export const timerAudio = new TimerAudio();
