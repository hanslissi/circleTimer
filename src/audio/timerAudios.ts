import jazzRest from "@assets/sounds/jazz/Jazz_Initiate_Rest.mp3";
import jazzWork from "@assets/sounds/jazz/Jazz_Initiate_Work.mp3";

class TimerAudio {
  private ctx: AudioContext | null = null;
  private buffers: Record<"rest" | "work", AudioBuffer | null> = {
    rest: null,
    work: null,
  };
  private currentSource: AudioBufferSourceNode | null = null;

  async unlock() {
    if (this.ctx) return;

    this.ctx = new AudioContext();

    // Safari sometimes starts in "suspended" state even inside a gesture
    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    const [restBuffer, workBuffer] = await Promise.all([
      this.fetchAndDecode(jazzRest),
      this.fetchAndDecode(jazzWork),
    ]);

    this.buffers.rest = restBuffer;
    this.buffers.work = workBuffer;
  }

  private async fetchAndDecode(url: string): Promise<AudioBuffer> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return this.ctx!.decodeAudioData(arrayBuffer);
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
