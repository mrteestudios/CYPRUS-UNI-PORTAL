/**
 * AudioRecorder captures microphone audio at 16kHz sample rate,
 * converts Float32 audio samples into 16-bit PCM little-endian data,
 * and encodes as base64 for real-time streaming to Gemini Live WebSocket.
 */

export class AudioRecorder {
  private audioCtx: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private scriptProcessor: ScriptProcessorNode | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  private onAudioChunkCallback: ((base64Pcm: string) => void) | null = null;
  private onVolumeCallback: ((volumePercent: number) => void) | null = null;
  private isRecording = false;

  constructor(
    onAudioChunk: (base64Pcm: string) => void,
    onVolume?: (volumePercent: number) => void
  ) {
    this.onAudioChunkCallback = onAudioChunk;
    if (onVolume) {
      this.onVolumeCallback = onVolume;
    }
  }

  public initContext(): void {
    if (!this.audioCtx || this.audioCtx.state === 'closed') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;
      try {
        this.audioCtx = new AudioCtxClass({ sampleRate: 16000 });
      } catch {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
  }

  public async start(): Promise<void> {
    if (this.isRecording) return;

    try {
      this.initContext();

      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      if (!this.audioCtx) {
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = new AudioCtxClass();
      }

      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }

      this.sourceNode = this.audioCtx.createMediaStreamSource(this.mediaStream);
      this.scriptProcessor = this.audioCtx.createScriptProcessor(4096, 1, 1);

      const actualSampleRate = this.audioCtx.sampleRate;
      this.isRecording = true;

      this.scriptProcessor.onaudioprocess = (event: AudioProcessingEvent) => {
        if (!this.isRecording) return;
        const inputData = event.inputBuffer.getChannelData(0);

        // Calculate audio volume level for visual UI feedback
        if (this.onVolumeCallback) {
          let sum = 0;
          for (let i = 0; i < inputData.length; i++) {
            sum += Math.abs(inputData[i]);
          }
          const avg = sum / inputData.length;
          const volPercent = Math.min(100, Math.round(avg * 400));
          this.onVolumeCallback(volPercent);
        }

        let targetData = inputData;
        if (actualSampleRate !== 16000) {
          targetData = this.resampleTo16kHz(inputData, actualSampleRate);
        }

        const pcm16Base64 = this.convertFloat32ToPCM16Base64(targetData);
        if (pcm16Base64 && this.onAudioChunkCallback) {
          this.onAudioChunkCallback(pcm16Base64);
        }
      };

      // Mute gain node prevents local speaker feedback/echo while allowing ScriptProcessor processing
      const muteGain = this.audioCtx.createGain();
      muteGain.gain.value = 0;

      this.sourceNode.connect(this.scriptProcessor);
      this.scriptProcessor.connect(muteGain);
      muteGain.connect(this.audioCtx.destination);
    } catch (err) {
      console.error('Failed to start audio recording:', err);
      this.stop();
      throw err;
    }
  }

  public async resume(): Promise<void> {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      try {
        await this.audioCtx.resume();
      } catch (e) {
        console.warn('Could not resume AudioContext:', e);
      }
    }
  }

  public stop(): void {
    this.isRecording = false;

    if (this.scriptProcessor && this.sourceNode) {
      try {
        this.sourceNode.disconnect();
        this.scriptProcessor.disconnect();
      } catch {
        // ignore disconnect errors
      }
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      this.audioCtx.close();
      this.audioCtx = null;
    }

    this.scriptProcessor = null;
    this.sourceNode = null;
  }

  public getIsRecording(): boolean {
    return this.isRecording;
  }

  private resampleTo16kHz(float32Array: Float32Array, inputSampleRate: number): Float32Array {
    if (inputSampleRate === 16000) return float32Array;
    const ratio = inputSampleRate / 16000;
    const newLength = Math.floor(float32Array.length / ratio);
    const resampled = new Float32Array(newLength);
    for (let i = 0; i < newLength; i++) {
      const originIndex = i * ratio;
      const indexFloor = Math.floor(originIndex);
      const indexCeil = Math.min(float32Array.length - 1, Math.ceil(originIndex));
      const fraction = originIndex - indexFloor;
      resampled[i] = float32Array[indexFloor] * (1 - fraction) + float32Array[indexCeil] * fraction;
    }
    return resampled;
  }

  private convertFloat32ToPCM16Base64(float32Array: Float32Array): string {
    const pcm16 = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }

    const bytes = new Uint8Array(pcm16.buffer);
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}

