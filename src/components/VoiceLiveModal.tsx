import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mic,
  MicOff,
  Volume2,
  Radio,
  Sparkles,
  AlertCircle,
  Square,
  Send,
  MessageSquare,
  UserCheck,
  RefreshCw,
} from 'lucide-react';
import { VOICE_OPTIONS, QUICK_VOICE_PROMPTS } from '../data/universitiesData';
import { VoiceName, LiveTranscriptItem } from '../types';
import { AudioRecorder } from '../lib/audioRecorder';
import { AudioPlayer } from '../lib/audioPlayer';

interface VoiceLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string | null;
}

export const VoiceLiveModal: React.FC<VoiceLiveModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [selectedVoice, setSelectedVoice] = useState<VoiceName>('Zephyr');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [micVolume, setMicVolume] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcripts, setTranscripts] = useState<LiveTranscriptItem[]>([]);
  const [textInput, setTextInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const playerRef = useRef<AudioPlayer | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);
  const isMutedRef = useRef(isMuted);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Resume audio contexts on user gesture
  const handleUserGesture = () => {
    playerRef.current?.initContext();
    recorderRef.current?.initContext();
    recorderRef.current?.resume();
  };

  // Initialize AudioPlayer
  useEffect(() => {
    playerRef.current = new AudioPlayer(24000);
    return () => {
      playerRef.current?.stop();
    };
  }, []);

  // Scroll transcript to bottom
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcripts]);

  // Connect to Gemini Live WebSocket session
  const connectLiveSession = () => {
    // Pre-initialize player & recorder contexts synchronously in the gesture context
    if (!playerRef.current) {
      playerRef.current = new AudioPlayer(24000);
    }
    playerRef.current.initContext();

    if (!recorderRef.current) {
      recorderRef.current = new AudioRecorder(
        (base64Pcm) => {
          if (!isMutedRef.current && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(
              JSON.stringify({
                type: 'audio',
                data: base64Pcm,
              })
            );
          }
        },
        (vol) => {
          setMicVolume(vol);
        }
      );
    }
    recorderRef.current.initContext();

    if (wsRef.current) {
      wsRef.current.close();
    }

    setIsConnecting(true);
    setErrorMessage(null);

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/live`;

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Connected to server Live WS');
        ws.send(
          JSON.stringify({
            type: 'start',
            voiceName: selectedVoice,
          })
        );
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);

          if (msg.type === 'connected') {
            setIsConnected(true);
            setIsConnecting(false);

            startMicrophoneRecording();

            if (initialPrompt) {
              sendTextMessage(initialPrompt);
            }
          } else if (msg.type === 'audio' && msg.data) {
            setIsSpeaking(true);
            if (playerRef.current) {
              playerRef.current.playChunk(msg.data);
            }
          } else if (msg.type === 'interrupted') {
            setIsSpeaking(false);
            if (playerRef.current) {
              playerRef.current.interrupt();
            }
          } else if (msg.type === 'transcript') {
            setTranscripts((prev) => [
              ...prev,
              {
                id: Math.random().toString(),
                speaker: msg.speaker || 'ai',
                text: msg.text,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ]);
            setIsSpeaking(false);
          } else if (msg.type === 'error') {
            setErrorMessage(msg.error || 'Gemini Live Session Error');
            setIsConnecting(false);
            setIsConnected(false);
          }
        } catch (err) {
          console.error('Error handling WS message:', err);
        }
      };

      ws.onerror = (err) => {
        console.error('Live WS Error:', err);
        setErrorMessage('WebSocket Connection Error. Please verify your internet or try again.');
        setIsConnecting(false);
        setIsConnected(false);
      };

      ws.onclose = () => {
        console.log('Live WS closed');
        setIsConnected(false);
        setIsConnecting(false);
        stopMicrophoneRecording();
      };
    } catch (err) {
      console.error('Failed to initiate WS:', err);
      setErrorMessage('Could not open WebSocket session.');
      setIsConnecting(false);
    }
  };

  const startMicrophoneRecording = async () => {
    try {
      if (!recorderRef.current) {
        recorderRef.current = new AudioRecorder(
          (base64Pcm) => {
            if (!isMutedRef.current && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
              wsRef.current.send(
                JSON.stringify({
                  type: 'audio',
                  data: base64Pcm,
                })
              );
            }
          },
          (vol) => {
            setMicVolume(vol);
          }
        );
      }
      await recorderRef.current.start();
    } catch (err) {
      console.error('Failed microphone permission or start:', err);
      setErrorMessage('Microphone access denied or unavailable. You can still type queries!');
    }
  };

  const stopMicrophoneRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
    }
  };

  const disconnectSession = () => {
    stopMicrophoneRecording();
    if (playerRef.current) {
      playerRef.current.stop();
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
    setIsConnecting(false);
  };

  useEffect(() => {
    if (isOpen) {
      connectLiveSession();
    } else {
      disconnectSession();
    }
    return () => {
      disconnectSession();
    };
  }, [isOpen]);

  const handleVoiceSelect = (voice: VoiceName) => {
    setSelectedVoice(voice);
    if (isConnected) {
      disconnectSession();
      setTimeout(() => {
        connectLiveSession();
      }, 300);
    }
  };

  const sendTextMessage = (textToSend?: string) => {
    const text = textToSend || textInput;
    if (!text.trim()) return;

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'text',
          text,
        })
      );

      setTranscripts((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          speaker: 'user',
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      setTextInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleUserGesture}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#071A2F]/85 backdrop-blur-xl"
    >
      <div className="relative w-full max-w-4xl glass-panel bg-[#102A43]/95 border border-white/15 rounded-[24px] shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#071A2F]/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#8B5CF6] text-[#071A2F] flex items-center justify-center font-bold text-xs shadow-[0_0_15px_rgba(0,229,255,0.4)]">
              <Radio className={`w-5 h-5 ${isConnected ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-display font-bold text-white text-lg">Gemini Live Room</h2>
                <span
                  className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-full border ${
                    isConnected
                      ? 'bg-[#7CFC00]/20 text-[#7CFC00] border-[#7CFC00]/40'
                      : isConnecting
                      ? 'bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]/30 animate-pulse'
                      : 'bg-white/10 text-[#D1D5DB]/40 border-white/20'
                  }`}
                >
                  {isConnected ? 'Connected' : isConnecting ? 'Connecting...' : 'Disconnected'}
                </span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#00E5FF]">North Cyprus Academic Voice Advisor</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 border border-white/15 hover:border-white/30 bg-[#071A2F] text-white rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content: Visualizer & Transcript Grid */}
        <div className="grid md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left Column: Visualizer & Voice Selection */}
          <div className="md:col-span-5 p-6 bg-[#071A2F]/60 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between items-center space-y-6">
            {/* Visualizer Orb */}
            <div className="flex flex-col items-center justify-center py-6 w-full">
              <div className="relative flex items-center justify-center">
                <div
                  className={`absolute w-40 h-40 rounded-full border border-[#00E5FF]/30 ${
                    isConnected ? 'animate-ping opacity-30' : 'opacity-0'
                  }`}
                />

                {/* Core Orb */}
                <div
                  className={`relative w-28 h-28 rounded-full border flex items-center justify-center transition-all duration-500 shadow-2xl ${
                    isSpeaking
                      ? 'bg-gradient-to-br from-[#FF5A5F] to-[#FF3B40] text-white border-white scale-105 shadow-[0_0_40px_rgba(255,90,95,0.6)]'
                      : isConnected
                      ? 'bg-gradient-to-br from-[#00E5FF] to-[#8B5CF6] text-[#071A2F] border-[#00E5FF] shadow-[0_0_35px_rgba(0,229,255,0.5)]'
                      : 'bg-[#102A43] text-white/40 border-white/10'
                  }`}
                >
                  {isSpeaking ? (
                    <Volume2 className="w-10 h-10 animate-bounce text-white" />
                  ) : (
                    <Mic className={`w-10 h-10 ${isConnected ? 'animate-pulse' : ''}`} />
                  )}
                </div>
              </div>

              <div className="mt-5 text-center w-full px-4">
                <p className="text-sm font-display font-bold text-white">
                  {isSpeaking
                    ? 'Advisor speaking...'
                    : isConnected
                    ? 'Listening... Speak now'
                    : 'Initializing Live Session...'}
                </p>

                {/* Live Mic Level Visualizer */}
                {isConnected && !isMuted && (
                  <div className="mt-3 w-full bg-[#102A43] h-2 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className="bg-gradient-to-r from-[#00E5FF] to-[#7CFC00] h-full rounded-full transition-all duration-75 shadow-[0_0_8px_#00E5FF]"
                      style={{ width: `${Math.max(4, micVolume)}%` }}
                    />
                  </div>
                )}

                <p className="text-[9px] uppercase tracking-widest font-mono text-[#D1D5DB]/60 mt-1">
                  {isMuted ? 'Microphone Muted' : `Mic Level: ${micVolume}% • 16kHz Stream`}
                </p>
              </div>
            </div>

            {/* Voice Persona Selector */}
            <div className="w-full space-y-2">
              <label className="text-[10px] font-bold text-[#00E5FF] flex items-center justify-between uppercase tracking-widest">
                <span>Voice Persona</span>
                <UserCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
              </label>

              <div className="grid grid-cols-1 gap-2">
                {VOICE_OPTIONS.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => handleVoiceSelect(v.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedVoice === v.id
                        ? 'bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                        : 'bg-[#102A43] border-white/10 text-white hover:border-[#00E5FF]/40'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{v.name}</p>
                      <p className="text-[10px] text-[#D1D5DB]/70 mt-0.5">{v.description}</p>
                    </div>
                    {selectedVoice === v.id && (
                      <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Controls */}
            <div className="w-full flex items-center space-x-2 pt-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                disabled={!isConnected}
                className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl border text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer ${
                  isMuted
                    ? 'bg-[#FF5A5F]/20 text-[#FF5A5F] border-[#FF5A5F]'
                    : 'bg-[#102A43] border-white/15 text-white hover:border-[#00E5FF]'
                }`}
              >
                {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isMuted ? 'Muted' : 'Mic Active'}</span>
              </button>

              <button
                onClick={() => playerRef.current?.interrupt()}
                disabled={!isSpeaking}
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-[#102A43] border border-white/15 text-white hover:border-[#00E5FF] rounded-xl disabled:opacity-40 text-[10px] uppercase font-bold tracking-widest cursor-pointer"
                title="Interrupt AI Speech"
              >
                <Square className="w-3 h-3 fill-current text-[#FF5A5F]" />
                <span>Interrupt</span>
              </button>

              <button
                onClick={connectLiveSession}
                className="p-2.5 bg-[#102A43] border border-white/15 text-white hover:border-[#00E5FF] rounded-xl cursor-pointer"
                title="Reconnect Session"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#00E5FF]" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Transcript Feed & Text Backup */}
          <div className="md:col-span-7 flex flex-col justify-between p-6 bg-[#071A2F]/90 overflow-hidden">
            {/* Header / Error Alert */}
            <div className="pb-3 flex items-center justify-between border-b border-white/10">
              <span className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-widest flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#00E5FF]" />
                Live Transcript Stream
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D1D5DB]/50">Real-time</span>
            </div>

            {errorMessage && (
              <div className="my-2 p-3 bg-[#FF5A5F]/20 border border-[#FF5A5F] text-white text-xs flex items-center space-x-2 font-bold rounded-xl">
                <AlertCircle className="w-4 h-4 text-[#FF5A5F] flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Transcript Messages List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
              {transcripts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#D1D5DB]/50 space-y-3">
                  <Sparkles className="w-6 h-6 text-[#00E5FF]" />
                  <p className="text-xs uppercase tracking-wider font-bold">
                    Speak into your microphone or choose a prompt below to begin.
                  </p>
                </div>
              ) : (
                transcripts.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col ${item.speaker === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 text-xs leading-relaxed ${
                        item.speaker === 'user'
                          ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#071A2F] font-semibold rounded-2xl rounded-tr-none shadow-lg'
                          : 'bg-[#102A43] border border-white/10 text-white rounded-2xl rounded-tl-none shadow-md'
                      }`}
                    >
                      <p className={`font-bold text-[9px] uppercase tracking-widest mb-1 ${
                        item.speaker === 'user' ? 'text-[#071A2F]/70' : 'text-[#00E5FF]'
                      }`}>
                        {item.speaker === 'user' ? 'You' : 'Academic Advisor'} • {item.timestamp}
                      </p>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={transcriptEndRef} />
            </div>

            {/* Quick Topic Chips */}
            <div className="pt-3 border-t border-white/10">
              <p className="text-[9px] uppercase font-bold tracking-widest text-[#D1D5DB]/60 mb-2">Quick Inquiry Prompts:</p>
              <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                {QUICK_VOICE_PROMPTS.map((promptText, i) => (
                  <button
                    key={i}
                    onClick={() => sendTextMessage(promptText)}
                    className="px-2.5 py-1.5 bg-[#102A43] hover:bg-[#00E5FF] hover:text-[#071A2F] border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider transition-all text-left cursor-pointer rounded-lg"
                  >
                    {promptText}
                  </button>
                ))}
              </div>

              {/* Text Input Fallback */}
              <div className="flex items-center space-x-2 mt-3">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendTextMessage()}
                  placeholder="Type an inquiry for voice response..."
                  className="flex-1 bg-[#102A43] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#D1D5DB]/40 focus:outline-none focus:border-[#00E5FF]"
                />
                <button
                  onClick={() => sendTextMessage()}
                  className="btn-cta-coral p-2.5 rounded-xl cursor-pointer flex-shrink-0"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
