import React from 'react';
import { Plane, Home, DollarSign, Briefcase, Sun, MapPin, FileCheck } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export const VisaAndLivingGuide: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-10 py-10">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#00E5FF] block mb-1">
          {t.guideSubtitle}
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
          {t.guideTitle}
        </h2>
        <p className="text-sm text-[#D1D5DB]/80 mt-2 max-w-2xl leading-relaxed">
          {t.guideDesc}
        </p>
      </div>

      {/* Grid Guide Sections */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Section 1: Visa & Arrival */}
        <div className="glass-panel-interactive bg-[#102A43]/80 border border-white/10 hover:border-[#00E5FF]/40 p-6 rounded-[18px] space-y-4 transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#071A2F] border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
            <Plane className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-display font-bold text-white">{t.visaSectionTitle}</h3>
          <ul className="space-y-2.5 text-xs text-[#D1D5DB]">
            <li className="flex items-start gap-2">
              <FileCheck className="w-3.5 h-3.5 text-[#7CFC00] flex-shrink-0 mt-0.5" />
              <span>{t.visaPoint1}</span>
            </li>
            <li className="flex items-start gap-2">
              <FileCheck className="w-3.5 h-3.5 text-[#7CFC00] flex-shrink-0 mt-0.5" />
              <span>{t.visaPoint2}</span>
            </li>
            <li className="flex items-start gap-2">
              <FileCheck className="w-3.5 h-3.5 text-[#7CFC00] flex-shrink-0 mt-0.5" />
              <span>{t.visaPoint3}</span>
            </li>
          </ul>
        </div>

        {/* Section 2: Accommodation */}
        <div className="glass-panel-interactive bg-[#102A43]/80 border border-white/10 hover:border-[#00E5FF]/40 p-6 rounded-[18px] space-y-4 transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#071A2F] border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
            <Home className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-display font-bold text-white">{t.housingSectionTitle}</h3>
          <ul className="space-y-2.5 text-xs text-[#D1D5DB]">
            <li className="flex items-start gap-2">
              <Home className="w-3.5 h-3.5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
              <span>{t.housingPoint1}</span>
            </li>
            <li className="flex items-start gap-2">
              <Home className="w-3.5 h-3.5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
              <span>{t.housingPoint2}</span>
            </li>
            <li className="flex items-start gap-2">
              <Home className="w-3.5 h-3.5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
              <span>{t.housingPoint3}</span>
            </li>
          </ul>
        </div>

        {/* Section 3: Cost of Living */}
        <div className="glass-panel-interactive bg-[#102A43]/80 border border-white/10 hover:border-[#00E5FF]/40 p-6 rounded-[18px] space-y-4 transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#071A2F] border border-[#7CFC00]/30 flex items-center justify-center text-[#7CFC00]">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-display font-bold text-white">{t.livingExpensesTitle}</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-[#071A2F] rounded-lg border border-white/10 text-white">
              <span>Groceries & Food:</span>
              <span className="font-bold text-[#00E5FF]">$180 - $250 / mo</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-[#071A2F] rounded-lg border border-white/10 text-white">
              <span>Transportation:</span>
              <span className="font-bold text-[#7CFC00]">Free University Shuttles</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-[#071A2F] rounded-lg border border-white/10 text-white">
              <span>Personal & Mobile Data:</span>
              <span className="font-bold text-[#8B5CF6]">$40 - $70 / mo</span>
            </div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-[#7CFC00] pt-1">{t.monthlyBudgetSummary}</p>
          </div>
        </div>

        {/* Section 4: Part-Time Work */}
        <div className="glass-panel-interactive bg-[#102A43]/80 border border-white/10 hover:border-[#00E5FF]/40 p-6 rounded-[18px] space-y-4 transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#071A2F] border border-[#FF5A5F]/30 flex items-center justify-center text-[#FF5A5F]">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-display font-bold text-white">{t.workSectionTitle}</h3>
          <p className="text-xs text-[#D1D5DB] leading-relaxed">
            {t.workDesc}
          </p>
        </div>

        {/* Section 5: Mediterranean Lifestyle */}
        <div className="glass-panel-interactive bg-[#102A43]/80 border border-white/10 hover:border-[#00E5FF]/40 p-6 rounded-[18px] space-y-4 transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#071A2F] border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
            <Sun className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-display font-bold text-white">{t.lifeSectionTitle}</h3>
          <p className="text-xs text-[#D1D5DB] leading-relaxed">
            {t.lifeDesc}
          </p>
        </div>

        {/* Section 6: Free Transportation */}
        <div className="glass-panel-interactive bg-[#102A43]/80 border border-white/10 hover:border-[#00E5FF]/40 p-6 rounded-[18px] space-y-4 transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#071A2F] border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-display font-bold text-white">{t.transitSectionTitle}</h3>
          <p className="text-xs text-[#D1D5DB] leading-relaxed">
            {t.transitDesc}
          </p>
        </div>
      </div>
    </div>
  );
};
