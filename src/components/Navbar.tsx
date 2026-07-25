import React, { useState } from 'react';
import { Mic, GraduationCap, Compass, Calculator, BookOpen, MessageSquare, Sparkles, Sliders } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { VoiceSettingsModal } from './VoiceSettingsModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLiveVoice: () => void;
  isLiveActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenLiveVoice,
  isLiveActive,
}) => {
  const { t } = useLanguage();
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: t.tabUniversities, icon: GraduationCap },
    { id: 'courses', label: t.tabCourses, icon: BookOpen },
    { id: 'calculator', label: t.tabCalculator, icon: Calculator },
    { id: 'guide', label: t.tabGuide, icon: Compass },
    { id: 'chat', label: t.tabChat, icon: MessageSquare },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#071A2F]/80 backdrop-blur-xl border-b border-white/10 text-white transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex items-center justify-between py-4 sm:py-5">

  {/* Left Side */}
  <div
    className="flex flex-col cursor-pointer group"
    onClick={() => setActiveTab('overview')}
  >
    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D1D5DB]/60 mb-0.5">
      {t.portalTitle}
    </span>

    <div className="flex items-center space-x-2">
      <h1 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white group-hover:text-[#00E5FF] transition-colors">
        {t.brandName}
      </h1>

      <span className="text-[9px] uppercase font-bold tracking-widest bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#071A2F] px-2.5 py-0.5 rounded-full">
        {t.voiceAiBadge}
      </span>
    </div>
  </div>

  {/* Right Side */}
  <div className="flex items-center gap-4">
            {/* Brand Logo */}
            <div
              className="flex flex-col cursor-pointer group"
              onClick={() => setActiveTab('overview')}
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D1D5DB]/60 mb-0.5">
                {t.portalTitle}
              </span>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white group-hover:text-[#00E5FF] transition-colors">
                  {t.brandName}
                </h1>
                <span className="text-[9px] uppercase font-bold tracking-widest bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#071A2F] px-2.5 py-0.5 rounded-full font-sans shadow-[0_0_12px_rgba(0,229,255,0.4)]">
                  {t.voiceAiBadge}
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            </div>

            {/* Action Area: Language Switcher, Voice Settings & Live Voice CTA */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <LanguageSwitcher />

              {/* Advanced Voice Settings Button */}
              <button
                onClick={() => setIsVoiceSettingsOpen(true)}
                title="Advanced Voice Customization Settings"
                className="p-2.5 rounded-full border border-white/15 hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 text-white transition-all cursor-pointer flex items-center justify-center"
              >
                <Sliders className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenLiveVoice}
                className={`group flex items-center space-x-2 px-3.5 sm:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isLiveActive
                    ? 'bg-emerald-500 text-white border border-emerald-400 animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                    : 'btn-cta-coral'
                }`}
              >
                <div className="relative">
                  <Mic className="w-3.5 h-3.5" />
                  {!isLiveActive && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7CFC00] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7CFC00]"></span>
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">{isLiveActive ? t.liveActive : t.speakGemini}</span>
                <span className="sm:hidden">{isLiveActive ? 'Live' : 'Advisor'}</span>
                <Sparkles className="w-3 h-3 opacity-80 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>

          {/* Mobile / Tablet Navigation Bar */}
          <div className="lg:hidden flex items-center justify-between py-2 border-t border-white/10 text-[10px] uppercase tracking-wider font-bold overflow-x-auto gap-4">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`py-1.5 whitespace-nowrap ${
                    isActive ? 'border-b-2 border-[#00E5FF] text-[#00E5FF]' : 'text-[#D1D5DB]/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Voice Customization Settings Modal */}
      <VoiceSettingsModal
        isOpen={isVoiceSettingsOpen}
        onClose={() => setIsVoiceSettingsOpen(false)}
      />
    </>
  );
};

