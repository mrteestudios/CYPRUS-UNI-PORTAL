/**
 * AudioPlayer handles continuous gapless playback of 24kHz PCM Little-Endian audio
 * chunks received from Gemini Live and Gemini TTS.
 */

export class AudioPlayer {
  private audioCtx: AudioContext | null = null;
  private nextStartTime = 0;
  private activeSources: AudioBufferSourceNode[] = [];
  private isPlaying = false;
  private sampleRate = 24000;

  constructor(sampleRate = 24000) {
    this.sampleRate = sampleRate;
  }

  public initContext(): void {
    if (!this.audioCtx || this.audioCtx.state === 'closed') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;
      try {
        this.audioCtx = new AudioCtxClass({ sampleRate: this.sampleRate });
      } catch {
        this.audioCtx = new AudioCtxClass();
      }
      this.nextStartTime = this.audioCtx.currentTime;
    } else if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public playChunk(base64Pcm: string): void {
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const binaryString = atob(base64Pcm);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Ensure ArrayBuffer byteOffset alignment for Int16Array
      const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
      const pcm16 = new Int16Array(arrayBuffer, 0, Math.floor(arrayBuffer.byteLength / 2));
      const float32 = new Float32Array(pcm16.length);

      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / (pcm16[i] < 0 ? 32768 : 32767);
      }

      const audioBuffer = this.audioCtx.createBuffer(1, float32.length, this.sampleRate);
      audioBuffer.getChannelData(0).set(float32);

      const source = this.audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioCtx.destination);

      const currentTime = this.audioCtx.currentTime;
      if (this.nextStartTime < currentTime) {
        this.nextStartTime = currentTime;
      }

      source.start(this.nextStartTime);
      this.nextStartTime += audioBuffer.duration;

      this.activeSources.push(source);
      this.isPlaying = true;

      source.onended = () => {
        const index = this.activeSources.indexOf(source);
        if (index > -1) {
          this.activeSources.splice(index, 1);
        }
        if (this.activeSources.length === 0) {
          this.isPlaying = false;
        }
      };
    } catch (err) {
      console.error('Error playing audio chunk:', err);
    }
  }

  public interrupt(): void {
    // Stop all playing audio sources immediately
    for (const source of this.activeSources) {
      try {
        source.stop();
        source.disconnect();
      } catch {
        // ignore if already stopped
      }
    }
    this.activeSources = [];
    if (this.audioCtx) {
      this.nextStartTime = this.audioCtx.currentTime;
    }
    this.isPlaying = false;
  }

  public stop(): void {
    this.interrupt();
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      this.audioCtx.close();
      this.audioCtx = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}
