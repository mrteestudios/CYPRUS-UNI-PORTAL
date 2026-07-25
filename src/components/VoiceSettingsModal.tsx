import React, { useState, useEffect, useRef } from 'react';
import { Settings, X, Volume2, Mic, Sliders, Sparkles, Check, Globe, Shield, Play, Square, RefreshCw, AlertCircle } from 'lucide-react';
import { VOICE_OPTIONS } from '../data/universitiesData';
import { VoiceName } from '../types';
import { useLanguage } from '../lib/LanguageContext';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVoice?: VoiceName;
  onVoiceChange?: (voice: VoiceName) => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
  selectedVoice = 'Zephyr',
  onVoiceChange,
}) => {
  const { language, setLanguage } = useLanguage();
  const [currentVoice, setCurrentVoice] = useState<VoiceName>(selectedVoice);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [speechTone, setSpeechTone] = useState<string>('balanced');
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Mic Testing State
  const [isTestingMic, setIsTestingMic] = useState<boolean>(false);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [micStatus, setMicStatus] = useState<string>('Click "Start Test" to verify your microphone.');
  const [micError, setMicError] = useState<string | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      stopMicTest();
    };
  }, []);

  const startMicTest = async () => {
    setMicError(null);
    setRecordedAudioUrl(null);
    setMicStatus('Requesting microphone access...');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      mediaStreamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      setIsTestingMic(true);
      setMicStatus('Microphone Active! Speak to test volume levels.');

      // Setup recorder for 3-second sample
      recordedChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedAudioUrl(url);
      };

      mediaRecorder.start();

      // Monitor volume level
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        const volumePercent = Math.min(100, Math.round((average / 128) * 100));
        setMicVolume(volumePercent);

        animFrameRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } catch (err: any) {
      console.error('Microphone access error:', err);
      setMicError(err.message || 'Could not access microphone. Please check browser permissions.');
      setMicStatus('Microphone access failed.');
    }
  };

  const stopMicTest = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setIsTestingMic(false);
    setMicVolume(0);
    setMicStatus('Test complete.');
  };

  const playRecordedSample = () => {
    if (!recordedAudioUrl) return;
    const audio = new Audio(recordedAudioUrl);
    setIsPlayingRecording(true);
    audio.play();
    audio.onended = () => {
      setIsPlayingRecording(false);
    };
  };

  if (!isOpen) return null;

  const handleSelectVoice = (v: VoiceName) => {
    setCurrentVoice(v);
    if (onVoiceChange) {
      onVoiceChange(v);
    }
  };

  const handleSave = () => {
    stopMicTest();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#071A2F]/85 backdrop-blur-xl animate-fadeIn">
      <div className="glass-panel bg-[#102A43]/95 border border-white/15 w-full max-w-2xl shadow-[0_0_60px_rgba(0,0,0,0.6)] text-white rounded-[24px] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#071A2F]/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#8B5CF6] text-[#071A2F] flex items-center justify-center font-bold shadow-[0_0_12px_rgba(0,229,255,0.4)]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">Voice Customization & Mic Tester</h3>
              <p className="text-[10px] uppercase tracking-widest font-bold text-[#00E5FF]">
                Gemini Multimodal Speech & Audio Diagnostics
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopMicTest();
              onClose();
            }}
            className="p-2.5 border border-white/15 hover:border-white/30 bg-[#071A2F] text-white rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs bg-[#071A2F]/40">
          {/* Real-time Microphone Hardware Test Section */}
          <div className="bg-[#071A2F]/80 p-4 rounded-2xl border border-white/15 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mic className={`w-4 h-4 ${isTestingMic ? 'text-[#7CFC00] animate-pulse' : 'text-[#00E5FF]'}`} />
                <span className="font-display font-bold text-sm text-white">Interactive Microphone Diagnostics</span>
              </div>
              <div className="flex items-center space-x-2">
                {!isTestingMic ? (
                  <button
                    onClick={startMicTest}
                    className="btn-glass-cyan flex items-center space-x-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <Mic className="w-3 h-3 text-[#00E5FF]" />
                    <span>Test Microphone</span>
                  </button>
                ) : (
                  <button
                    onClick={stopMicTest}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#FF5A5F]/20 border border-[#FF5A5F] text-[#FF5A5F] hover:bg-[#FF5A5F] hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <Square className="w-3 h-3" />
                    <span>Stop Test</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-[11px] text-[#D1D5DB]/80 leading-relaxed">{micStatus}</p>

            {micError && (
              <div className="flex items-center space-x-2 p-2.5 bg-[#FF5A5F]/20 border border-[#FF5A5F] text-white rounded-xl text-[11px]">
                <AlertCircle className="w-4 h-4 text-[#FF5A5F] flex-shrink-0" />
                <span>{micError}</span>
              </div>
            )}

            {/* Volume Level Meter Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] uppercase font-bold tracking-wider text-[#D1D5DB]/60">
                <span>Mic Input Signal</span>
                <span className="text-[#00E5FF]">{micVolume}%</span>
              </div>
              <div className="w-full h-3 bg-[#102A43] border border-white/15 rounded-full overflow-hidden p-0.5 flex">
                <div
                  className={`h-full rounded-full transition-all duration-75 ${
                    micVolume > 70
                      ? 'bg-[#FF5A5F]'
                      : micVolume > 20
                      ? 'bg-[#7CFC00]'
                      : 'bg-[#00E5FF]'
                  }`}
                  style={{ width: `${micVolume}%` }}
                />
              </div>
            </div>

            {/* Audio Playback Test Sample */}
            {recordedAudioUrl && (
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7CFC00]">
                  Sample Recorded Successfully
                </span>
                <button
                  onClick={playRecordedSample}
                  disabled={isPlayingRecording}
                  className="btn-glass-cyan flex items-center space-x-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3 h-3 text-[#7CFC00]" />
                  <span>{isPlayingRecording ? 'Playing Sample...' : 'Play Back Sample'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Section 1: Voice Persona Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#00E5FF]">
                1. Select AI Voice Persona
              </label>
              <span className="text-[10px] uppercase font-bold text-[#7CFC00] bg-[#7CFC00]/10 px-2.5 py-0.5 border border-[#7CFC00]/30 rounded-full">
                Active: {currentVoice}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {VOICE_OPTIONS.map((opt) => {
                const isSelected = currentVoice === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectVoice(opt.id as VoiceName)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-white shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                        : 'bg-[#102A43] border-white/10 text-white hover:border-[#00E5FF]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-display font-bold text-sm text-white">{opt.name.split(' ')[0]}</span>
                      <span
                        className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-[#00E5FF] text-[#071A2F]' : 'bg-white/10 text-[#D1D5DB]'
                        }`}
                      >
                        {opt.gender} • {opt.accent}
                      </span>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-[#D1D5DB]' : 'text-[#D1D5DB]/70'}`}>
                      {opt.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Speech Rate & Tone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            {/* Speech Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-widest text-white">
                  Speech Speed Rate
                </label>
                <span className="font-bold text-[#00E5FF]">{speechRate.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.75"
                max="1.5"
                step="0.05"
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="w-full accent-[#00E5FF] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] uppercase font-bold tracking-wider text-[#D1D5DB]/50">
                <span>0.75x Slow</span>
                <span>1.0x Normal</span>
                <span>1.5x Fast</span>
              </div>
            </div>

            {/* Speech Style Tone */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-white">
                Advisory Tone Style
              </label>
              <select
                value={speechTone}
                onChange={(e) => setSpeechTone(e.target.value)}
                className="w-full bg-[#102A43] border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
              >
                <option value="formal" className="bg-[#071A2F]">Formal Academic Protocol (EMU & NEU Official)</option>
                <option value="balanced" className="bg-[#071A2F]">Balanced Conversational Guide (Default)</option>
                <option value="concise" className="bg-[#071A2F]">Concise & Direct (Fast Bullet Points)</option>
                <option value="encouraging" className="bg-[#071A2F]">Warm & Encouraging Student Mentor</option>
              </select>
            </div>
          </div>

          {/* Section 3: Audio Behavior & Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            {/* Language Selection */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#00E5FF]" />
                Language Speech Synthesis
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'tr', label: 'Türkçe' },
                  { code: 'ru', label: 'Русский' },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={`py-2 px-2 text-[10px] font-bold uppercase tracking-wider rounded-lg border cursor-pointer transition-all ${
                      language === lang.code
                        ? 'bg-[#00E5FF] text-[#071A2F] border-[#00E5FF] font-black shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                        : 'bg-[#102A43] text-white border-white/10 hover:border-[#00E5FF]/40'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Auto Play Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-[#071A2F]/80 rounded-xl border border-white/15">
              <div>
                <p className="font-bold text-white text-xs">Auto-Play Voice Responses</p>
                <p className="text-[10px] text-[#D1D5DB]/60">Automatically stream audio for AI text answers</p>
              </div>
              <input
                type="checkbox"
                checked={autoPlay}
                onChange={(e) => setAutoPlay(e.target.checked)}
                className="w-4 h-4 accent-[#00E5FF] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-white/10 bg-[#071A2F]/80 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-[10px] uppercase font-bold tracking-widest text-[#7CFC00]">
            <Shield className="w-3.5 h-3.5 text-[#7CFC00]" />
            <span>24 kHz High Fidelity Audio Stream</span>
          </div>

          <button
            onClick={handleSave}
            className="btn-cta-coral flex items-center space-x-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            {isSaved ? <Check className="w-4 h-4 text-white" /> : <Sparkles className="w-4 h-4" />}
            <span>{isSaved ? 'Settings Saved!' : 'Apply Voice Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

