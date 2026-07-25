import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Volume2, Sparkles, Mic, Loader2 } from 'lucide-react';
import { ChatMessage, VoiceName } from '../types';
import { AudioPlayer } from '../lib/audioPlayer';
import { VOICE_OPTIONS } from '../data/universitiesData';

interface ChatAssistantProps {
  onOpenLiveVoice: () => void;
  initialQuery?: string | null;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  onOpenLiveVoice,
  initialQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Greetings. Welcome to the North Cyprus Universities Academic Advisory Portal. How may I assist your enrollment inquiries today? You may request information regarding degree programs, tuition fees, automatic 50% international scholarships, campus dormitories, or visa protocols across EMU, NEU, CIU, GAU, and BAU.',
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<VoiceName>('Zephyr');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [ttsLoadingId, setTtsLoadingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<AudioPlayer | null>(null);

  useEffect(() => {
    playerRef.current = new AudioPlayer(24000);
    return () => {
      playerRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get answer');
      }

      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: data.text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      console.error('Chat API Error:', err);
      const errMsg = err instanceof Error ? err.message : 'Error communicating with AI';
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'assistant',
          text: `I'm sorry, I encountered an issue: ${errMsg}. Please try again.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const playTTSForMessage = async (msgId: string, text: string) => {
    if (playingAudioId === msgId) {
      playerRef.current?.interrupt();
      setPlayingAudioId(null);
      return;
    }

    playerRef.current?.interrupt();
    setTtsLoadingId(msgId);

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.slice(0, 1000),
          voiceName: selectedVoice,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'TTS error');

      if (data.audio && playerRef.current) {
        setPlayingAudioId(msgId);
        setTtsLoadingId(null);
        playerRef.current.playChunk(data.audio);
      }
    } catch (err) {
      console.error('TTS playback error:', err);
      setTtsLoadingId(null);
      setPlayingAudioId(null);
    }
  };

  return (
    <div className="space-y-10 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#00E5FF] block mb-1">
            CONSULTATION PORTAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
            AI Academic Assistant
          </h2>
          <p className="text-sm text-[#D1D5DB]/80 mt-2 max-w-2xl leading-relaxed">
            Powered by Gemini 2.5 Flash with real-time speech synthesis. Inquire about degree programs, fees, and admissions.
          </p>
        </div>

        {/* Live Voice Room CTA */}
        <button
          onClick={onOpenLiveVoice}
          className="btn-cta-coral flex items-center space-x-2 px-5 py-3 text-[10px] uppercase font-bold tracking-widest cursor-pointer self-start md:self-auto"
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Speak with Advisor Now</span>
        </button>
      </div>

      {/* Main Chat Container */}
      <div className="glass-panel bg-[#102A43]/90 border border-white/10 rounded-[18px] flex flex-col h-[650px] overflow-hidden shadow-2xl">
        {/* Top Control Bar */}
        <div className="p-4 border-b border-white/10 bg-[#071A2F]/90 flex items-center justify-between text-xs text-white">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#7CFC00] animate-pulse shadow-[0_0_8px_#7CFC00]" />
            <span className="font-bold text-[10px] uppercase tracking-widest text-[#00E5FF]">Admissions Advisor Active</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D1D5DB]/60">Voice Persona:</span>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value as VoiceName)}
              className="bg-[#102A43] border border-white/15 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white focus:outline-none focus:border-[#00E5FF]"
            >
              {VOICE_OPTIONS.map((v) => (
                <option key={v.id} value={v.id} className="bg-[#071A2F] text-white">
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#071A2F]/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold border shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-[#FF5A5F] text-white border-[#FF5A5F]'
                    : 'bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]/40'
                }`}
              >
                {msg.sender === 'user' ? 'YOU' : 'AI'}
              </div>

              {/* Message Content */}
              <div
                className={`max-w-[80%] p-4 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#071A2F] font-medium rounded-2xl rounded-tr-none shadow-lg'
                    : 'bg-[#071A2F]/90 text-[#D1D5DB] border border-white/10 rounded-2xl rounded-tl-none space-y-3 shadow-md'
                }`}
              >
                <div className={`flex items-center justify-between text-[9px] uppercase tracking-widest font-bold mb-1 ${
                  msg.sender === 'user' ? 'text-[#071A2F]/70' : 'text-[#00E5FF]'
                }`}>
                  <span>
                    {msg.sender === 'user' ? 'User' : 'Admissions Advisor'}
                  </span>
                  <span>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <p className="whitespace-pre-wrap">{msg.text}</p>

                {/* Speech Playback Button for Assistant */}
                {msg.sender === 'assistant' && (
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => playTTSForMessage(msg.id, msg.text)}
                      disabled={ttsLoadingId === msg.id}
                      className={`btn-glass-cyan flex items-center space-x-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest cursor-pointer`}
                    >
                      {ttsLoadingId === msg.id ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin text-[#00E5FF]" />
                          <span>Generating Voice...</span>
                        </>
                      ) : playingAudioId === msg.id ? (
                        <>
                          <Volume2 className="w-3 h-3 text-[#FF5A5F]" />
                          <span className="text-[#FF5A5F]">Stop Speech</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3 text-[#00E5FF]" />
                          <span>Listen with Gemini Voice</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-3 text-xs bg-[#071A2F]/90 p-3.5 rounded-xl border border-white/15 w-fit">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00E5FF]" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#00E5FF]">Consulting admissions database...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area */}
        <div className="p-4 border-t border-white/10 bg-[#071A2F]/90">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your inquiry regarding programs, tuition, or campus life..."
              className="flex-1 bg-[#102A43] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-[#D1D5DB]/40 focus:outline-none focus:border-[#00E5FF]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="btn-cta-coral p-3 rounded-xl disabled:opacity-40 transition-all cursor-pointer flex-shrink-0"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
