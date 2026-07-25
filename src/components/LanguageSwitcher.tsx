import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '../lib/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'tr', label: 'Turkish', nativeLabel: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', label: 'Russian', nativeLabel: 'Русский', flag: '🇷🇺' },
];

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 border border-[#1A1A1A]/20 hover:border-[#1A1A1A] bg-[#FAF9F6] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-full"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#1A1A1A]" />
        <span className="text-[11px] font-mono">{currentLang.flag} {currentLang.code.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 text-[#1A1A1A]/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-[#FAF9F6] border border-[#1A1A1A] shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="p-1.5 space-y-0.5">
            <div className="px-2.5 py-1 text-[9px] uppercase font-bold tracking-widest text-[#1A1A1A]/40 border-b border-[#1A1A1A]/10 mb-1">
              Language / Dil / Язык
            </div>
            {LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 text-xs font-bold transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-[#1A1A1A] text-[#FAF9F6]'
                      : 'hover:bg-[#F2F1EC] text-[#1A1A1A]'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span className="text-[11px] uppercase tracking-wider">{lang.nativeLabel}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#FAF9F6]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
