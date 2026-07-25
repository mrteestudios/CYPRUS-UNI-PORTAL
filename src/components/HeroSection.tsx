import React from 'react';
import { Mic, ArrowRight } from 'lucide-react';
import { QUICK_VOICE_PROMPTS } from '../data/universitiesData';
import { useLanguage } from '../lib/LanguageContext';

interface HeroSectionProps {
  onOpenLiveVoice: () => void;
  onSelectPrompt: (prompt: string) => void;
  setActiveTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenLiveVoice,
  onSelectPrompt,
  setActiveTab,
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#071A2F]/60 text-white border-b border-white/10 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Branding & Futuristic Hero */}
          <section className="lg:col-span-7 glass-panel p-8 sm:p-12 flex flex-col justify-between space-y-10 relative overflow-hidden">
            {/* Subtle glowing ambient accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00E5FF]/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#7CFC00] animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#00E5FF]">
                  {t.heroSubhead}
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-6xl lg:text-6xl leading-[1.05] font-display font-black tracking-tight mb-6 text-white">
                {t.heroTitle1}<br />
                <span className="bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#FF5A5F] bg-clip-text text-transparent uppercase font-extrabold">
                  {t.heroTitle2}
                </span>
              </h2>

              <p className="text-base sm:text-lg max-w-xl leading-relaxed text-[#D1D5DB] font-normal">
                {t.heroDesc}
              </p>
            </div>

            {/* Circular Tactile Glowing Voice Trigger Button & Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4 z-10">
              <button
                onClick={onOpenLiveVoice}
                className="group flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#FF5A5F] to-[#FF3B40] text-white transition-all duration-300 relative cursor-pointer shadow-[0_0_35px_rgba(255,90,95,0.4)] hover:shadow-[0_0_45px_rgba(0,229,255,0.7)] hover:scale-105 flex-shrink-0"
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-24 h-24 rounded-full border border-white/40 group-hover:border-[#00E5FF] animate-ping" />
                </div>
                <Mic className="w-7 h-7 mb-1 group-hover:scale-110 transition-transform text-white" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">{t.speakBtn}</span>
              </button>

              <div className="space-y-3">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.3em] font-bold mb-1 text-[#D1D5DB]/60">
                    {t.multimodalVoiceAi}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 bg-[#00E5FF] rounded-full animate-pulse shadow-[0_0_10px_#00E5FF]" />
                    <span className="font-display text-xl font-bold text-white">{t.geminiLiveVoice}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('calculator')}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#00E5FF] hover:text-[#7CFC00] transition-colors pb-0.5"
                >
                  <span>{t.calcTuitionBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>

          {/* Right Column: Data & Context Insights */}
          <section className="lg:col-span-5 glass-panel p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-[#102A43]/80">
            <div className="space-y-8">
              {/* Stats Grid */}
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D1D5DB]/60 block mb-4">
                  {t.admissionsInsight}
                </span>
                <div className="grid grid-cols-2 gap-6 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-3xl sm:text-4xl font-display font-black text-[#00E5FF]">120+</span>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#D1D5DB]/70 mt-1">
                      {t.degreeProgramsCount}
                    </p>
                  </div>
                  <div>
                    <span className="text-3xl sm:text-4xl font-display font-black text-[#7CFC00]">50%</span>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#D1D5DB]/70 mt-1">
                      {t.automaticScholarship}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sample Voice Prompts List */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D1D5DB]/60 block">
                  {t.quickVoiceQueries}
                </span>
                <div className="space-y-2">
                  {QUICK_VOICE_PROMPTS.slice(0, 3).map((promptText, idx) => (
                    <div key={idx} className="group">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-[#00E5FF]/60 block">
                        0{idx + 1}
                      </span>
                      <button
                        onClick={() => onSelectPrompt(promptText)}
                        className="w-full text-left text-xs sm:text-sm font-sans border-b border-white/10 pb-2.5 pt-1 flex justify-between items-center group-hover:border-[#00E5FF] transition-colors cursor-pointer text-[#D1D5DB] group-hover:text-white"
                      >
                        <span className="line-clamp-1 pr-2">{promptText}</span>
                        <Mic className="w-3.5 h-3.5 text-[#00E5FF] opacity-60 group-hover:opacity-100 flex-shrink-0" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer Quote inside Card */}
            <div className="pt-6 border-t border-white/10 flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold text-white">North Cyprus</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D1D5DB]/60">
                  {t.mediterraneanHub}
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-display font-black text-[#8B5CF6]">300+</span>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#D1D5DB]/60">
                  {t.sunnyDays}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
